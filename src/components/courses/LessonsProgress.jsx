"use client";

import { useContext } from "react";
import LessonProgress from "./LessonProgress";
import { CoursesContext } from "@/context/CoursesContext";
import Button from "@/components/general/Button";

function LessonsProgress() {
  const { lessons } = useContext(CoursesContext);
  return (
    <div className="w-full bg-fgray-200 p-5 rounded-xl lg:flex lg:flex-col lg:items-center lg:px-0">
      <h2 className="text-2xl font-semibold mb-4 text-center w-full text-fblue-700">
        Lesson completion
      </h2>
      <div className="w-full flex flex-col my-4 lg:w-4/5">
        <div className="w-full h-2 bg-fgray-100 rounded-full mb-1 lg:mb-2" />
        <div className="flex items-center justify-between text-fgray-800 text-sm font-semibold">
          <p>25% completed</p>
          <p>1/4 lessons</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:max-h-[50vh] lg:overflow-y-auto py-3 rounded-xl lg:w-4/5">
        {lessons.map((lesson, index) => (
          <LessonProgress lesson={lesson} key={index} preview={true} />
        ))}
      </div>
        <Button
          text="Mark as finished"
          type="primary"
          size="xl"
          func={(e) => setSignUpOpen(true)}
          aditionalStyles="w-full lg:w-4/5 lg:text-xl lg:mt-4"
        />
    </div>
  );
}

export default LessonsProgress;
