import { FaBook, FaCalculator, FaFlask, FaGlobe, FaLanguage } from "react-icons/fa";


export const icfesCoursesMap = {
  lectura_critica: {
    name: "Lectura Crítica",
    type: "competencia_genérica",
    url: "lectura-critica",
    totalLessons: 4,
    completedLessons: 0,
    icon: <FaBook />,
    lessons: [
      {
        title: "Identificación de Información Explícita",
        minutes: 20,
        img: "https://i.ytimg.com/vi/LZLkQMaD-Q0/maxresdefault.jpg",
        completed: false,
        url: "/course/lectura-critica/informacion-explicita",
        video: "https://www.youtube.com/embed/LZLkQMaD-Q0",
        course: "lectura_critica",
        summary:
          "Estrategias para reconocer información explícita en diversos tipos de textos y extraer ideas principales y secundarias.",
      },
      {
        title: "Inferencia Textual",
        minutes: 22,
        img: "https://i.ytimg.com/vi/Qx7yz0XwpFk/maxresdefault.jpg",
        completed: false,
        url: "/course/lectura-critica/inferencia-textual",
        video: "https://www.youtube.com/embed/Qx7yz0XwpFk",
        course: "lectura_critica",
        summary:
          "Técnicas para deducir información implícita a partir de los contenidos textuales y reconocer intenciones comunicativas.",
      },
      {
        title: "Análisis Crítico",
        minutes: 25,
        img: "https://i.ytimg.com/vi/1W_0BcZ9JsE/maxresdefault.jpg",
        completed: false,
        url: "/course/lectura-critica/analisis-critico",
        video: "https://www.youtube.com/embed/1W_0BcZ9JsE",
        course: "lectura_critica",
        summary:
          "Evaluación de argumentos, perspectivas y enfoques en textos argumentativos e informativos para desarrollar posturas críticas.",
      },
      {
        title: "Tipologías Textuales",
        minutes: 18,
        img: "https://i.ytimg.com/vi/pWfX4jQrVZU/maxresdefault.jpg",
        completed: false,
        url: "/course/lectura-critica/tipologias-textuales",
        video: "https://www.youtube.com/embed/pWfX4jQrVZU",
        course: "lectura_critica",
        summary:
          "Estudio de las características y estructuras de distintos géneros textuales: literarios, informativos, argumentativos y filosóficos.",
      },
    ],
    video: "https://www.youtube.com/embed/LZLkQMaD-Q0",
    summary:
      "Curso para desarrollar habilidades de comprensión lectora, análisis crítico e interpretación de diversos tipos de textos evaluados en el ICFES.",
  },

  matematicas: {
    name: "Matemáticas",
    type: "competencia_genérica",
    url: "matematicas",
    totalLessons: 4,
    completedLessons: 0,
    icon: <FaCalculator />,
    lessons: [
      {
        title: "Álgebra y Funciones",
        minutes: 24,
        img: "https://i.ytimg.com/vi/uK4-nUZiOH4/maxresdefault.jpg",
        completed: false,
        url: "/course/matematicas/algebra-funciones",
        video: "https://www.youtube.com/embed/uK4-nUZiOH4",
        course: "matematicas",
        summary:
          "Fundamentos de álgebra, ecuaciones, desigualdades y funciones con aplicaciones en contextos reales.",
      },
      {
        title: "Geometría y Trigonometría",
        minutes: 22,
        img: "https://i.ytimg.com/vi/yRbMr_c_K1o/maxresdefault.jpg",
        completed: false,
        url: "/course/matematicas/geometria-trigonometria",
        video: "https://www.youtube.com/embed/yRbMr_c_K1o",
        course: "matematicas",
        summary:
          "Conceptos de geometría euclidiana, medición, transformaciones en el plano y relaciones trigonométricas.",
      },
      {
        title: "Estadística y Probabilidad",
        minutes: 20,
        img: "https://i.ytimg.com/vi/lT4OLf4fuiE/maxresdefault.jpg",
        completed: false,
        url: "/course/matematicas/estadistica-probabilidad",
        video: "https://www.youtube.com/embed/lT4OLf4fuiE",
        course: "matematicas",
        summary:
          "Análisis de datos, medidas estadísticas, probabilidades y distribuciones para interpretar información cuantitativa.",
      },
      {
        title: "Resolución de Problemas",
        minutes: 25,
        img: "https://i.ytimg.com/vi/pH5ikRnqH_I/maxresdefault.jpg",
        completed: false,
        url: "/course/matematicas/resolucion-problemas",
        video: "https://www.youtube.com/embed/pH5ikRnqH_I",
        course: "matematicas",
        summary:
          "Estrategias y metodologías para resolver problemas matemáticos complejos en diversos contextos aplicados.",
      },
    ],
    video: "https://www.youtube.com/embed/uK4-nUZiOH4",
    summary:
      "Curso integral de matemáticas enfocado en los conceptos y competencias clave evaluados en la prueba ICFES.",
  },

  ciencias_naturales: {
    name: "Ciencias Naturales",
    type: "competencia_específica",
    url: "ciencias-naturales",
    totalLessons: 4,
    completedLessons: 0,
    icon: <FaFlask />,
    lessons: [
      {
        title: "Biología Celular y Molecular",
        minutes: 23,
        img: "https://i.ytimg.com/vi/gFUs-RKH6Y0/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-naturales/biologia-celular",
        video: "https://www.youtube.com/embed/gFUs-RKH6Y0",
        course: "ciencias_naturales",
        summary:
          "Estudio de la estructura y función celular, procesos metabólicos, genética y mecanismos de herencia biológica.",
      },
      {
        title: "Física Mecánica y Ondulatoria",
        minutes: 21,
        img: "https://i.ytimg.com/vi/DJLIaZ17Z5A/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-naturales/fisica-mecanica",
        video: "https://www.youtube.com/embed/DJLIaZ17Z5A",
        course: "ciencias_naturales",
        summary:
          "Principios de mecánica newtoniana, energía, ondas y fenómenos mecánicos aplicados a sistemas físicos.",
      },
      {
        title: "Química General y Orgánica",
        minutes: 24,
        img: "https://i.ytimg.com/vi/D0ZMT1X5tQA/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-naturales/quimica-general",
        video: "https://www.youtube.com/embed/D0ZMT1X5tQA",
        course: "ciencias_naturales",
        summary:
          "Fundamentos de estructura atómica, tabla periódica, enlaces químicos, reacciones y química del carbono.",
      },
      {
        title: "Ecología y Medio Ambiente",
        minutes: 19,
        img: "https://i.ytimg.com/vi/bJ92aGRpcC8/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-naturales/ecologia",
        video: "https://www.youtube.com/embed/bJ92aGRpcC8",
        course: "ciencias_naturales",
        summary:
          "Relaciones entre organismos y su entorno, ecosistemas, problemáticas ambientales y desarrollo sostenible.",
      },
    ],
    video: "https://www.youtube.com/embed/gFUs-RKH6Y0",
    summary:
      "Curso completo de ciencias naturales que integra biología, física y química para preparar las competencias científicas del ICFES.",
  },

  ciencias_sociales: {
    name: "Ciencias Sociales y Ciudadanas",
    type: "competencia_específica",
    url: "ciencias-sociales",
    totalLessons: 4,
    completedLessons: 0,
    icon: <FaGlobe />,
    lessons: [
      {
        title: "Historia de Colombia",
        minutes: 22,
        img: "https://i.ytimg.com/vi/6El8B8hJ4Sg/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-sociales/historia-colombia",
        video: "https://www.youtube.com/embed/6El8B8hJ4Sg",
        course: "ciencias_sociales",
        summary:
          "Procesos históricos colombianos desde la época precolombina hasta la actualidad, analizando sus implicaciones sociales y políticas.",
      },
      {
        title: "Geografía Humana y Económica",
        minutes: 20,
        img: "https://i.ytimg.com/vi/1FJEaR4WQzQ/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-sociales/geografia-humana",
        video: "https://www.youtube.com/embed/1FJEaR4WQzQ",
        course: "ciencias_sociales",
        summary:
          "Relación entre geografía, población, economía y desarrollo territorial en contextos nacionales e internacionales.",
      },
      {
        title: "Constitución y Democracia",
        minutes: 18,
        img: "https://i.ytimg.com/vi/EqhEpO1JRNw/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-sociales/constitucion-democracia",
        video: "https://www.youtube.com/embed/EqhEpO1JRNw",
        course: "ciencias_sociales",
        summary:
          "Estructura del Estado colombiano, derechos fundamentales, mecanismos de participación y sistema democrático.",
      },
      {
        title: "Pensamiento Ciudadano",
        minutes: 21,
        img: "https://i.ytimg.com/vi/2qpALJmwx_0/maxresdefault.jpg",
        completed: false,
        url: "/course/ciencias-sociales/pensamiento-ciudadano",
        video: "https://www.youtube.com/embed/2qpALJmwx_0",
        course: "ciencias_sociales",
        summary:
          "Análisis de situaciones sociales, resolución de conflictos, pluralidad y convivencia en contextos multiculturales.",
      },
    ],
    video: "https://www.youtube.com/embed/6El8B8hJ4Sg",
    summary:
      "Curso integral de ciencias sociales que aborda conocimientos históricos, geográficos y competencias ciudadanas evaluadas en el ICFES.",
  },

  ingles: {
    name: "Inglés",
    type: "competencia_genérica",
    url: "ingles",
    totalLessons: 4,
    completedLessons: 0,
    icon: <FaLanguage />,
    lessons: [
      {
        title: "Comprensión Lectora en Inglés",
        minutes: 19,
        img: "https://i.ytimg.com/vi/KI23zHGP_gM/maxresdefault.jpg",
        completed: false,
        url: "/course/ingles/reading-comprehension",
        video: "https://www.youtube.com/embed/KI23zHGP_gM",
        course: "ingles",
        summary:
          "Estrategias para interpretar y analizar textos en inglés de distintos niveles de complejidad según el Marco Común Europeo.",
      },
      {
        title: "Vocabulario y Expresiones",
        minutes: 20,
        img: "https://i.ytimg.com/vi/1qbGZP3-A5M/maxresdefault.jpg",
        completed: false,
        url: "/course/ingles/vocabulary-expressions",
        video: "https://www.youtube.com/embed/1qbGZP3-A5M",
        course: "ingles",
        summary:
          "Desarrollo de léxico contextualizado, frases idiomáticas y expresiones comunes evaluadas en la prueba de inglés.",
      },
      {
        title: "Gramática Aplicada",
        minutes: 22,
        img: "https://i.ytimg.com/vi/WRdNC6Ld-AE/maxresdefault.jpg",
        completed: false,
        url: "/course/ingles/applied-grammar",
        video: "https://www.youtube.com/embed/WRdNC6Ld-AE",
        course: "ingles",
        summary:
          "Estructuras gramaticales del inglés clasificadas por niveles, con énfasis en su uso práctico y comunicativo.",
      },
      {
        title: "Pragmática y Contexto",
        minutes: 18,
        img: "https://i.ytimg.com/vi/0r3Pl2qM4EI/maxresdefault.jpg",
        completed: false,
        url: "/course/ingles/pragmatics-context",
        video: "https://www.youtube.com/embed/0r3Pl2qM4EI",
        course: "ingles",
        summary:
          "Interpretación de intenciones comunicativas, convenciones sociales y contextos situacionales en el uso del inglés.",
      },
    ],
    video: "https://www.youtube.com/embed/KI23zHGP_gM",
    summary:
      "Curso completo de inglés estructurado según los niveles del Marco Común Europeo para desarrollar las competencias evaluadas en el ICFES.",
  }
};