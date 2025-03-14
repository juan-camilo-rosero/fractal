"use client";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="w-screen min-h-screen pt-30 padding bg-cda-gray-300 pb-12 flex flex-col items-center justify-center lg:gap-28 lg:flex-row-reverse">
      <img
        src="/assets/landing_image.jpg"
        alt="Foto CDA Motos de la Sexta"
        className="w-full rounded-lg lg:h-[70vh] lg:object-cover lg:w-[40vw]"
      />
      <div className="w-full flex items-center flex-col">
        <h1 className="text-center mt-8 text-3xl font-semibold lg:text-4xl lg:text-left">
          SOAT y Revisión técnico mecánica y de gases para{" "}
          <span className="text-cda-blue-700">motocicletas</span> en Ibagué
        </h1>
        <h2 className="mt-6 text-black/50 text-center text-base md:text-lg lg:text-xl lg:text-left">
          Contamos con 10 años de experiencia en revisión técnico mecánica, de
          emisión de gases y venta de SOAT en la ciudad de Ibagué, Tolima
        </h2>
        <div className="w-full flex flex-col gap-4 mt-8 md:w-2/3 lg:flex-row lg:w-full">
          <Link
            href="/"
            className="button bg-cda-green-500 font-semibold text-xl"
          >
            Cotizar ahora
          </Link>
          <Link href="/" className="button bg-black/5 font-semibold text-xl">
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
