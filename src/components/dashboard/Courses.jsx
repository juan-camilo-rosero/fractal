import { RiCalculatorFill, RiCalculatorLine, RiLeafFill, RiTimeFill, RiBookReadLine } from "react-icons/ri";

const courses = [
  {
    name: "Functions",
    subject: "math",
    totalLessons: 6,
    completedLessons: 4,
    url: "#",
  },
  {
    name: "Genetics",
    subject: "science",
    totalLessons: 5,
    completedLessons: 1,
    url: "#",
  },
  {
    name: "Cold war",
    subject: "social-studies",
    totalLessons: 6,
    completedLessons: 3,
    url: "#",
  },
  {
    name: "Climate change",
    subject: "science",
    totalLessons: 3,
    completedLessons: 2,
    url: "#",
  },
  {
    name: "Shakespeare's Works",
    subject: "literature",
    totalLessons: 5,
    completedLessons: 5,
    url: "#",
  },
];

function Courses() {
  // Función para obtener el icono correcto según la asignatura
  const getIcon = (subject) => {
    switch (subject) {
      case "math":
        return <RiCalculatorLine/>;
      case "science":
        return <RiLeafFill/>;
      case "history":
        return <RiTimeFill/>;
      case "literature":
        return <RiBookReadLine/>;
      case "social-studies":
        return <RiTimeFill/>;
      case "languages":
        return <RiBookReadLine/>;
      default:
        return <RiCalculatorLine/>;
    }
  };

  // Ordenar cursos: los completados al final
  const sortedCourses = [...courses].sort((a, b) => {
    return a.completedLessons === a.totalLessons ? 1 : -1;
  });

  return (
    <div className="w-full px-5 mt-4">
      <h2 className="font-semibold text-3xl mb-8 text-fblue-700">My courses</h2>
      <div className="w-full flex flex-wrap gap-5 pb-16 lg:pb-5">
        {sortedCourses.map((course, i) => {
          const progress = course.completedLessons / course.totalLessons;
          const isCompleted = course.completedLessons === course.totalLessons;
          return (
            <a
              key={i}
              href={course.url}
              className={`border-2 p-5 rounded-lg cursor-pointer  w-full md:w-[48%] lg:w-[calc(25%-1.25rem)] transition-all ${
                isCompleted ? "bg-fblue-700" : "bg-white border-fgray-600 hover:bg-fgray-200"
              }`}
            >
              <div className="mb-8">
                <div
                  className={`w-16 h-16 md:w-12 md:h-12 bg-fblue-700 rounded-full flex items-center justify-center text-3xl md:text-2xl ${
                    isCompleted ? "bg-white text-fred-700" : "bg-fblue-700 text-fgray-100"
                  }`}
                >
                  {getIcon(course.subject)}
                </div>
              </div>
              <h4
                className={`text-xl font-semibold ${
                  isCompleted ? "text-fgray-200" : "text-fblue-700"
                }`}
              >
                {course.name}
              </h4>
              <div className="w-full h-1 rounded-full bg-fgray-200 mt-4 mb-2">
                <div
                  className="h-full bg-fred-700 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
              <p
                className={`font-semibold text-sm ${
                  isCompleted ? "text-fgray-200" : "text-fgray-600"
                }`}
              >
                {isCompleted
                  ? "Completed"
                  : `Progress: ${course.completedLessons}/${course.totalLessons}`}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;