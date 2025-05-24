import React from "react";

function InfoCard({ title, content, icon }) {
  return (
    <article className="w-full py-8 flex flex-col gap-4 lg:py-6 lg:flex-row">
      <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-third-300 flex items-center justify-center text-2xl text-secondary-500 lg:mr-4 lg:mt-2">
        {icon}
      </div>

      <div className="flex flex-col">
        <h3 className="text-primary-500 font-semibold text-xl md:text-2xl lg:text-left pt-3 pb-1">
          {title}
        </h3>

        <p className="font-semibold opacity-50 md:text-lg lg:w-full mt-3">
          {content}
        </p>
      </div>
    </article>
  );
}

export default InfoCard;
