import {
  FaChartLine,
  FaCalculator,
  FaFlask,
  FaCode,
  FaCog,
  FaBook,
  FaPaintBrush,
  FaHeart,
  FaBalanceScale,
  FaRegLightbulb,
  FaBuilding,
  FaHandsHelping,
  FaUniversity,
  FaDice,
  FaDrawPolygon,
} from "react-icons/fa";
import { TbWaveSine } from "react-icons/tb";
import { MdPsychology, MdQuestionMark } from "react-icons/md";
import { GiMagnifyingGlass } from "react-icons/gi";

// Definición de los campos vocacionales
export const vocationalFields = {
  engineering: {
    name: "Ingeniería y Ciencias Exactas",
    icon: <FaCog />,
    description:
      "Matemáticas, física, computación y disciplinas relacionadas con la solución de problemas técnicos.",
  },
  health: {
    name: "Ciencias de la Salud",
    icon: <FaHeart />,
    description:
      "Medicina, biología, enfermería y otras disciplinas orientadas al cuidado de la salud.",
  },
  social: {
    name: "Ciencias Sociales",
    icon: <FaBook />,
    description:
      "Psicología, sociología, antropología y campos relacionados con el estudio de la sociedad.",
  },
  business: {
    name: "Economía y Negocios",
    icon: <FaBuilding />,
    description:
      "Administración, economía, marketing y áreas relacionadas con la gestión empresarial.",
  },
  arts: {
    name: "Artes y Humanidades",
    icon: <FaPaintBrush />,
    description:
      "Literatura, arte, música, filosofía y disciplinas creativas o de expresión cultural.",
  },
  law: {
    name: "Derecho y Ciencias Políticas",
    icon: <FaBalanceScale />,
    description:
      "Leyes, relaciones internacionales, ciencias políticas y campos relacionados.",
  },
  undecided: {
    name: "No estoy seguro/a",
    icon: <MdQuestionMark />,
    description:
      "Te ayudaremos a descubrir tus intereses y áreas donde puedes destacar.",
  },
};

// Función para obtener los cursos según el campo vocacional seleccionado
export const getFieldCourses = (fieldKey) => {
  const coursesMap = {
    engineering: {
      mathematics: {
        name: "Matemáticas Avanzadas",
        type: "exactas",
        url: "mathematics",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaCalculator />,
        lessons: [
          {
            title: "Cálculo Diferencial",
            minutes: 20,
            img: "https://i.ytimg.com/vi/VPZD_aij8H0/maxresdefault.jpg",
            completed: false,
            url: "/course/mathematics/differential-calculus",
            video: "https://www.youtube.com/embed/VPZD_aij8H0",
            course: "mathematics",
            summary:
              "Introducción al cálculo diferencial, límites, derivadas y sus aplicaciones en problemas de optimización e ingeniería.",
          },
          {
            title: "Álgebra Lineal",
            minutes: 18,
            img: "https://i.ytimg.com/vi/kZzoVCmUyKg/maxresdefault.jpg",
            completed: false,
            url: "/course/mathematics/linear-algebra",
            video: "https://www.youtube.com/embed/kZzoVCmUyKg",
            course: "mathematics",
            summary:
              "Estudio de vectores, matrices, espacios vectoriales y transformaciones lineales con aplicaciones en ingeniería y ciencias.",
          },
          {
            title: "Ecuaciones Diferenciales",
            minutes: 22,
            img: "https://i.ytimg.com/vi/jH3l9E8E4HM/maxresdefault.jpg",
            completed: false,
            url: "/course/mathematics/differential-equations",
            video: "https://www.youtube.com/embed/jH3l9E8E4HM",
            course: "mathematics",
            summary:
              "Análisis y resolución de ecuaciones diferenciales con aplicaciones en física, ingeniería y sistemas dinámicos.",
          },
        ],
        video: "https://www.youtube.com/embed/VPZD_aij8H0",
        summary:
          "Curso avanzado de matemáticas orientado a aplicaciones en ingeniería, tecnología y ciencias exactas.",
      },
      physics: {
        name: "Física Aplicada",
        type: "exactas",
        url: "physics",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaFlask />,
        lessons: [
          {
            title: "Mecánica Newtoniana",
            minutes: 19,
            img: "https://i.ytimg.com/vi/dQf1uGDPFSs/maxresdefault.jpg",
            completed: false,
            url: "/course/physics/newtonian-mechanics",
            video: "https://www.youtube.com/embed/dQf1uGDPFSs",
            course: "physics",
            summary:
              "Estudio de las leyes del movimiento de Newton y su aplicación en problemas prácticos de ingeniería y mecánica.",
          },
          {
            title: "Electricidad y Magnetismo",
            minutes: 21,
            img: "https://i.ytimg.com/vi/x1-SibwIPM4/maxresdefault.jpg",
            completed: false,
            url: "/course/physics/electricity-magnetism",
            video: "https://www.youtube.com/embed/x1-SibwIPM4",
            course: "physics",
            summary:
              "Estudio de principios electromagnéticos fundamentales y sus aplicaciones en tecnología e ingeniería eléctrica.",
          },
          {
            title: "Termodinámica",
            minutes: 18,
            img: "https://i.ytimg.com/vi/zOCQhZoL_N0/maxresdefault.jpg",
            completed: false,
            url: "/course/physics/thermodynamics",
            video: "https://www.youtube.com/embed/zOCQhZoL_N0",
            course: "physics",
            summary:
              "Análisis de sistemas térmicos, energía, entropía y sus aplicaciones en ingeniería mecánica y energética.",
          },
        ],
        video: "https://www.youtube.com/embed/dQf1uGDPFSs",
        summary:
          "Curso de física con énfasis en aplicaciones ingenieriles y tecnológicas para resolver problemas del mundo real.",
      },
      programming: {
        name: "Programación y Algoritmos",
        type: "computación",
        url: "programming",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaCode />,
        lessons: [
          {
            title: "Fundamentos de Programación",
            minutes: 15,
            img: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
            completed: false,
            url: "/course/programming/programming-fundamentals",
            video: "https://www.youtube.com/embed/rfscVS0vtbw",
            course: "programming",
            summary:
              "Introducción a los conceptos básicos de programación: variables, estructuras de control, funciones y algoritmos.",
          },
          {
            title: "Estructuras de Datos",
            minutes: 20,
            img: "https://i.ytimg.com/vi/zg9ih6SVACc/maxresdefault.jpg",
            completed: false,
            url: "/course/programming/data-structures",
            video: "https://www.youtube.com/embed/zg9ih6SVACc",
            course: "programming",
            summary:
              "Estudio de estructuras de datos fundamentales: arrays, listas enlazadas, pilas, colas, árboles y grafos.",
          },
          {
            title: "Algoritmos y Complejidad",
            minutes: 24,
            img: "https://i.ytimg.com/vi/KEEKn7Me-ms/maxresdefault.jpg",
            completed: false,
            url: "/course/programming/algorithms-complexity",
            video: "https://www.youtube.com/embed/KEEKn7Me-ms",
            course: "programming",
            summary:
              "Análisis y diseño de algoritmos eficientes, notación Big-O y optimización computacional.",
          },
        ],
        video: "https://www.youtube.com/embed/rfscVS0vtbw",
        summary:
          "Curso de programación orientado a la resolución de problemas ingenieriles y desarrollo de software.",
      },
      engineering_projects: {
        name: "Proyectos de Ingeniería",
        type: "aplicación",
        url: "engineering-projects",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaCog />,
        lessons: [
          {
            title: "Diseño de Sistemas",
            minutes: 22,
            img: "https://i.ytimg.com/vi/FtN3BYH2Zes/maxresdefault.jpg",
            completed: false,
            url: "/course/engineering-projects/systems-design",
            video: "https://www.youtube.com/embed/FtN3BYH2Zes",
            course: "engineering_projects",
            summary:
              "Metodologías para el diseño de sistemas complejos en ingeniería con enfoque en requerimientos y especificaciones.",
          },
          {
            title: "Gestión de Proyectos Técnicos",
            minutes: 18,
            img: "https://i.ytimg.com/vi/TiX_PYPkEqY/maxresdefault.jpg",
            completed: false,
            url: "/course/engineering-projects/technical-project-management",
            video: "https://www.youtube.com/embed/TiX_PYPkEqY",
            course: "engineering_projects",
            summary:
              "Herramientas y técnicas para planificar, ejecutar y monitorear proyectos de ingeniería y desarrollo tecnológico.",
          },
          {
            title: "Innovación y Sostenibilidad",
            minutes: 16,
            img: "https://i.ytimg.com/vi/A7JEjEi0CfU/maxresdefault.jpg",
            completed: false,
            url: "/course/engineering-projects/innovation-sustainability",
            video: "https://www.youtube.com/embed/A7JEjEi0CfU",
            course: "engineering_projects",
            summary:
              "Estrategias para incorporar innovación y criterios de sostenibilidad en proyectos de ingeniería modernos.",
          },
        ],
        video: "https://www.youtube.com/embed/FtN3BYH2Zes",
        summary:
          "Curso práctico sobre implementación y gestión de proyectos reales de ingeniería y tecnología.",
      },
    },

    health: {
      biology: {
        name: "Biología y Ciencias de la Vida",
        type: "ciencias",
        url: "biology",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaFlask />,
        lessons: [
          {
            title: "Biología Celular",
            minutes: 20,
            img: "https://i.ytimg.com/vi/URUJD5NEXC8/maxresdefault.jpg",
            completed: false,
            url: "/course/biology/cellular-biology",
            video: "https://www.youtube.com/embed/URUJD5NEXC8",
            course: "biology",
            summary:
              "Estudio de la estructura y función celular, orgánulos y procesos bioquímicos fundamentales para la vida.",
          },
          {
            title: "Anatomía y Fisiología",
            minutes: 24,
            img: "https://i.ytimg.com/vi/Nlmfn7C9LU4/maxresdefault.jpg",
            completed: false,
            url: "/course/biology/anatomy-physiology",
            video: "https://www.youtube.com/embed/Nlmfn7C9LU4",
            course: "biology",
            summary:
              "Exploración de los sistemas corporales humanos, su estructura y funcionamiento coordinado.",
          },
          {
            title: "Genética y Herencia",
            minutes: 18,
            img: "https://i.ytimg.com/vi/prkHKjfUmM8/maxresdefault.jpg",
            completed: false,
            url: "/course/biology/genetics-inheritance",
            video: "https://www.youtube.com/embed/prkHKjfUmM8",
            course: "biology",
            summary:
              "Principios de genética, herencia mendeliana y molecular, y su aplicación en medicina y biotecnología.",
          },
        ],
        video: "https://www.youtube.com/embed/URUJD5NEXC8",
        summary:
          "Curso fundamental sobre los procesos biológicos y su relevancia para las ciencias de la salud y la medicina.",
      },
      health_chemistry: {
        name: "Química para Ciencias de la Salud",
        type: "ciencias",
        url: "health-chemistry",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaFlask />,
        lessons: [
          {
            title: "Química Orgánica",
            minutes: 22,
            img: "https://i.ytimg.com/vi/bSMx0NS0XfY/maxresdefault.jpg",
            completed: false,
            url: "/course/health-chemistry/organic-chemistry",
            video: "https://www.youtube.com/embed/bSMx0NS0XfY",
            course: "health_chemistry",
            summary:
              "Estudio de compuestos del carbono y su relevancia en procesos bioquímicos y farmacológicos.",
          },
          {
            title: "Bioquímica",
            minutes: 19,
            img: "https://i.ytimg.com/vi/tmbXGk9vJA0/maxresdefault.jpg",
            completed: false,
            url: "/course/health-chemistry/biochemistry",
            video: "https://www.youtube.com/embed/tmbXGk9vJA0",
            course: "health_chemistry",
            summary:
              "Análisis de las reacciones químicas en sistemas biológicos y su importancia en medicina.",
          },
          {
            title: "Farmacología Básica",
            minutes: 20,
            img: "https://i.ytimg.com/vi/QHY_dfqsVWE/maxresdefault.jpg",
            completed: false,
            url: "/course/health-chemistry/basic-pharmacology",
            video: "https://www.youtube.com/embed/QHY_dfqsVWE",
            course: "health_chemistry",
            summary:
              "Introducción a los principios farmacológicos y mecanismos de acción de medicamentos.",
          },
        ],
        video: "https://www.youtube.com/embed/bSMx0NS0XfY",
        summary:
          "Curso de química enfocado en aplicaciones biomédicas y farmacéuticas para futuros profesionales de la salud.",
      },
      public_health: {
        name: "Salud Pública y Epidemiología",
        type: "salud",
        url: "public-health",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaHandsHelping />,
        lessons: [
          {
            title: "Fundamentos de Salud Pública",
            minutes: 17,
            img: "https://i.ytimg.com/vi/q6mtgbfKbdY/maxresdefault.jpg",
            completed: false,
            url: "/course/public-health/fundamentals",
            video: "https://www.youtube.com/embed/q6mtgbfKbdY",
            course: "public_health",
            summary:
              "Introducción a conceptos y estrategias para mejorar la salud a nivel poblacional.",
          },
          {
            title: "Epidemiología Básica",
            minutes: 21,
            img: "https://i.ytimg.com/vi/jQ_jCrc8aqA/maxresdefault.jpg",
            completed: false,
            url: "/course/public-health/basic-epidemiology",
            video: "https://www.youtube.com/embed/jQ_jCrc8aqA",
            course: "public_health",
            summary:
              "Métodos para estudiar patrones de enfermedad y factores de riesgo en poblaciones.",
          },
          {
            title: "Promoción de la Salud",
            minutes: 16,
            img: "https://i.ytimg.com/vi/G8r2BB3BFBY/maxresdefault.jpg",
            completed: false,
            url: "/course/public-health/health-promotion",
            video: "https://www.youtube.com/embed/G8r2BB3BFBY",
            course: "public_health",
            summary:
              "Estrategias para promover estilos de vida saludables y prevención de enfermedades.",
          },
        ],
        video: "https://www.youtube.com/embed/q6mtgbfKbdY",
        summary:
          "Curso sobre políticas y programas de salud pública, epidemiología y promoción de la salud comunitaria.",
      },
      health_ethics: {
        name: "Ética y Profesionalismo en Salud",
        type: "humanidades",
        url: "health-ethics",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaBalanceScale />,
        lessons: [
          {
            title: "Bioética",
            minutes: 18,
            img: "https://i.ytimg.com/vi/h4gNA5l0z_g/maxresdefault.jpg",
            completed: false,
            url: "/course/health-ethics/bioethics",
            video: "https://www.youtube.com/embed/h4gNA5l0z_g",
            course: "health_ethics",
            summary:
              "Principios éticos aplicados a dilemas en medicina, investigación y biotecnología.",
          },
          {
            title: "Relación Profesional-Paciente",
            minutes: 15,
            img: "https://i.ytimg.com/vi/x4h8BSt6rLw/maxresdefault.jpg",
            completed: false,
            url: "/course/health-ethics/professional-patient-relationship",
            video: "https://www.youtube.com/embed/x4h8BSt6rLw",
            course: "health_ethics",
            summary:
              "Desarrollo de habilidades de comunicación y empatía en el contexto de atención sanitaria.",
          },
          {
            title: "Legislación Sanitaria",
            minutes: 20,
            img: "https://i.ytimg.com/vi/F7DX0U5q_S0/maxresdefault.jpg",
            completed: false,
            url: "/course/health-ethics/health-legislation",
            video: "https://www.youtube.com/embed/F7DX0U5q_S0",
            course: "health_ethics",
            summary:
              "Marco legal y normativo que regula la práctica profesional en el sector salud.",
          },
        ],
        video: "https://www.youtube.com/embed/h4gNA5l0z_g",
        summary:
          "Curso sobre consideraciones éticas, legales y profesionales en el ejercicio de las profesiones sanitarias.",
      },
    },

    social: {
      psychology: {
        name: "Psicología General",
        type: "ciencias_sociales",
        url: "psychology",
        totalLessons: 3,
        completedLessons: 0,
        icon: <MdPsychology />,
        lessons: [
          {
            title: "Psicología Cognitiva",
            minutes: 19,
            img: "https://i.ytimg.com/vi/iuKZ3_NRY7w/maxresdefault.jpg",
            completed: false,
            url: "/course/psychology/cognitive-psychology",
            video: "https://www.youtube.com/embed/iuKZ3_NRY7w",
            course: "psychology",
            summary:
              "Estudio de procesos mentales como la percepción, pensamiento, memoria y resolución de problemas.",
          },
          {
            title: "Desarrollo Humano",
            minutes: 22,
            img: "https://i.ytimg.com/vi/zd9OUJu8CfE/maxresdefault.jpg",
            completed: false,
            url: "/course/psychology/human-development",
            video: "https://www.youtube.com/embed/zd9OUJu8CfE",
            course: "psychology",
            summary:
              "Análisis de las etapas del desarrollo físico, cognitivo y socioemocional a lo largo de la vida.",
          },
          {
            title: "Psicología Social",
            minutes: 20,
            img: "https://i.ytimg.com/vi/h6HLDV0T5Q8/maxresdefault.jpg",
            completed: false,
            url: "/course/psychology/social-psychology",
            video: "https://www.youtube.com/embed/h6HLDV0T5Q8",
            course: "psychology",
            summary:
              "Estudio de la influencia social, relaciones interpersonales y comportamiento grupal.",
          },
        ],
        video: "https://www.youtube.com/embed/iuKZ3_NRY7w",
        summary:
          "Curso introductorio a los principios fundamentales de la psicología como ciencia del comportamiento humano.",
      },
      sociology: {
        name: "Sociología y Sociedad",
        type: "ciencias_sociales",
        url: "sociology",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaHandsHelping />,
        lessons: [
          {
            title: "Teoría Sociológica",
            minutes: 21,
            img: "https://i.ytimg.com/vi/yDfH5SyV3C8/maxresdefault.jpg",
            completed: false,
            url: "/course/sociology/sociological-theory",
            video: "https://www.youtube.com/embed/yDfH5SyV3C8",
            course: "sociology",
            summary:
              "Perspectivas clásicas y contemporáneas para analizar y entender la sociedad.",
          },
          {
            title: "Estructura Social",
            minutes: 18,
            img: "https://i.ytimg.com/vi/cCauUiKYiD8/maxresdefault.jpg",
            completed: false,
            url: "/course/sociology/social-structure",
            video: "https://www.youtube.com/embed/cCauUiKYiD8",
            course: "sociology",
            summary:
              "Análisis de clases sociales, estratificación y desigualdad en sociedades contemporáneas.",
          },
          {
            title: "Cambio Social",
            minutes: 20,
            img: "https://i.ytimg.com/vi/QDh_rvhl4HA/maxresdefault.jpg",
            completed: false,
            url: "/course/sociology/social-change",
            video: "https://www.youtube.com/embed/QDh_rvhl4HA",
            course: "sociology",
            summary:
              "Estudio de los procesos y dinámicas que transforman las estructuras sociales a lo largo del tiempo.",
          },
        ],
        video: "https://www.youtube.com/embed/yDfH5SyV3C8",
        summary:
          "Curso sobre los principios de análisis social, estructuras y dinámicas de grupos humanos en sociedad.",
      },
      research_methods: {
        name: "Métodos de Investigación Social",
        type: "investigación",
        url: "research-methods",
        totalLessons: 3,
        completedLessons: 0,
        icon: <GiMagnifyingGlass />,
        lessons: [
          {
            title: "Diseño de Investigación",
            minutes: 22,
            img: "https://i.ytimg.com/vi/UOrboZzGH8g/maxresdefault.jpg",
            completed: false,
            url: "/course/research-methods/research-design",
            video: "https://www.youtube.com/embed/UOrboZzGH8g",
            course: "research_methods",
            summary:
              "Formulación de preguntas de investigación y selección de metodologías apropiadas.",
          },
          {
            title: "Métodos Cualitativos",
            minutes: 19,
            img: "https://i.ytimg.com/vi/wbfAi9zQDrc/maxresdefault.jpg",
            completed: false,
            url: "/course/research-methods/qualitative-methods",
            video: "https://www.youtube.com/embed/wbfAi9zQDrc",
            course: "research_methods",
            summary:
              "Técnicas de observación, entrevistas y análisis de contenido para la investigación social.",
          },
          {
            title: "Métodos Cuantitativos",
            minutes: 21,
            img: "https://i.ytimg.com/vi/PXWJ6_7jnhs/maxresdefault.jpg",
            completed: false,
            url: "/course/research-methods/quantitative-methods",
            video: "https://www.youtube.com/embed/PXWJ6_7jnhs",
            course: "research_methods",
            summary:
              "Encuestas, muestreo y análisis estadístico en la investigación social y comportamental.",
          },
        ],
        video: "https://www.youtube.com/embed/UOrboZzGH8g",
        summary:
          "Curso sobre metodologías para el estudio sistemático de fenómenos sociales y comportamiento humano.",
      },
      communication: {
        name: "Comunicación y Medios",
        type: "humanidades",
        url: "communication",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaBook />,
        lessons: [
          {
            title: "Teorías de la Comunicación",
            minutes: 18,
            img: "https://i.ytimg.com/vi/GsC2KmVIFc0/maxresdefault.jpg",
            completed: false,
            url: "/course/communication/communication-theories",
            video: "https://www.youtube.com/embed/GsC2KmVIFc0",
            course: "communication",
            summary:
              "Modelos que explican los procesos comunicativos interpersonales, grupales y masivos.",
          },
          {
            title: "Análisis de Medios",
            minutes: 20,
            img: "https://i.ytimg.com/vi/QMRZQb-8Xak/maxresdefault.jpg",
            completed: false,
            url: "/course/communication/media-analysis",
            video: "https://www.youtube.com/embed/QMRZQb-8Xak",
            course: "communication",
            summary:
              "Estudio crítico de mensajes mediáticos y su influencia en la sociedad contemporánea.",
          },
          {
            title: "Comunicación Digital",
            minutes: 17,
            img: "https://i.ytimg.com/vi/og7I9y_8V0A/maxresdefault.jpg",
            completed: false,
            url: "/course/communication/digital-communication",
            video: "https://www.youtube.com/embed/og7I9y_8V0A",
            course: "communication",
            summary:
              "Análisis de nuevas formas de comunicación en entornos digitales y redes sociales.",
          },
        ],
        video: "https://www.youtube.com/embed/GsC2KmVIFc0",
        summary:
          "Curso sobre procesos comunicativos, medios de comunicación y su impacto social y cultural.",
      },
    },

    business: {
      economics: {
        name: "Principios de Economía",
        type: "negocios",
        url: "economics",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaChartLine />,
        lessons: [
          {
            title: "Microeconomía",
            minutes: 20,
            img: "https://i.ytimg.com/vi/ZR4TdgOTRn0/maxresdefault.jpg",
            completed: false,
            url: "/course/economics/microeconomics",
            video: "https://www.youtube.com/embed/ZR4TdgOTRn0",
            course: "economics",
            summary:
              "Análisis del comportamiento económico de individuos, hogares y empresas en mercados específicos.",
          },
          {
            title: "Macroeconomía",
            minutes: 22,
            img: "https://i.ytimg.com/vi/3Ez10ADR_gM/maxresdefault.jpg",
            completed: false,
            url: "/course/economics/macroeconomics",
            video: "https://www.youtube.com/embed/3Ez10ADR_gM",
            course: "economics",
            summary:
              "Estudio de indicadores económicos, políticas fiscales y monetarias a nivel nacional y global.",
          },
          {
            title: "Economía Internacional",
            minutes: 19,
            img: "https://i.ytimg.com/vi/DLT_4jUTKqc/maxresdefault.jpg",
            completed: false,
            url: "/course/economics/international-economics",
            video: "https://www.youtube.com/embed/DLT_4jUTKqc",
            course: "economics",
            summary:
              "Comercio internacional, sistemas financieros globales y desarrollo económico comparado.",
          },
        ],
        video: "https://www.youtube.com/embed/ZR4TdgOTRn0",
        summary:
          "Curso fundamental sobre teorías y principios económicos que rigen los mercados y la economía global.",
      },
      business_management: {
        name: "Gestión Empresarial",
        type: "negocios",
        url: "business-management",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaBuilding />,
        lessons: [
          {
            title: "Fundamentos de Administración",
            minutes: 18,
            img: "https://i.ytimg.com/vi/q2hRXlUXTmI/maxresdefault.jpg",
            completed: false,
            url: "/course/business-management/management-fundamentals",
            video: "https://www.youtube.com/embed/q2hRXlUXTmI",
            course: "business_management",
            summary:
              "Principios de planificación, organización, dirección y control en organizaciones.",
          },
          {
            title: "Marketing Estratégico",
            minutes: 21,
            img: "https://i.ytimg.com/vi/fBL-pCjLw7s/maxresdefault.jpg",
            completed: false,
            url: "/course/business-management/strategic-marketing",
            video: "https://www.youtube.com/embed/fBL-pCjLw7s",
            course: "business_management",
            summary:
              "Análisis de mercados, comportamiento del consumidor y estrategias de posicionamiento.",
          },
          {
            title: "Finanzas Corporativas",
            minutes: 20,
            img: "https://i.ytimg.com/vi/aPAZZakuvdU/maxresdefault.jpg",
            completed: false,
            url: "/course/business-management/corporate-finance",
            video: "https://www.youtube.com/embed/aPAZZakuvdU",
            course: "business_management",
            summary:
              "Gestión financiera, análisis de inversiones y estrategias de financiamiento empresarial.",
          },
        ],
        video: "https://www.youtube.com/embed/q2hRXlUXTmI",
        summary:
          "Curso sobre principios y prácticas de gestión empresarial para organizaciones contemporáneas.",
      },
      entrepreneurship: {
        name: "Emprendimiento e Innovación",
        type: "negocios",
        url: "entrepreneurship",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaRegLightbulb />,
        lessons: [
          {
            title: "Modelos de Negocio",
            minutes: 17,
            img: "https://i.ytimg.com/vi/wlKP-BaC0jA/maxresdefault.jpg",
            completed: false,
            url: "/course/entrepreneurship/business-models",
            video: "https://www.youtube.com/embed/wlKP-BaC0jA",
            course: "entrepreneurship",
            summary:
              "Análisis y diseño de modelos de negocio innovadores y propuestas de valor.",
          },
          {
            title: "Startups y Financiación",
            minutes: 19,
            img: "https://i.ytimg.com/vi/9VpeTiz81gc/maxresdefault.jpg",
            completed: false,
            url: "/course/entrepreneurship/startups-funding",
            video: "https://www.youtube.com/embed/9VpeTiz81gc",
            course: "entrepreneurship",
            summary:
              "Estrategias para lanzar y financiar nuevas empresas en mercados competitivos.",
          },
          {
            title: "Gestión de la Innovación",
            minutes: 18,
            img: "https://i.ytimg.com/vi/dU1y31ZmCxk/maxresdefault.jpg",
            completed: false,
            url: "/course/entrepreneurship/innovation-management",
            video: "https://www.youtube.com/embed/dU1y31ZmCxk",
            course: "entrepreneurship",
            summary:
              "Procesos para fomentar la creatividad y transformar ideas en productos y servicios viables.",
          },
        ],
        video: "https://www.youtube.com/embed/wlKP-BaC0jA",
        summary:
          "Curso práctico sobre creación de empresas, innovación y desarrollo de mentalidad emprendedora.",
      },
      data_analytics: {
        name: "Análisis de Datos para Negocios",
        type: "computación",
        url: "data-analytics",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaDice />,
        lessons: [
          {
            title: "Fundamentos Estadísticos",
            minutes: 20,
            img: "https://i.ytimg.com/vi/xxpc-HPKN28/maxresdefault.jpg",
            completed: false,
            url: "/course/data-analytics/statistical-fundamentals",
            video: "https://www.youtube.com/embed/xxpc-HPKN28",
            course: "data_analytics",
            summary:
              "Principios estadísticos esenciales para analizar e interpretar datos empresariales.",
          },
          {
            title: "Visualización de Datos",
            minutes: 18,
            img: "https://i.ytimg.com/vi/VyhLRJVoIrI/maxresdefault.jpg",
            completed: false,
            url: "/course/data-analytics/data-visualization",
            video: "https://www.youtube.com/embed/VyhLRJVoIrI",
            course: "data_analytics",
            summary:
              "Técnicas para crear representaciones visuales efectivas que comuniquen insights.",
          },
          {
            title: "Inteligencia de Negocios",
            minutes: 22,
            img: "https://i.ytimg.com/vi/26GlBFzPBCY/maxresdefault.jpg",
            completed: false,
            url: "/course/data-analytics/business-intelligence",
            video: "https://www.youtube.com/embed/26GlBFzPBCY",
            course: "data_analytics",
            summary:
              "Herramientas y métodos para transformar datos en información útil para decisiones empresariales.",
          },
        ],
        video: "https://www.youtube.com/embed/xxpc-HPKN28",
        summary:
          "Curso sobre herramientas analíticas para el procesamiento de datos y toma de decisiones en negocios.",
      },
    },

    arts: {
      art_history: {
        name: "Historia del Arte",
        type: "humanidades",
        url: "art-history",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaPaintBrush />,
        lessons: [
          {
            title: "Arte Clásico y Renacentista",
            minutes: 22,
            img: "https://i.ytimg.com/vi/cC04hR-J_F4/maxresdefault.jpg",
            completed: false,
            url: "/course/art-history/classical-renaissance",
            video: "https://www.youtube.com/embed/cC04hR-J_F4",
            course: "art_history",
            summary:
              "Evolución del arte desde la antigüedad grecorromana hasta el florecimiento del Renacimiento.",
          },
          {
            title: "Movimientos Modernos",
            minutes: 19,
            img: "https://i.ytimg.com/vi/q9F8nh_vri8/maxresdefault.jpg",
            completed: false,
            url: "/course/art-history/modern-movements",
            video: "https://www.youtube.com/embed/q9F8nh_vri8",
            course: "art_history",
            summary:
              "Estudio de las vanguardias artísticas desde el impresionismo hasta la modernidad.",
          },
          {
            title: "Arte Contemporáneo",
            minutes: 20,
            img: "https://i.ytimg.com/vi/ZZ9AlSjSo4c/maxresdefault.jpg",
            completed: false,
            url: "/course/art-history/contemporary-art",
            video: "https://www.youtube.com/embed/ZZ9AlSjSo4c",
            course: "art_history",
            summary:
              "Análisis de tendencias artísticas actuales y su contexto cultural y social.",
          },
        ],
        video: "https://www.youtube.com/embed/cC04hR-J_F4",
        summary:
          "Curso sobre la evolución de las expresiones artísticas a lo largo de la historia de la humanidad.",
      },
      literature: {
        name: "Literatura y Expresión",
        type: "humanidades",
        url: "literature",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaBook />,
        lessons: [
          {
            title: "Narrativa y Géneros Literarios",
            minutes: 21,
            img: "https://i.ytimg.com/vi/zU_9Js0z99s/maxresdefault.jpg",
            completed: false,
            url: "/course/literature/narrative-genres",
            video: "https://www.youtube.com/embed/zU_9Js0z99s",
            course: "literature",
            summary:
              "Análisis de técnicas narrativas y clasificación de obras según sus características.",
          },
          {
            title: "Poesía y Expresión Lírica",
            minutes: 18,
            img: "https://i.ytimg.com/vi/JwhouCNq-Fc/maxresdefault.jpg",
            completed: false,
            url: "/course/literature/poetry",
            video: "https://www.youtube.com/embed/JwhouCNq-Fc",
            course: "literature",
            summary:
              "Estudio de recursos poéticos y formas de expresión de sentimientos y vivencias.",
          },
          {
            title: "Escritura Creativa",
            minutes: 20,
            img: "https://i.ytimg.com/vi/U_XaCYKm1-A/maxresdefault.jpg",
            completed: false,
            url: "/course/literature/creative-writing",
            video: "https://www.youtube.com/embed/U_XaCYKm1-A",
            course: "literature",
            summary:
              "Técnicas y ejercicios para desarrollar habilidades narrativas y expresión personal.",
          },
        ],
        video: "https://www.youtube.com/embed/zU_9Js0z99s",
        summary:
          "Curso sobre análisis literario y desarrollo de capacidades expresivas a través de la escritura.",
      },
      philosophy: {
        name: "Filosofía y Pensamiento",
        type: "humanidades",
        url: "philosophy",
        totalLessons: 3,
        completedLessons: 0,
        icon: <FaUniversity />,
        lessons: [
          {
            title: "Filosofía Clásica",
            minutes: 23,
            img: "https://i.ytimg.com/vi/8H6POMRLufk/maxresdefault.jpg",
            completed: false,
            url: "/course/philosophy/classical-philosophy",
            video: "https://www.youtube.com/embed/8H6POMRLufk",
            course: "philosophy",
            summary:
              "Estudio de pensadores griegos y romanos que sentaron las bases del pensamiento occidental.",
          },
          {
            title: "Filosofía Moderna",
            minutes: 21,
            img: "https://i.ytimg.com/vi/1A_CAkYt3GY/maxresdefault.jpg",
            completed: false,
            url: "/course/philosophy/modern-philosophy",
            video: "https://www.youtube.com/embed/1A_CAkYt3GY",
            course: "philosophy",
            summary:
              "Análisis de corrientes filosóficas desde el Renacimiento hasta la Ilustración.",
          },
          {
            title: "Filosofía Contemporánea",
            minutes: 20,
            img: "https://i.ytimg.com/vi/Ys5b_bgiwrg/maxresdefault.jpg",
            completed: false,
            url: "/course/philosophy/contemporary-philosophy",
            video: "https://www.youtube.com/embed/Ys5b_bgiwrg",
            course: "philosophy",
            summary:
              "Exploración de tendencias filosóficas de los siglos XX y XXI y su impacto social.",
          },
        ],
        video: "https://www.youtube.com/embed/8H6POMRLufk",
        summary:
          "Curso sobre las grandes corrientes del pensamiento filosófico y su relevancia en la actualidad.",
      },
    },
  };
  
  return coursesMap[fieldKey]
};
