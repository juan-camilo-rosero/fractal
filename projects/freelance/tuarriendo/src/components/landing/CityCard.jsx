"use client";
import React, { useContext } from "react";
import { MapContext } from "../../context/MapContext";

function CityCard({ name, img, color, lat, lng, index }) {
  const { setShowMap, setLocation, setMapZoom } = useContext(MapContext);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowMap(true);
    setLocation({ lat, lng });
    setMapZoom(9);
  };

  return (
    <button
      className={`group w-60 flex-shrink-0 lg:flex-1 cursor-pointer rounded-2xl transition-all shadow-lg h-52 relative overflow-hidden mx-1 md:mx-2 ${
        index % 2 !== 0 ? "lg:translate-y-12" : ""
      }`}
      onClick={handleClick}
    >
      {/* Imagen de fondo */}
      <img
        src={img}
        alt={`Foto de ${name}`}
        className="w-full h-full object-cover absolute top-0 left-0 rounded-2xl"
      />

      <div
        className={`absolute inset-0 w-full h-full bg-black/50 transition-colors duration-300 ${
          index % 2 == 0
            ? "md:group-hover:bg-primary-700/75"
            : "md:group-hover:bg-secondary-700/75"
        }`}
      ></div>

      {/* Texto centrado */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <p className="font-semibold text-center text-third-200 text-2xl">
          {name}
        </p>
      </div>
    </button>
  );
}

export default CityCard;
