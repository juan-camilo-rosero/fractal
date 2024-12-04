"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Librería de íconos react-icons

function FormInput({
  id,
  value,
  setValue,
  labelText,
  placeholder,
  type = "text",
  icon = undefined,
}) {
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar el enfoque
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Estado para alternar visibilidad de contraseña

  const hasContent = value && value.trim() !== ""; // Verifica si hay contenido
  const inputType = type === "password" && isPasswordVisible ? "text" : type; // Alterna entre texto y contraseña

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <label htmlFor={id} className="text-fgray-800 text-xl font-semibold">
        {labelText}:
      </label>
      <div className="relative w-full">
        <span
          className={`absolute inset-y-0 left-3 flex items-center text-lg ${
            isFocused || hasContent ? "text-fgray-800" : "text-fgray-600"
          }`}
        >
          {icon}
        </span>
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className={`absolute inset-y-0 right-3 flex items-center text-lg ${
              isFocused || hasContent ? "text-fgray-800" : "text-fgray-600"
            }`}
            aria-label={
              isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-[7px] rounded-md bg-fgray-200 border-[2px] border-fgray-400 outline-none focus:border-fgray-800 text-lg ${
            type === "password" ? "px-10" : icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default FormInput;