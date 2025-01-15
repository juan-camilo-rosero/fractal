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

const courses = {
  functions: {
    name: "Functions",
    type: "math",
    url: "functions",
    totalLessons: 3,
    completedLessons: 1,
    lessons: [
      {
        title: "Linear Functions",
        minutes: 16,
        img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
        completed: true,
        url: "/course/functions/linear-functions",
        video: "https://www.youtube.com/embed/BtcKotD6Ni8",
        course: "functions",
        summary:
          "These are mathematical functions represented by an equation of the form y=mx+b, where m is the slope and b is the y-intercept. The main characteristic of linear functions is that their graph is a straight line. This means that the relationship between the variables is constant; for each unit change in x, the value of y changes by a constant amount determined by m. Linear functions are essential in many fields, such as economics, physics, and engineering, as they describe behaviors with constant rates of change.",
      },
      {
        title: "Quadratic Functions",
        minutes: 24,
        img: "https://i.ytimg.com/vi/IlNAJl36-10/maxresdefault.jpg",
        completed: false,
        url: "/course/functions/quadratic-functions",
        video: "https://www.youtube.com/embed/Hq2Up_1Ih5E",
        course: "functions",
        summary:
          "These functions take the form y=ax²+bx+c, where a, b, and c are constants and a≠0. The graph of a quadratic function is a parabola, which can open either upward or downward depending on the sign of a. Quadratic functions are characterized by having a rate of change that is not constant but changes gradually as x increases or decreases. They are commonly found in situations involving acceleration, such as the motion of an object under the influence of gravity.",
      },
      {
        title: "Exponential Functions",
        minutes: 11,
        img: "https://i.ytimg.com/vi/tAaDItpC8OI/maxresdefault.jpg",
        completed: false,
        url: "/course/functions/exponential-functions",
        video: "https://www.youtube.com/embed/3G5WluJ7LFA",
        course: "functions",
        summary:
          "These are defined by the form y=a*b^x, where a is a constant value and b is the base of the exponential function (usually greater than 1). The key feature of exponential functions is that the variable y grows (or decays) at a rate proportional to its current value, resulting in very rapid growth or decay. These functions are used to model many natural and scientific phenomena, such as population growth, radioactive decay, and compound interest in economics.",
      },
    ],
    video: "https://www.youtube.com/embed/52tpYl2tTqk",
    summary:
      "Functions are a fundamental concept in mathematics that describe the relationship between two sets of elements, often represented as inputs and outputs.",
  },
  "probability and statistics": {
    name: "Probability and Statistics",
    type: "math",
    url: "probability-statistics",
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      {
        title: "Basic Probability",
        minutes: 18,
        img: "https://i.ytimg.com/vi/V2fPL1mTtzk/maxresdefault.jpg",
        completed: false,
        url: "/course/probability-statistics/basic-probability",
        video: "https://www.youtube.com/embed/V2fPL1mTtzk",
        course: "probabilityStatistics",
        summary:
          "This lesson covers the foundational concepts of probability, including events, sample space, and the probability of events occurring. Understanding these principles is key for interpreting and predicting outcomes in a variety of situations, such as games of chance and statistical analyses.",
      },
      {
        title: "Descriptive Statistics",
        minutes: 22,
        img: "https://i.ytimg.com/vi/mVQyF-L4N2Q/maxresdefault.jpg",
        completed: false,
        url: "/course/probability-statistics/descriptive-statistics",
        video: "https://www.youtube.com/embed/mVQyF-L4N2Q",
        course: "probabilityStatistics",
        summary:
          "Descriptive statistics involves the methods for summarizing and visualizing data. This lesson focuses on measures of central tendency (mean, median, mode) and measures of dispersion (range, variance, standard deviation) to describe data sets.",
      },
      {
        title: "Probability Distributions",
        minutes: 20,
        img: "https://i.ytimg.com/vi/poRRLHE5htg/maxresdefault.jpg",
        completed: false,
        url: "/course/probability-statistics/probability-distributions",
        video: "https://www.youtube.com/embed/poRRLHE5htg",
        course: "probabilityStatistics",
        summary:
          "This lesson introduces the concept of probability distributions, including discrete and continuous distributions. It explains how these distributions model real-world phenomena and their role in statistical inference and hypothesis testing.",
      },
    ],
    video: "https://www.youtube.com/embed/kLZ7uK6M0_w",
    summary:
      "Probability and statistics are essential fields of mathematics that help us understand and analyze the likelihood of events and interpret data.",
  },
  trigonometry: {
    name: "Trigonometry",
    type: "math",
    url: "trigonometry",
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      {
        title: "Sine, Cosine, and Tangent",
        minutes: 16,
        img: "https://i.ytimg.com/vi/lVxwv_g9Alo/maxresdefault.jpg",
        completed: false,
        url: "/course/trigonometry/sine-cosine-tangent",
        video: "https://www.youtube.com/embed/lVxwv_g9Alo",
        course: "trigonometry",
        summary:
          "In this lesson, students will learn about the three fundamental trigonometric functions: sine, cosine, and tangent. These functions are used to relate the angles of a right triangle to the ratios of its sides. Understanding these concepts is crucial for solving problems involving angles and distances.",
      },
      {
        title: "Trigonometric Identities",
        minutes: 20,
        img: "https://i.ytimg.com/vi/dv8zzQG6D1k/maxresdefault.jpg",
        completed: false,
        url: "/course/trigonometry/trigonometric-identities",
        video: "https://www.youtube.com/embed/dv8zzQG6D1k",
        course: "trigonometry",
        summary:
          "This lesson focuses on the essential trigonometric identities, such as the Pythagorean identity, angle sum identities, and double angle identities. These identities are powerful tools for simplifying trigonometric expressions and solving trigonometric equations.",
      },
      {
        title: "Applications of Trigonometry",
        minutes: 18,
        img: "https://i.ytimg.com/vi/hDpz3ORzhhg/maxresdefault.jpg",
        completed: false,
        url: "/course/trigonometry/applications-of-trigonometry",
        video: "https://www.youtube.com/embed/hDpz3ORzhhg",
        course: "trigonometry",
        summary:
          "This lesson covers the various applications of trigonometry in real-world problems, such as calculating heights and distances, navigation, and wave motion. Students will also explore the concept of the unit circle and how it relates to trigonometric functions.",
      },
    ],
    video: "https://www.youtube.com/embed/Z6L4GVAZfzM",
    summary:
      "Trigonometry is the study of the relationships between the angles and sides of triangles, and it has wide applications in physics, engineering, and architecture.",
  },
  geometry: {
    name: "Geometry",
    type: "math",
    url: "geometry",
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      {
        title: "The Basics of Geometry",
        minutes: 15,
        img: "https://i.ytimg.com/vi/K0bF0QsJ4RQ/maxresdefault.jpg",
        completed: false,
        url: "/course/geometry/the-basics-of-geometry",
        video: "https://www.youtube.com/embed/K0bF0QsJ4RQ",
        course: "geometry",
        summary:
          "This lesson introduces the basic concepts of geometry, such as points, lines, planes, angles, and shapes. Students will learn about the importance of these concepts in understanding geometric relationships and solving geometric problems.",
      },
      {
        title: "Circles and Polygons",
        minutes: 22,
        img: "https://i.ytimg.com/vi/DsX1X0I7uhk/maxresdefault.jpg",
        completed: false,
        url: "/course/geometry/circles-and-polygons",
        video: "https://www.youtube.com/embed/DsX1X0I7uhk",
        course: "geometry",
        summary:
          "This lesson focuses on the properties of circles and polygons, including circumference, area, angles, and the relationships between sides and angles in different types of polygons. Understanding these properties is essential for solving geometric problems.",
      },
      {
        title: "Solid Geometry",
        minutes: 20,
        img: "https://i.ytimg.com/vi/hHRdK3mj1iA/maxresdefault.jpg",
        completed: false,
        url: "/course/geometry/solid-geometry",
        video: "https://www.youtube.com/embed/hHRdK3mj1iA",
        course: "geometry",
        summary:
          "In this lesson, students will explore three-dimensional shapes, such as cubes, spheres, and cylinders. They will learn how to calculate surface area, volume, and other properties of these solids, which are crucial in fields like architecture and engineering.",
      },
    ],
    video: "https://www.youtube.com/embed/mxrhM6z3Fik",
    summary:
      "Geometry is the branch of mathematics that deals with the properties, measurement, and relationships of points, lines, angles, and shapes in space.",
  },
};

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
      alert("Name is required.");
      return false;
    }
    if (!lastName) {
      alert("Last name is required.");
      return false;
    }
    if (!phone) {
      alert("Phone number is required.");
      return false;
    }
    if (!school) {
      alert("Please select a school.");
      return false;
    }
    return true;
  };

  const validateSection2 = () => {
    if (!exam) {
      alert("Please select an exam.");
      return false;
    }
    if (!examDate) {
      alert("Please select an exam date.");
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

  const handleSend = async (e) => {
    setIsLoading(true);

    try {
      const newCourses = selectedCourses.map((course) => courses[course]);

      const coursesObject = newCourses.reduce((acc, course, index) => {
        acc[index] = course;
        return acc;
      }, {});

      console.log(email);

      await updateDocument("users", email, {
        username,
        lastName,
        phone,
        school,
        exam,
        examDate,
      });

      await addDocumentWithCustomId("courses", coursesObject, email);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un problema al procesar la información. Intenta de nuevo.");
    } finally {
      setIsLoading(true);
    }
  };

  const toggleCourseSelection = (courseName) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseName)
        ? prevSelectedCourses.filter((course) => course !== courseName)
        : [...prevSelectedCourses, courseName]
    );
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-fgray-100">
      {section === 0 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-3/4 lg:w-1/2">
          <h1 className="text-center text-3xl font-bold text-fblue-700 lg:text-5xl">
            Welcome to <span className="text-fred-700">Fractal</span>
          </h1>
          <h2 className="text-fgray-600 text-center mt-10 font-semibold md:text-xl">
            Before we get started, we'd love to get to know you a little bit so
            we can tailor the content to your unique needs.
          </h2>
          <Button
            text="Continue"
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
                labelText="Name"
                value={username}
                setValue={setUsername}
                placeholder=""
                type="text"
              />
              <FormInput
                labelText="Last name"
                value={lastName}
                setValue={setLastName}
                type="text"
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
              <FormInput
                labelText="Phone number"
                value={phone}
                setValue={setPhone}
                type="tel"
              />
              <FormSelection
                labelText="School"
                value={school}
                setValue={setSchool}
                id="school"
                options={[
                  { value: "cambridge_school", label: "Cambridge School" },
                  { value: "oxford_school", label: "Oxford School" },
                  { value: "harvard_school", label: "Harvard School" },
                  { value: "purdue_school", label: "Purdue School" },
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row-reverse lg:gap-10 lg:mt-6 lg:justify-start">
              <Button
                text="continue"
                type="primary"
                size="xl"
                func={handleContinueSection1}
                aditionalStyles={`w-full py-3 mt-12 transition-all lg:w-auto lg:px-16 lg:py-2 lg:mt-0`}
              />
              <Button
                text="return"
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
                labelText="What exam will you present?"
                value={exam}
                setValue={setExam}
                id="exam"
                options={[
                  { value: "icfes", label: "ICFES" },
                  { value: "unal", label: "UNAL" },
                ]}
              />
              <FormSelection
                labelText="When will you present it?"
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
                text="Continue"
                type="primary"
                size="xl"
                func={handleContinueSection2}
                aditionalStyles={`w-full py-3 mt-12 transition-all lg:w-auto lg:px-16 lg:py-2 lg:mt-0`}
              />
              <Button
                text="Return"
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
          <h3 className="text-3xl font-semibold text-fgray-800 text-center">
            What do you want to learn?
          </h3>
          <div className="w-full flex mt-12 flex-col gap-6 lg:flex-row lg:flex-wrap lg:gap-6 lg:justify-between">
            {Object.keys(courses).map((courseName, index) => {
              const isSelected = selectedCourses.includes(courseName);
              return (
                <figure
                  key={index}
                  className={`w-full lg:block xl:w-1/3 py-4 px-8 rounded-lg border-2 ${
                    isSelected
                      ? "bg-fblue-700 text-fgray-200"
                      : "border-fgray-400"
                  } flex items-center justify-center cursor-pointer transition-all`}
                  onClick={() => toggleCourseSelection(courseName)}
                >
                  <p className="text-2xl font-semibold text-center">
                    {courses[courseName].name}
                  </p>
                </figure>
              );
            })}
          </div>

          <div className="w-full flex flex-col md:flex-row gap-6 mt-12 lg:flex-row-reverse">
            <Button
              text={isLoading ? "Loading..." : "Continue"}
              type="primary"
              size="xl"
              func={handleSend}
              aditionalStyles="w-full lg:w-auto lg:px-16 disabled:bg-opacity-50 disabled:cursor-default"
              disabled={isLoading}
            />
            <Button
              text="Return"
              type="secondary"
              size="xl"
              func={() => setSection(2)}
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
