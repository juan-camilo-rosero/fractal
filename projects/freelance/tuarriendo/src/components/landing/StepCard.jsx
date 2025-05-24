"use client";

import React, { useState } from "react";

function StepCard({ index, title, content, color, icon: Icon }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Intencionalmente vacío para mantener el color
  };

  return (
    <figure
      className={`flex-shrink-0 w-[80vw] md:w-auto cursor-pointer rounded-2xl transition-all shadow-lg group ${
        isHovered
          ? !color
            ? "bg-secondary-500"
            : "bg-primary-500"
          : "bg-third-300"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`w-full h-auto py-5 md:py-7 px-6 rounded-b-lg md:rounded-b-2xl ${
          isHovered ? "text-third-200" : "text-black"
        } font-semibold flex flex-col gap-4 text-2xl transition-all`}
      >
        <div className="w-full h-28 justify-between items-start flex">
          <p className="text-5xl opacity-50">0{index}</p>
          <figure
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              !color ? "bg-primary-500" : "bg-secondary-500"
            }`}
          >
            {Icon && <Icon className="text-white text-3xl" />}
          </figure>
        </div>
        <h3 className="font-semibold text-xl">{title}</h3>
        <p className="font-medium text-base">{content}</p>
      </div>
    </figure>
  );
}

export default StepCard;
