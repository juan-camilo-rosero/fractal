"use client";

function Button({ text, func, type, size, aditionalStyles = "", disabled = false}) {
  const baseClasses =
    type === "primary"
      ? "text-fgray-200"
      : "text-fblue-700 border-2 border-fblue-700";

  const bgClass = type === "primary" ? "bg-fred-700 hover:bg-fred-900" : "bg-transparent hover:underline";

  const sizeClass = size ? `text-${size}` : "";

  const buttonClasses = `
    font-semibold py-3 md:py-2 px-8 rounded-md outline-none transition-all
    ${baseClasses}
    ${sizeClass}
    ${aditionalStyles} /* Coloca las clases adicionales al final */
    ${bgClass} /* Coloca el fondo predeterminado después para garantizar que no interfiera */
  `.trim();

  return (
    <button onClick={func} className={buttonClasses} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
