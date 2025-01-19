import { FaChartLine, FaDice, FaDrawPolygon } from "react-icons/fa";
import { TbWaveSine } from "react-icons/tb";

export const courses = {
    functions: {
      name: "Functions",
      type: "math",
      url: "functions",
      totalLessons: 3,
      completedLessons: 0,
      icon: <FaChartLine/>,
      lessons: [
        {
          title: "Linear Functions",
          minutes: 16,
          img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
          completed: false,
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
      icon: <FaDice/>,
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
      icon: <TbWaveSine />,
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
      icon: <FaDrawPolygon/>,
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