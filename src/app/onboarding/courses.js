import { FaChartLine, FaDice, FaDrawPolygon } from "react-icons/fa";
import { TbWaveSine } from "react-icons/tb";

export const courses = {
  functions: {
    name: "Funciones",
    type: "math",
    url: "functions",
    totalLessons: 3,
    completedLessons: 0,
    icon: <FaChartLine />,
    lessons: [
      {
        title: "Funciones Lineales",
        minutes: 16,
        img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
        completed: false,
        url: "/course/functions/linear-functions",
        video: "https://www.youtube.com/embed/BtcKotD6Ni8",
        course: "functions",
        summary:
          "Son funciones matemáticas representadas por una ecuación de la forma y = mx + b, donde m es la pendiente y b es la intersección con el eje y. La principal característica de las funciones lineales es que su gráfica es una línea recta, lo que indica una relación constante entre las variables. Por cada unidad que cambia x, y cambia en una cantidad constante determinada por m. Son esenciales en campos como la economía, física e ingeniería.",
      },
      {
        title: "Funciones Cuadráticas",
        minutes: 24,
        img: "https://i.ytimg.com/vi/IlNAJl36-10/maxresdefault.jpg",
        completed: false,
        url: "/course/functions/quadratic-functions",
        video: "https://www.youtube.com/embed/Hq2Up_1Ih5E",
        course: "functions",
        summary:
          "Estas funciones tienen la forma y = ax² + bx + c, donde a, b y c son constantes y a ≠ 0. Su gráfica es una parábola, que puede abrirse hacia arriba o hacia abajo según el signo de a. Las funciones cuadráticas tienen una tasa de cambio que varía gradualmente, y se utilizan en situaciones que involucran aceleración, como el movimiento bajo la gravedad.",
      },
      {
        title: "Funciones Exponenciales",
        minutes: 11,
        img: "https://i.ytimg.com/vi/tAaDItpC8OI/maxresdefault.jpg",
        completed: false,
        url: "/course/functions/exponential-functions",
        video: "https://www.youtube.com/embed/3G5WluJ7LFA",
        course: "functions",
        summary:
          "Estas funciones se definen por la forma y = a * b^x, donde a es una constante y b es la base (usualmente mayor que 1). Su característica clave es que y crece o decrece a una tasa proporcional a su valor actual, lo que produce un crecimiento o decaimiento muy rápido. Se usan para modelar fenómenos naturales y científicos como el crecimiento poblacional, la desintegración radiactiva y el interés compuesto.",
      },
    ],
    video: "https://www.youtube.com/embed/52tpYl2tTqk",
    summary:
      "Las funciones son un concepto fundamental en matemáticas que describen la relación entre dos conjuntos de elementos, generalmente representados como entradas y salidas.",
  },

  "probability and statistics": {
    name: "Probabilidad y Estadística",
    type: "math",
    url: "probability-statistics",
    totalLessons: 3,
    completedLessons: 0,
    icon: <FaDice />,
    lessons: [
      {
        title: "Probabilidad Básica",
        minutes: 18,
        img: "https://i.ytimg.com/vi/V2fPL1mTtzk/maxresdefault.jpg",
        completed: false,
        url: "/course/probability-statistics/basic-probability",
        video: "https://www.youtube.com/embed/V2fPL1mTtzk",
        course: "probabilityStatistics",
        summary:
          "Esta lección cubre los conceptos fundamentales de probabilidad, incluyendo eventos, espacio muestral y la probabilidad de ocurrencia. Comprender estos principios es clave para interpretar y predecir resultados en diversas situaciones, como juegos de azar y análisis estadísticos.",
      },
      {
        title: "Estadística Descriptiva",
        minutes: 22,
        img: "https://i.ytimg.com/vi/mVQyF-L4N2Q/maxresdefault.jpg",
        completed: false,
        url: "/course/probability-statistics/descriptive-statistics",
        video: "https://www.youtube.com/embed/mVQyF-L4N2Q",
        course: "probabilityStatistics",
        summary:
          "La estadística descriptiva incluye métodos para resumir y visualizar datos. Esta lección se enfoca en medidas de tendencia central (media, mediana, moda) y de dispersión (rango, varianza, desviación estándar) para describir conjuntos de datos.",
      },
      {
        title: "Distribuciones de Probabilidad",
        minutes: 20,
        img: "https://i.ytimg.com/vi/poRRLHE5htg/maxresdefault.jpg",
        completed: false,
        url: "/course/probability-statistics/probability-distributions",
        video: "https://www.youtube.com/embed/poRRLHE5htg",
        course: "probabilityStatistics",
        summary:
          "Esta lección introduce el concepto de distribuciones de probabilidad, tanto discretas como continuas. Explica cómo estas distribuciones modelan fenómenos reales y su papel en la inferencia estadística y pruebas de hipótesis.",
      },
    ],
    video: "https://www.youtube.com/embed/kLZ7uK6M0_w",
    summary:
      "La probabilidad y la estadística son campos esenciales de las matemáticas que nos ayudan a entender y analizar la probabilidad de eventos e interpretar datos.",
  },

  trigonometry: {
    name: "Trigonometría",
    type: "math",
    url: "trigonometry",
    totalLessons: 3,
    completedLessons: 0,
    icon: <TbWaveSine />,
    lessons: [
      {
        title: "Seno, Coseno y Tangente",
        minutes: 16,
        img: "https://i.ytimg.com/vi/lVxwv_g9Alo/maxresdefault.jpg",
        completed: false,
        url: "/course/trigonometry/sine-cosine-tangent",
        video: "https://www.youtube.com/embed/lVxwv_g9Alo",
        course: "trigonometry",
        summary:
          "En esta lección se estudian las tres funciones trigonométricas fundamentales: seno, coseno y tangente. Estas funciones relacionan los ángulos de un triángulo rectángulo con las razones entre sus lados. Son fundamentales para resolver problemas de ángulos y distancias.",
      },
      {
        title: "Identidades Trigonométricas",
        minutes: 20,
        img: "https://i.ytimg.com/vi/dv8zzQG6D1k/maxresdefault.jpg",
        completed: false,
        url: "/course/trigonometry/trigonometric-identities",
        video: "https://www.youtube.com/embed/dv8zzQG6D1k",
        course: "trigonometry",
        summary:
          "Esta lección se enfoca en identidades trigonométricas esenciales, como la identidad pitagórica, identidades de suma de ángulos y de doble ángulo. Son herramientas útiles para simplificar expresiones y resolver ecuaciones trigonométricas.",
      },
      {
        title: "Aplicaciones de la Trigonometría",
        minutes: 18,
        img: "https://i.ytimg.com/vi/hDpz3ORzhhg/maxresdefault.jpg",
        completed: false,
        url: "/course/trigonometry/applications-of-trigonometry",
        video: "https://www.youtube.com/embed/hDpz3ORzhhg",
        course: "trigonometry",
        summary:
          "Esta lección cubre las aplicaciones de la trigonometría en problemas del mundo real, como el cálculo de alturas, distancias, navegación y movimiento ondulatorio. También se explora el concepto del círculo unitario y su relación con las funciones trigonométricas.",
      },
    ],
    video: "https://www.youtube.com/embed/Z6L4GVAZfzM",
    summary:
      "La trigonometría estudia las relaciones entre ángulos y lados de triángulos, y tiene amplias aplicaciones en física, ingeniería y arquitectura.",
  },

  geometry: {
    name: "Geometría",
    type: "math",
    url: "geometry",
    totalLessons: 3,
    completedLessons: 0,
    icon: <FaDrawPolygon />,
    lessons: [
      {
        title: "Fundamentos de la Geometría",
        minutes: 15,
        img: "https://i.ytimg.com/vi/K0bF0QsJ4RQ/maxresdefault.jpg",
        completed: false,
        url: "/course/geometry/the-basics-of-geometry",
        video: "https://www.youtube.com/embed/K0bF0QsJ4RQ",
        course: "geometry",
        summary:
          "Esta lección introduce los conceptos básicos de geometría como puntos, líneas, planos, ángulos y figuras. Se destaca su importancia para entender las relaciones geométricas y resolver problemas relacionados.",
      },
      {
        title: "Círculos y Polígonos",
        minutes: 22,
        img: "https://i.ytimg.com/vi/DsX1X0I7uhk/maxresdefault.jpg",
        completed: false,
        url: "/course/geometry/circles-and-polygons",
        video: "https://www.youtube.com/embed/DsX1X0I7uhk",
        course: "geometry",
        summary:
          "Esta lección trata sobre las propiedades de los círculos y polígonos, como circunferencia, área, ángulos y relaciones entre lados y ángulos. Estas propiedades son fundamentales para resolver problemas geométricos.",
      },
      {
        title: "Geometría Sólida",
        minutes: 20,
        img: "https://i.ytimg.com/vi/hHRdK3mj1iA/maxresdefault.jpg",
        completed: false,
        url: "/course/geometry/solid-geometry",
        video: "https://www.youtube.com/embed/hHRdK3mj1iA",
        course: "geometry",
        summary:
          "En esta lección se estudian figuras tridimensionales como cubos, esferas y cilindros. Se enseña cómo calcular su área superficial, volumen y otras propiedades importantes en campos como arquitectura e ingeniería.",
      },
    ],
    video: "https://www.youtube.com/embed/mxrhM6z3Fik",
    summary:
      "La geometría es una rama de las matemáticas que estudia las propiedades, mediciones y relaciones de puntos, líneas, ángulos y figuras en el espacio.",
  },
};
