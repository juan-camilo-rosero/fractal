'use client'

import Lesson from "./Lesson";

const lessons = [
  {
    title: "Linear functions",
    minutes: 16,
    img: "https://i.ytimg.com/vi/BtcKotD6Ni8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDhv8645uoEJ8-Ej-n1uwhLcGEyGg",
    completed: true,
    url: "/course/functions/linear-functions",
    video: "https://www.youtube.com/watch?v=BtcKotD6Ni8",
    course: "functions"
  },
  {
    title: "Quadratic functions",
    minutes: 24,
    img: "https://i.ytimg.com/vi/IlNAJl36-10/maxresdefault.jpg",
    completed: true,
    url: "/course/functions/quadratic-functions",
    video: "https://www.youtube.com/watch?v=Hq2Up_1Ih5E",
    course: "functions"
  },
  {
    title: "Trigonometric identities",
    minutes: 18,
    img: "https://i.ytimg.com/vi/m1OitPmkydY/maxresdefault.jpg",
    completed: false,
    url: "/course/functions/trigonometric-identities",
    video: "https://www.youtube.com/watch?v=WvoFgL4P_rw",
    course: "functions"
  },
  {
    title: "Exponential functions",
    minutes: 11,
    img: "https://i.ytimg.com/vi/tAaDItpC8OI/maxresdefault.jpg",
    completed: false,
    url: "/course/functions/exponential-functions",
    video: "https://www.youtube.com/watch?v=3G5WluJ7LFA",
    course: "functions"
  },
];

function Lessons() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
      <div className="flex flex-col gap-4 lg:max-h-[80vh] lg:overflow-y-auto py-3 rounded-xl">
        {lessons.map((lesson, index) => (
          <Lesson lesson={lesson} key={index} preview={true} />
        ))}
      </div>
    </div>
  );
}

export default Lessons;
