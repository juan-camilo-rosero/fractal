"use client";

import { useState, useEffect } from "react";
import { preguntasICFES } from "./questions";
import Link from "next/link";
import { updateDocument, addDocumentWithCustomId, getDocument } from "@/lib/db_functions"; // Importamos funciones de Firebase
import { isUserLoggedIn } from "@/lib/auth_functions"; // Importamos función para verificar usuario
import {icfesCoursesMap} from "./icfes_courses"

// Mapeo de áreas del examen a claves de cursos
const areaToCourseKeyMap = {
  "Lectura Crítica": "lectura_critica",
  "Matemáticas": "matematicas",
  "Ciencias Naturales": "ciencias_naturales",
  "Ciencias Sociales": "ciencias_sociales", 
  "Inglés": "ingles"
};

function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [examFinished, setExamFinished] = useState(false);
  const [results, setResults] = useState({});
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [icfesCourses, setIcfesCourses] = useState(null); // Para almacenar el email del usuario

  // Obtener el email del usuario y los cursos al cargar el componente
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Obtener usuario actual
        const user = await isUserLoggedIn();
        if (user) {
          setUserEmail(user.email);
          console.log("Email del usuario obtenido:", user.email);
          
          // Cargar los cursos ICFES
          try {
            const courses = icfesCoursesMap;
            if (courses) {
              setIcfesCourses(courses);
              console.log("Cursos ICFES cargados correctamente");
            } else {
              console.error("No se pudieron cargar los cursos ICFES");
            }
          } catch (importError) {
            console.error("Error al importar los cursos ICFES:", importError);
          }
        } else {
          console.error("No hay usuario autenticado");
          // Redirigir a la página de login si no hay usuario autenticado
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error al inicializar datos:", error);
      }
    };
    
    initializeData();
  }, []);

  // Agrupar preguntas por área
  const questionsByArea = preguntasICFES.reduce((acc, question) => {
    if (!acc[question.area]) {
      acc[question.area] = [];
    }
    acc[question.area].push(question);
    return acc;
  }, {});

  const totalQuestions = preguntasICFES.length;

  const handleSelectAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Verificar si todas las preguntas fueron respondidas
      if (Object.keys(userAnswers).length === totalQuestions) {
        calculateResults();
        setExamFinished(true);
      } else {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const calculateResults = () => {
    const resultsByArea = {};
    
    Object.keys(questionsByArea).forEach(area => {
      const areaQuestions = questionsByArea[area];
      let correctAnswers = 0;
      
      areaQuestions.forEach((question, index) => {
        const globalIndex = preguntasICFES.findIndex(q => 
          q.enunciado === question.enunciado && q.area === question.area
        );
        
        if (userAnswers[globalIndex] === question.respuestaCorrecta) {
          correctAnswers++;
        }
      });
      
      resultsByArea[area] = {
        correct: correctAnswers,
        total: areaQuestions.length,
        score: (correctAnswers / areaQuestions.length) // Añadimos una puntuación normalizada
      };
    });
    
    setResults(resultsByArea);
    console.log("Resultados del examen:");
    Object.entries(resultsByArea).forEach(([area, result]) => {
      console.log(`* ${area}: ${result.correct} / ${result.total}`);
    });

    // Después de calcular resultados, añadimos los cursos recomendados
    addRecommendedCourses(resultsByArea);
  };

  const addRecommendedCourses = async (resultsByArea) => {
    if (!userEmail) {
      console.error("No se pudo obtener el email del usuario");
      return;
    }

    if (!icfesCourses) {
      console.error("No se han cargado los cursos ICFES");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Ordenamos las áreas por puntaje (de menor a mayor)
      const sortedAreas = Object.entries(resultsByArea)
        .sort(([, resultA], [, resultB]) => resultA.score - resultB.score)
        .map(([area]) => area);

      console.log("Áreas ordenadas por puntaje:", sortedAreas);

      // 2. Seleccionamos las 3 áreas con menor puntaje
      // Si hay empate o todas están bien, se seleccionan al azar
      const lowestAreas = sortedAreas.slice(0, 3);
      console.log("Áreas con menor puntaje:", lowestAreas);
      
      // 3. Obtenemos los cursos del usuario actual
      const userCoursesDoc = await getDocument("courses", userEmail);
      
      // Aseguramos que userCourses sea un objeto, incluso si no hay documento
      const userCourses = userCoursesDoc || {};
      console.log("Cursos actuales del usuario:", userCourses);
      
      // 4. Buscamos cursos para las áreas con menor puntaje
      const newCourses = [];
      
      lowestAreas.forEach(area => {
        // Usamos el mapa de conversión para obtener la clave del curso correspondiente al área
        const courseKey = areaToCourseKeyMap[area];
        
        if (courseKey && icfesCourses[courseKey]) {
          console.log(`Encontrado curso para el área ${area}: ${courseKey}`);
          
          // Verificar que el curso no esté ya asignado al usuario
          const selectedCourse = icfesCourses[courseKey];
          const courseExists = Object.values(userCourses).some(
            course => course && course.name === selectedCourse.name
          );
          
          if (!courseExists) {
            // Eliminar ícono si existe (no serializable para Firestore)
            // Hacemos una copia segura del objeto del curso
            const courseWithoutIcon = {...selectedCourse};
            if ('icon' in courseWithoutIcon) {
              delete courseWithoutIcon.icon;
            }
            
            // Añadimos un ID único para el curso si no lo tiene
            if (!courseWithoutIcon.id) {
              courseWithoutIcon.id = courseKey;
            }
            
            newCourses.push(courseWithoutIcon);
            console.log(`Añadiendo curso para el área ${area}:`, courseWithoutIcon.name);
          } else {
            console.log(`El curso ${selectedCourse.name} ya existe para el usuario`);
          }
        } else {
          console.log(`No se encontró curso para el área ${area}`);
        }
      });
      
      // 5. Si hay nuevos cursos para añadir, los guardamos
      if (newCourses.length > 0) {
        // Creamos un objeto con índices numéricos para los nuevos cursos
        const currentCourseCount = Object.keys(userCourses).length;
        const newCoursesObject = {};
        
        newCourses.forEach((course, index) => {
          newCoursesObject[`${currentCourseCount + index}`] = course;
        });
        
        console.log("Nuevos cursos a añadir:", newCoursesObject);
        
        // Combinamos los cursos existentes con los nuevos
        const updatedCourses = {
          ...userCourses,
          ...newCoursesObject
        };
        
        // Guardamos en Firestore
        if (!userCoursesDoc || Object.keys(userCourses).length === 0) {
          // Si no existen cursos previos, creamos el documento
          console.log("Creando nuevo documento de cursos");
          await addDocumentWithCustomId("courses", updatedCourses, userEmail);
        } else {
          // Si ya existen cursos, actualizamos el documento
          console.log("Actualizando documento de cursos existente");
          await updateDocument("courses", userEmail, updatedCourses);
        }
        
        console.log(`Se añadieron ${newCourses.length} cursos recomendados basados en los resultados del examen`);
      } else {
        console.log("No se añadieron nuevos cursos (ya existían o no había disponibles)");
      }
    } catch (error) {
      console.error("Error al añadir cursos recomendados:", error);
      console.error("Stack trace:", error.stack);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTest = () => {
    // Verificar si todas las preguntas fueron respondidas
    if (Object.keys(userAnswers).length === totalQuestions) {
      calculateResults();
      setExamFinished(true);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Si el examen ha terminado, mostrar resultados
  if (examFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-fgray-100">
        <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-fblue-700 mb-6">Resultados del Examen</h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-fblue-700 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-fgray-600">Procesando resultados y recomendaciones...</p>
            </div>
          ) : (
            <>
              {Object.entries(results).map(([area, result]) => (
                <div key={area} className="mb-4">
                  <h3 className="text-xl font-semibold text-fgray-800">{area}</h3>
                  <div className="flex items-center mt-2">
                    <div className="bg-fgray-200 w-full h-4 rounded-full flex-grow">
                      <div 
                        className="bg-fblue-700 h-4 rounded-full"
                        style={{ width: `${(result.correct / result.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 font-medium whitespace-nowrap">{result.correct} / {result.total}</span>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-fblue-50 border border-fblue-200 rounded-lg">
                <p className="text-fblue-700">
                  <span className="font-medium">¡Importante!</span> Hemos añadido cursos recomendados a tu panel 
                  basados en tus resultados para ayudarte a mejorar en las áreas con menor puntaje.
                </p>
              </div>
              
              <Link href="/dashboard">
                <button 
                  className="mt-8 bg-fblue-700 text-white px-6 py-2 rounded-md hover:bg-fblue-800 transition-colors"
                >
                  Continuar al panel
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentQuestionData = preguntasICFES[currentQuestion];
  const answeredQuestions = Object.keys(userAnswers).length;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 p-4 min-h-screen bg-fgray-100">
      {/* Panel de preguntas - móvil arriba, desktop a la derecha */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-fgray-800">
              Pregunta {currentQuestion + 1}
            </h2>
            {/* Ocultamos el área de la pregunta */}
          </div>
          
          <p className="text-lg mb-8">{currentQuestionData.enunciado}</p>
          
          <div className="space-y-4">
            {Object.entries(currentQuestionData.opciones).map(([key, value]) => (
              <div 
                key={key}
                onClick={() => handleSelectAnswer(key)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  userAnswers[currentQuestion] === key 
                    ? "border-fblue-700 bg-fblue-50" 
                    : "border-fgray-300 hover:border-fgray-400"
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    userAnswers[currentQuestion] === key 
                      ? "bg-fblue-700 text-white" 
                      : "bg-fgray-200 text-fgray-600"
                  }`}>
                    {key.toUpperCase()}
                  </div>
                  <span>{value}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-5 py-2 rounded-md border border-fgray-300 ${
                currentQuestion === 0 
                  ? "text-fgray-400 cursor-not-allowed" 
                  : "text-fgray-800 hover:bg-fgray-100"
              }`}
            >
              Anterior
            </button>
            
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-md bg-fblue-700 text-white hover:bg-fblue-800 transition-colors"
            >
              {currentQuestion === totalQuestions - 1 ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Panel lateral con navegación de preguntas */}
      <div className="w-full md:w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-fgray-800 mb-4">Examen ICFES</h3>

          {showError && (
            <div
              className="bg-fred-100 border border-fred-400 text-fred-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <p className="text-sm">
                Debes responder todas las preguntas antes de finalizar.
              </p>
            </div>
          )}

          <div className="grid grid-cols-5 gap-2 gap-y-4">
            {preguntasICFES.map((_, index) => (
              <button
                key={index}
                onClick={() => handleJumpToQuestion(index)}
                className={`w-12 h-12 rounded-md flex items-center justify-center transition-colors ${
                  index === currentQuestion
                    ? "bg-fred-700 text-white"
                    : userAnswers[index] !== undefined
                    ? "bg-fblue-700 text-white"
                    : "bg-fgray-200 text-fgray-600 hover:bg-fgray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 text-sm text-fgray-600">
            Respondidas: {answeredQuestions} de {totalQuestions}
          </div>

          <button
            onClick={sendTest}
            className="w-full mt-6 py-3 rounded-md bg-fred-700 text-white font-medium hover:bg-fred-800 transition-colors"
          >
            Enviar examen
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;