'use client'

import Lesson from "./Lesson";

const lessons = [
  {
    title: "Linear functions",
    minutes: 16,
    img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
    completed: true,
    url: "/lesson/linear-functions",
    course: "functions"
  },
  {
    title: "Quadratic functions",
    minutes: 24,
    img: "https://i.ytimg.com/vi/IlNAJl36-10/maxresdefault.jpg",
    completed: true,
    url: "/lesson/quadratic-functions",
    course: "functions"
  },
  {
    title: "Trigonometric identities",
    minutes: 18,
    img: "https://i.ytimg.com/vi/m1OitPmkydY/maxresdefault.jpg",
    completed: false,
    url: "/lesson/trigonometric-identities",
    course: "functions"
  },
  {
    title: "Exponential functions",
    minutes: 11,
    img: "https://i.ytimg.com/vi/tAaDItpC8OI/maxresdefault.jpg",
    completed: false,
    url: "/lesson/exponential-functions",
    course: "functions"
  },
];

function Lessons() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
      <div className="flex flex-col gap-4">
        {lessons.map((lesson, index) => (
          <Lesson lesson={lesson} key={index} preview={true} />
        ))}
      </div>
    </div>
  );
}

export default Lessons;
