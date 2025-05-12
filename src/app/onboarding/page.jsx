"use client";

import { UserContextProvider, UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/general/Button";
import FormInput from "@/components/general/FormInput";
import FormSelection from "@/components/general/FormSelection";
import {
  addDocument,
  addDocumentWithCustomId,
  updateDocument,
} from "@/lib/db_functions";
import { isUserLoggedIn } from "@/lib/auth_functions";
import { vocationalFields, getFieldCourses } from "./courses";

const findUser = async () => {
  try {
    const res = await isUserLoggedIn();
    return res;
  } catch (error) {
    console.error("Error checking user login status:", error);
    return null;
  }
};

function PageContent() {
  const [section, setSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const {
    username,
    setUsername,
    lastName,
    setLastName,
    phone,
    setPhone,
    school,
    setSchool,
    exam,
    setExam,
    examDate,
    setExamDate,
    email,
    setEmail,
  } = useContext(UserContext);

  useEffect(() => {
    const checkUser = async () => {
      const res = await findUser();
      if (!res) {
        window.location.href = "/";
        return;
      }
      setEmail(res.email);
    };

    checkUser();
  }, [setEmail]);

  const validateSection1 = () => {
    if (!username) {
      alert("El nombre es obligatorio.");
      return false;
    }
    if (!lastName) {
      alert("El apellido es obligatorio.");
      return false;
    }
    if (!phone) {
      alert("El número de teléfono es obligatorio.");
      return false;
    }
    if (!school) {
      alert("Por favor selecciona un colegio.");
      return false;
    }
    return true;
  };

  const validateSection2 = () => {
    if (!exam) {
      alert("Por favor selecciona un examen.");
      return false;
    }
    if (!examDate) {
      alert("Por favor selecciona una fecha de examen.");
      return false;
    }
    return true;
  };

  const validateSection3 = () => {
    if (!selectedField) {
      alert("Por favor selecciona un campo vocacional.");
      return false;
    }
    return true;
  };

  const handleContinueSection1 = () => {
    if (validateSection1()) {
      setSection(2);
    }
  };

  const handleContinueSection2 = () => {
    if (validateSection2()) {
      setSection(3);
    }
  };

  const handleContinueSection3 = () => {
    if (validateSection3()) {
      setSection(4);
    }
  };

  const handleSend = async (e) => {
    setIsLoading(true);

    try {
      // Obtengo los cursos del campo seleccionado
      const fieldCourses = getFieldCourses(selectedField);
      
      // Filtro los cursos seleccionados
      const coursesToSave = selectedCourses.map(courseName => {
        const course = fieldCourses[courseName];
        // Elimino el ícono que no es serializable para Firestore
        const { icon, ...courseWithoutIcon } = course;
        return courseWithoutIcon;
      });

      const coursesObject = coursesToSave.reduce((acc, course, index) => {
        acc[index] = course;
        return acc;
      }, {});

      await updateDocument("users", email, {
        username,
        lastName,
        phone,
        school,
        exam,
        examDate,
        vocationalField: selectedField,
      });

      await addDocumentWithCustomId("courses", coursesObject, email);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un problema al procesar la información. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCourseSelection = (courseName) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseName)
        ? prevSelectedCourses.filter((course) => course !== courseName)
        : [...prevSelectedCourses, courseName]
    );
  };

  // Reiniciar cursos seleccionados cuando cambie el campo
  useEffect(() => {
    setSelectedCourses([]);
  }, [selectedField]);

  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-fgray-100">
      {section === 0 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-3/4 lg:w-1/2">
          <h1 className="text-center text-3xl font-bold text-fblue-700 lg:text-5xl">
            Bienvenido a <span className="text-fred-700">Fractal</span>
          </h1>
          <h2 className="text-fgray-600 text-center mt-10 font-semibold md:text-xl">
            Antes de comenzar, nos gustaría conocerte un poco para poder adaptar el contenido a tus necesidades.
          </h2>
          <Button
            text="Continuar"
            type="primary"
            size="xl"
            func={() => setSection(1)}
            aditionalStyles="w-full lg:w-auto lg:text-xl lg:px-16 mt-14"
          />
        </section>
      )}
      {section === 1 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-1/2 lg:w-2/3">
          <div className="w-full flex flex-col items-center pt-8 gap-6 lg:gap-10">
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
              <FormInput
                labelText="Nombre"
                value={username}
                setValue={setUsername}
                placeholder=""
                type="text"
              />
              <FormInput
                labelText="Apellido"
                value={lastName}
                setValue={setLastName}
                type="text"
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
              <FormInput
                labelText="Teléfono"
                value={phone}
                setValue={setPhone}
                type="tel"
              />
              <FormSelection
                labelText="Colegio"
                value={school}
                setValue={setSchool}
                id="school"
                options={[
                  { value: "cambridge_school", label: "Colegio Telefónica" },
                  { value: "oxford_school", label: "Colegio UNAL" },
                  { value: "harvard_school", label: "Colegio Uniandes" },
                  { value: "purdue_school", label: "Colegio Alpina" },
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row-reverse lg:gap-10 lg:mt-6 lg:justify-start">
              <Button
                text="Continuar"
                type="primary"
                size="xl"
                func={handleContinueSection1}
                aditionalStyles={`w-full py-3 mt-12 transition-all lg:w-auto lg:px-16 lg:py-2 lg:mt-0`}
              />
              <Button
                text="Regresar"
                type="secondary"
                size="xl"
                func={() => setSection(0)}
                aditionalStyles={`w-full py-3 mt-2 lg:mt-0 transition-all lg:w-auto lg:px-16 lg:py-2`}
              />
            </div>
          </div>
        </section>
      )}
      {section === 2 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-1/2 lg:w-2/3">
          <div className="w-full flex flex-col items-center pt-8 gap-6 lg:gap-10">
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
              <FormSelection
                labelText="¿Qué examen presentarás?"
                value={exam}
                setValue={setExam}
                id="exam"
                options={[
                  { value: "icfes", label: "ICFES" },
                  { value: "unal", label: "UNAL" },
                ]}
              />
              <FormSelection
                labelText="¿Cuándo lo presentarás?"
                value={examDate}
                setValue={setExamDate}
                id="examDate"
                options={[
                  { value: "2025-1", label: "2025-1" },
                  { value: "2025-2", label: "2025-2" },
                  { value: "2026-1", label: "2026-1" },
                  { value: "2026-2", label: "2026-2" },
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row-reverse lg:gap-10 lg:mt-6 lg:justify-start">
              <Button
                text="Continuar"
                type="primary"
                size="xl"
                func={handleContinueSection2}
                aditionalStyles={`w-full py-3 mt-12 transition-all lg:w-auto lg:px-16 lg:py-2 lg:mt-0`}
              />
              <Button
                text="Regresar"
                type="secondary"
                size="xl"
                func={() => setSection(1)}
                aditionalStyles={`w-full py-3 mt-2 lg:mt-0 transition-all lg:w-auto lg:px-16 lg:py-2`}
              />
            </div>
          </div>
        </section>
      )}
      {section === 3 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-1/2 lg:w-2/3">
          <h3 className="text-3xl font-semibold text-fgray-800 text-center mb-4">
            ¿Qué campo te llama más la atención?
          </h3>
          <p className="text-fgray-600 text-center mb-8">
            Selecciona el área que más te interese para que podamos recomendarte contenido relevante
          </p>
          <div className="w-full flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-4 lg:justify-between">
            {Object.keys(vocationalFields).map((fieldKey) => {
              const field = vocationalFields[fieldKey];
              const isSelected = selectedField === fieldKey;

              return (
                <figure
                  key={fieldKey}
                  className={`w-full lg:w-[48%] p-4 rounded-lg border-2 ${
                    isSelected
                      ? "bg-fgray-200 border-fgray-400 text-fblue-700"
                      : "border-fgray-400 text-fgray-800"
                  } flex items-center cursor-pointer transition-all`}
                  onClick={() => setSelectedField(fieldKey)}
                >
                  <div
                    className={`${
                      isSelected
                        ? "bg-fblue-700 text-fgray-200"
                        : "bg-fgray-200 text-fgray-800"
                    } w-12 h-12 rounded-lg mr-6 flex-shrink-0 flex items-center justify-center text-2xl`}
                  >
                    {field.icon}
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{field.name}</p>
                    <p className="text-sm text-fgray-600">{field.description}</p>
                  </div>
                </figure>
              );
            })}
          </div>

          <div className="w-full flex flex-col md:flex-row gap-6 mt-12 lg:flex-row-reverse">
            <Button
              text="Continuar"
              type="primary"
              size="xl"
              func={handleContinueSection3}
              aditionalStyles="w-full lg:w-auto lg:px-16"
            />
            <Button
              text="Regresar"
              type="secondary"
              size="xl"
              func={() => setSection(2)}
              aditionalStyles="w-full lg:w-auto lg:px-16"
            />
          </div>
        </section>
      )}
      {section === 4 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-1/2 lg:w-2/3">
          <h3 className="text-3xl font-semibold text-fgray-800 text-center mb-2">
            Cursos recomendados
          </h3>
          <p className="text-fgray-600 text-center mb-8">
            {selectedField === "undecided" 
              ? "Estos cursos te ayudarán a descubrir tus intereses y habilidades" 
              : `Selecciona los cursos que te interesen en el área de ${vocationalFields[selectedField].name.toLowerCase()}`}
          </p>
          
          <div className="w-full flex mt-6 flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-6 lg:justify-between">
            {Object.keys(getFieldCourses(selectedField)).map((courseName) => {
              const course = getFieldCourses(selectedField)[courseName];
              const isSelected = selectedCourses.includes(courseName);

              return (
                <figure
                  key={courseName}
                  className={`w-full lg:w-[48%] p-4 rounded-lg border-2 ${
                    isSelected
                      ? "bg-fgray-200 border-fgray-400 text-fblue-700"
                      : "border-fgray-400 text-fgray-800"
                  } flex items-center cursor-pointer transition-all`}
                  onClick={() => toggleCourseSelection(courseName)}
                >
                  <div
                    className={`${
                      isSelected
                        ? "bg-fblue-700 text-fgray-200"
                        : "bg-fgray-200 text-fgray-800"
                    } w-12 h-12 rounded-lg mr-6 flex-shrink-0 flex items-center justify-center text-2xl`}
                  >
                    {course.icon}
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{course.name}</p>
                    <p className="text-sm text-fgray-600 line-clamp-2">{course.summary}</p>
                  </div>
                </figure>
              );
            })}
          </div>

          <div className="w-full flex flex-col md:flex-row gap-6 mt-12 lg:flex-row-reverse">
            <Button
              text={isLoading ? "Cargando..." : "Continuar"}
              type="primary"
              size="xl"
              func={handleSend}
              aditionalStyles="w-full lg:w-auto lg:px-16 disabled:bg-opacity-50 disabled:cursor-default"
              disabled={isLoading}
            />
            <Button
              text="Regresar"
              type="secondary"
              size="xl"
              func={() => setSection(3)}
              aditionalStyles="w-full lg:w-auto lg:px-16"
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <UserContextProvider>
      <PageContent />
    </UserContextProvider>
  );
}