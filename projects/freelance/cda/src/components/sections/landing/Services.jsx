'use client'

import Link from "next/link";
import Service from './Service'

const SERVICES = [
    {
        title: "Revisión técnico mecánica y de gases",
        content: "Contamos con pruebas de Inspección general, de frenos, gases, luz y sonido",
        url: "/revision-tecnico-mecanica",
        img: "assets/motorcycle.png",
        alt: "moto",
    },
    {
        title: "Venta de SOAT",
        content: "Saca el SOAT para tu moto desde $163,050 o para tu vehículo desde $300,150",
        url: "/soat",
        img: "assets/soat.png",
        alt: "logo SOAT",
    },
    {
        title: "Financiamiento",
        content: "¿No te alcanza el dinero para la revisión? Tranquilo, con Finaval puedes financiar el costo a varias cuotas",
        url: "/financiamiento",
        img: "assets/financing.png",
        alt: "imagen financiamiento",
    },
]

function Services() {
  return (
    <section className='padding w-screen py-12 min-h-screen'>
        <h3 className='section-title'>Nuestros servicios</h3>
        <div className="flex flex-col items-center w-full gap-16 mt-12 md:flex-row md:flex-wrap md:gap-0 md:justify-between md:gap-y-12 lg:flex-nowrap lg:gap-12 lg:items-end">
            {SERVICES.map((service, i) => 
                <Service title={service.title} content={service.content} url={service.url} img={service.img} key = {i} alt={service.alt}/>
            )}
        </div>
    </section>
  )
}

export default Services