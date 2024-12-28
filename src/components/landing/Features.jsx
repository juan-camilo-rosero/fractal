"use client";

import Figure from "./Figure";

function Features() {
  return (
    <section className="pt-24 px-8 min-h-screen pb-20 md:px-16">
      <h2 className="text-center font-semibold text-3xl text-fblue-700 mb-12 md:text-4xl md:mb-20">
        ¿Why fractal?
      </h2>
      <div className="flex flex-col gap-10 items-center md:flex-row md:flex-wrap md:justify-between">
        <div className="flex flex-col gap-10 md:flex-row">
          <Figure
            title="Customized lessons"
            desc="All of our lessons are created especially for each student, no two curriculums are identical."
            route="/images/features/feature_1.png"
            alt="Customized lessons"
          />
          <Figure
            title="Make it to university"
            desc="Improve your chances of getting into college with our lessons"
            route="/images/features/feature_2.png"
            alt="Make it to university"
          />
        </div>
        <div className="flex flex-col gap-10 md:flex-row">
          <Figure
            title="Different formats"
            desc="Do you learn better with videos, or do you prefer a lecture, don&apos;t worry, we use both to make learning easy for you."
            route="/images/features/feature_3.png"
            alt="Different formats"
          />
          <Figure
            title="Practice questions"
            desc="Test what you've learned with a question to practice after each lesson"
            route="/images/features/feature_4.png"
            alt="Practice questions"
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
