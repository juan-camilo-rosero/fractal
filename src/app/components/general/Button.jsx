"use client";

function Button({ text, func, type, size, aditionalStyles = "" }) {
  const baseClasses =
    type === "primary"
      ? "text-fgray-200"
      : "text-fblue-700 border-2 border-fblue-700";

  const bgClass = type === "primary" ? "bg-fred-700" : "bg-transparent";

  const sizeClass = size ? `text-${size}` : "";

  const buttonClasses = `
    font-semibold py-3 w-full rounded-md
    ${baseClasses}
    ${sizeClass}
    ${aditionalStyles} /* Coloca las clases adicionales al final */
    ${bgClass} /* Coloca el fondo predeterminado después para garantizar que no interfiera */
  `.trim();

  return (
    <button onClick={func} className={buttonClasses}>
      {text}
    </button>
  );
}

export default Button;
