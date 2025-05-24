"use client";
import React from "react";
import Link from "next/link";
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";

function Footer() {
  return (
    <footer className="w-full pt-6 bg-third-300 flex flex-col items-center md:items-start lg:pt-8 lg:items-start">
      <div className="w-full flex flex-col md:flex-row md:gap-20 px-8 md:px-12 lg:px-16">
        <div className="mt-8">
          <img src="/static/logo.png" alt="Logo TuArriendo" className="w-full px-8 md:px-0 md:w-auto md:h-12" />
          <p className="text-2xl md:text-xl lg:text-2xl text-black mt-8 text-center md:text-left font-bold md:max-w-72 lg:max-w-100">
            Encontramos tu arriendo perfecto al mejor precio
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-8 md:mt-0 lg:ml-auto lg:gap-20">
          <div className="w-full mt-12 md:mt-0 lg:col-span-2 flex flex-col items-center md:items-start py-4">
            <h3 className="text-primary-700 font-bold text-2xl">Plataforma</h3>
            <div className="flex flex-col gap-6 md:gap-4 mt-4 md:mt-6 text-center md:text-left lg:text-left">
              <Link href="/" className="text-base transition hover:text-primary-700">
                Inicio
              </Link>
              <Link href="/login" className="text-base transition hover:text-primary-700">
                Iniciar Sesión
              </Link>
              <Link href="/nosotros" className="text-base transition hover:text-primary-700">
                Nosotros
              </Link>
              <Link href="/trabajo" className="text-base transition hover:text-primary-700">
                Trabaja con nosotros
              </Link>
            </div>
          </div>
          <div className="w-full mt-6 md:mt-0 lg:col-span-2 flex flex-col items-center md:items-start py-4">
            <h3 className="text-primary-700 font-bold text-2xl">Legal</h3>
            <div className="flex flex-col gap-6 md:gap-4 mt-4 md:mt-6 text-center md:text-left lg:text-left">
              <Link href="/terminos-y-condiciones" className="text-base transition hover:text-primary-700">
                Términos y condiciones
              </Link>
              <Link href="/politica-de-privacidad" className="text-base transition hover:text-primary-700">
                Política de privacidad
              </Link>
              <Link href="/#preguntas-frecuentes" className="text-base transition hover:text-primary-700">
                Preguntas Frecuentes
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen bg-primary-500 py-3 mt-10 md:mt-4 px-8 md:px-12 lg:px-16">
        <p className="text-xs text-third-200 text-center md:text-left">© 2025 TuArriendo | Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;
