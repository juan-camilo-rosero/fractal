"use client";

import React from "react";
import Link from "next/link";

import { FiMenu } from "react-icons/fi";

function Header() {
  return (
    <header className="w-full bg-cda-gray-300 py-4 md:py-3 padding flex justify-between items-center shadow-lg shadow-black/10 fixed top-0">
      <Link href="/" className="flex gap-4 items-center cursor-pointer">
        <img src="logo/logo.webp" alt="logo" className="h-8" />
      </Link>
      <nav className="gap-8 text-black6c hidden md:flex lg:text-lg lg:gap-12">
        <Link href="/servicios" className="link">
          Servicios
        </Link>
        <Link href="/sobre-nosotros" className="link">
          Sobre nosotros
        </Link>
        <Link href="/contacto" className="link">
          Contacto
        </Link>
        <Link href="/contacto" className="link">
          Preguntas frecuentes
        </Link>
      </nav>
      <button className="cursor-pointer md:hidden">
        <FiMenu className="text-3xl text-cda-blue-700" />
      </button>
    </header>
  );
}

export default Header;
