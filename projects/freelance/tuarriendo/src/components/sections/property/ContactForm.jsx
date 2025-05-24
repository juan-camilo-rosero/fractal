"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com"; // Asegúrate de haber instalado emailjs-com

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function ContactForm() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!name || !tel || !email) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Validación de número de teléfono
    const telRegex = /^[0-9]{10,15}$/; // Asegúrate de ajustar el regex según tus necesidades
    if (!telRegex.test(tel)) {
      setError("Por favor, ingresa un número de teléfono válido.");
      return;
    }

    const currentUrl = window.location.href;
    const message = `Nombre: ${name}\nNúmero de teléfono: ${tel}\nCorreo electrónico: ${email}\nInmueble de interés: ${currentUrl}`;

    const templateParams = {
      message: message, // Ahora incluye el mensaje con la información del usuario
      to_email: "ayamopomohw@gmail.com", // Dirección de destino
    };

    // Envía el correo usando EmailJS
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY,
      )
      .then(
        (response) => {
          alert("Mensaje enviado exitosamente")
          setName("");
          setTel("");
          setEmail("");
          setError("");
        },
        (error) => {
          console.log("FAILED...", error);
          setError("Hubo un error al enviar el correo.");
        }
      );
  };

  return (
    <div className="w-full bg-third-200 py-5 flex items-center justify-center fixed lg:absolute bottom-0 z-10 shadowtop lg:w-[35vw] lg:h-screen lg:bg-transparent lg:!shadow-none lg:top-0 lg:right-0 lg:items-start lg:mt-20 lg:pt-0">
      <div className="lg:hidden">
        <Drawer>
          <DrawerTrigger className="px-8 py-3 bg-secondary-500 font-semibold text-third-200 rounded-lg text-2xl">
            Estoy interesado
          </DrawerTrigger>
          <DrawerContent className="px-8 md:px-12" aria-describedby={undefined}>
            <DrawerHeader>
              <DrawerTitle className="text-2xl text-primary-500 font-semibold text-center md:my-8 md:text-3xl">
                Estoy interesado
              </DrawerTitle>
            </DrawerHeader>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:w-1/2 md:block md:mx-auto"
            >
              <label className="text-lg font-semibold mt-6" htmlFor="nombre">
                Nombre:
              </label>
              <input
                type="text"
                name="nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-medium border-[2px] border-black/50 transition-all focus:border-black rounded-lg py-[7px] px-3 outline-none w-full lg:w-32 mt-2"
              />
              <label className="text-lg font-semibold mt-8" htmlFor="telefono">
                Número de teléfono:
              </label>
              <input
                type="tel"
                name="telefono"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                className="text-lg font-medium border-[2px] border-black/50 transition-all focus:border-black rounded-lg py-[7px] px-3 outline-none w-full lg:w-32 mt-2"
              />
              <label className="text-lg font-semibold mt-8" htmlFor="email">
                Correo electrónico:
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg font-medium border-[2px] border-black/50 transition-all focus:border-black rounded-lg py-[7px] px-3 outline-none w-full lg:w-32 mt-2"
              />
              {error && <p className="text-red-500">{error}</p>}{" "}
              {/* Mostrar errores */}
              <button
                type="submit"
                className="px-8 py-3 mt-8 bg-secondary-500 font-semibold text-third-200 rounded-lg text-2xl w-full"
              >
                Enviar
              </button>
            </form>
            <DrawerFooter className="mt-2 w-full">
              <DrawerClose className="px-8 py-3 font-semibold text-black/50 rounded-lg text-2xl">
                cancelar
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden lg:flex w-4/5 bg-third-300 rounded-xl min-h-[65vh] py-8 max-h-[80vh] overflow-y-auto">
        <form
          action=""
          className="flex flex-col w-full px-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center font-semibold text-2xl text-primary-500">
            Estoy interesado
          </h2>
          <label className="text-base font-semibold mt-6" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-base font-medium border-[1px] border-black/50 bg-third-200 transition-all focus:border-black rounded-lg py-2 px-3 outline-none w-full mt-2"
          />
          <label className="text-base font-semibold mt-4" htmlFor="telefono">
            Número de teléfono:
          </label>
          <input
            type="tel"
            name="telefono"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="text-base font-medium border-[1px] border-black/50 bg-third-200 transition-all focus:border-black rounded-lg py-2 px-3 outline-none w-full mt-2"
          />
          <label className="text-base font-semibold mt-4" htmlFor="email">
            Correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-base font-medium border-[1px] border-black/50 bg-third-200 transition-all focus:border-black rounded-lg py-2 px-3 outline-none w-full mt-2"
          />
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Mostrar errores */}
          <button
            type="submit"
            className="px-8 py-2 hover:bg-secondary-700 transition-all mt-8 bg-secondary-500 font-semibold text-third-200 rounded-lg text-xl w-full"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
