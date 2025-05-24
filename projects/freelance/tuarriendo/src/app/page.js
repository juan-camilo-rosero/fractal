"use client";

import Header from "@/components/layout/header/Header";
import Search from "@/components/landing/Search";
import Map from "@/components/landing/CityMap";
import CityCard from "@/components/landing/CityCard";
import StepCard from "@/components/landing/StepCard";
import FAQ from "@/components/landing/FAQ";
import InfoCard from "@/components/landing/InfoCard";
import PropertyInfo from "@/components/landing/PropertyInfo";
import Footer from "@/components/layout/footer/Footer";
import { useContext, useState } from "react";
import { MapContext } from "@/context/MapContext";
import {
  PiLockDuotone,
  PiShieldCheckDuotone,
  PiHeadsetDuotone,
  PiHouseDuotone,
  PiPhoneCallDuotone,
  PiCreditCardDuotone,
  PiSignatureDuotone,
  PiUserCirclePlusDuotone,
  PiClipboardTextDuotone,
  PiEyeDuotone,
  PiUsersDuotone,
} from "react-icons/pi";

const cities = [
  {
    name: "Bogotá",
    img: "https://blog.urbansa.co/hs-fs/hubfs/Centro%20de%20la%20ciudad%20-%20El%20centro%20de%20Bogot%C3%A1-Bogot%C3%A1%20de%20noche.jpg?width=553&name=Centro%20de%20la%20ciudad%20-%20El%20centro%20de%20Bogot%C3%A1-Bogot%C3%A1%20de%20noche.jpg",
    lat: 4.711,
    lng: -74.0721,
    color: 0,
  },
  {
    name: "Ibagué",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69Gt3_Kq4UKdkk2AIYgBoLw5xUQFafBT98Q&s",
    lat: 4.4389,
    lng: -75.2322,
    color: 1,
  },
  {
    name: "Manizales",
    img: "https://site.caldas.gov.co/images/municipios/imgportada/manizales.jpg",
    lat: 5.0703,
    lng: -75.5138,
    color: 0,
  },
  {
    name: "Pereira",
    img: "https://gerenciar.com.co/Archivos/Articulos/00000799-pereira-la-mejor-ciudad-para-vivir-en-colombia.jpg",
    lat: 4.8087,
    lng: -75.6906,
    color: 1,
  },
  {
    name: "Armenia",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Armenia%2C_Quindio%2C_Colombia_-_panoramio_-_Jimmy_G%C3%B3mez_N_%2815%29.jpg/800px-Armenia%2C_Quindio%2C_Colombia_-_panoramio_-_Jimmy_G%C3%B3mez_N_%2815%29.jpg",
    lat: 4.5339,
    lng: -75.6811,
    color: 0,
  },
];

const tenantSteps = [
  {
    index: 1,
    title: "Encuentra el mejor inmueble",
    content:
      "Con nuestro buscador será más sencillo encontrar tu vivienda. ¡Usa nuestro mapa!",
    color: 1,
    icon: PiHouseDuotone,
  },
  {
    index: 2,
    title: "Contacta a nuestro equipo",
    content:
      "Diligencia tu información y te contactaremos de inmediato ¡Así de rápido!",
    color: 0,
    icon: PiPhoneCallDuotone,
  },
  {
    index: 3,
    title: "Sepáralo",
    content:
      "¡Separa tu inmueble con tan solo un click, para que solo tú tengas acceso a él!",
    color: 1,
    icon: PiLockDuotone,
  },
  {
    index: 4,
    title: "Realiza el primer pago",
    content: "¡Pago realizado, contrato de arrendamiento generado!",
    color: 0,
    icon: PiCreditCardDuotone,
  },
  {
    index: 5,
    title: "Firma el contrato",
    content:
      "¡Firma tu contrato de forma digital, recibe tus llaves y disfruta de tu nuevo espacio!",
    color: 1,
    icon: PiSignatureDuotone,
  },
];

const ownerSteps = [
  {
    index: 1,
    title: "Crea una cuenta",
    content:
      "Ingresa a “Tu cuenta”, diligencia tus datos y continúa el proceso.",
    color: 0,
    icon: PiUserCirclePlusDuotone,
  },
  {
    index: 2,
    title: "Registra tu inmueble",
    content:
      "Ingresa la información del inmueble que vas a rentar y espera la aprobación",
    color: 1,
    icon: PiClipboardTextDuotone,
  },
  {
    index: 3,
    title: "Visualiza tu inmueble en nuestro portal.",
    content: " ",
    color: 0,
    icon: PiEyeDuotone,
  },
  {
    index: 4,
    title: "Conoce a tu arrendatario.",
    content: " ",
    color: 1,
    icon: PiUsersDuotone,
  },
  {
    index: 5,
    title: "¡Firma tu contrato!",
    content:
      "Firma tu contrato de arrendamiento en línea, de forma fácil y segura.",
    color: 0,
    icon: PiSignatureDuotone,
  },
];

const questions = [
  {
    question: "¿Qué necesito para arrendar mi inmueble?",
    answer:
      "Tu documento de identidad válido en territorio colombiano, que demuestre tu mayoría de edad. Con este documento accederás al estudio de arrendamiento y, posteriormente, a la firma del contrato y a la entrega del inmueble.",
  },
  {
    question: "¿Cómo puedo arrendar un inmueble?",
    answer:
      "Busca el inmueble de tu elección. Visítalo de forma virtual o presencial, sepáralo, realiza el estudio de arrendamiento, firma el contrato y recibe tu inmueble. Lo puedes hacer todo de forma digital a través de nuestra plataforma y por WhatsApp.",
  },
  {
    question: "¿Cómo me garantizan la seguridad?",
    answer:
      "Validamos tu identidad y tus antecedentes para garantizar transparencia en el proceso de principio a fin.",
  },
  {
    question: "¿Cómo puedo hacer mis pagos?",
    answer:
      "A través de nuestra pasarela de pagos, desde nuestra plataforma o desde tu WhatsApp.",
  },
  {
    question: "¿Puedo arrendar más de un inmueble a la vez?",
    answer:
      "¡Claro! Siempre y cuando cumplas con nuestras políticas de arrendamiento.",
  },
  {
    question: "¿Puedo arrendar mi apto con mis roomies?",
    answer:
      "¡Sin problema! Deben elegir quiénes serán los responsables del contrato.",
  },
  {
    question: "¿Necesito aval para rentar el inmueble?",
    answer:
      "Sabemos que conseguir un aval no es tarea fácil. Queremos simplificar tu proceso y por eso analizamos tu perfil crediticio. En caso de que este sea negativo, buscaremos la manera de constituir una garantía para que el propietario y tú estén respaldados.",
  },
];

export default function Home() {
  const { showMap } = useContext(MapContext);
  const [selectedSteps, setSelectedSteps] = useState(tenantSteps);
  const [selectedOption, setSelectedOption] = useState("ser_arrendatario");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "ser_arrendatario") {
      setSelectedSteps(tenantSteps);
    } else if (option === "rentar") {
      setSelectedSteps(ownerSteps);
    }
  };

  return (
    <>
      <Header />
      <main className="pb-20">
        <PropertyInfo />
        <section
          id="buscar-inmueble"
          className={`flex flex-col lg:flex-row lg:pt-0 px-8 md:px-12 lg:px-16 lg:pr-0 ${
            showMap ? "pt-24" : "pt-12"
          }`}
        >
          <div className="lg:w-1/2 flex flex-col items-center md:items-start md:justify-center">
            <div className="flex flex-col items-center w-full lg:items-start">
              <h1
                className={`text-primary-500 pt-20 text-4xl font-bold text-center md:text-left mb-6 lg:pt-0 lg:text-5xl lg:font-semibold lg:w-4/5 lg:pb-4 ${
                  showMap ? "hidden" : "block"
                }`}
              >
                Encuentra el{" "}
                <span className="text-secondary-500">inmueble ideal</span> para
                ti
              </h1>
              <Search />
            </div>
          </div>
          <div className="lg:w-1/2 md:w-2/3 h-[50vh] lg:h-screen mt-0 flex md:mx-auto">
            <Map />
          </div>
        </section>
        <section
          className="lg:flex lg:justify-between lg:px-16 mt-16"
          id="porque-nosotros"
        >
          <div className="hidden lg:block w-full lg:mr-8 h-auto rounded-2xl max-w-[30rem]">
            <img
              src="/static/agente_inmobiliario.png"
              alt="Agente inmobiliario"
              className="w-full h-auto rounded-2xl"
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-primary-500 font-semibold text-3xl text-center px-8 mb-4 lg:ml-0 lg:text-4xl lg:text-left lg:px-0 lg:mb-10">
              ¿Por qué arrendar con nosotros?
            </h2>
            <div className="px-8 md:px-12 lg:px-0">
              <InfoCard
                title="¡Hazlo seguro!"
                content="Tuarriendo garantiza que no serás víctima de fraude, evaluando tu perfil, como arrendador o arrendatario, a través de nuestros canales de verificación de identidad y antecedentes."
                icon={<PiLockDuotone />}
              />
              <InfoCard
                title="¡Hazlo fácil y rápido!"
                content="De lo complicado nos encargamos nosotros, tú solo te centras en elegir el inmueble ideal para ti y los tuyos.
                Nuestro equipo ampliamente experto en procesos de arrendamiento te acompaña de principio a fin, para que vivas la practicidad del proceso de alquiler."
                icon={<PiShieldCheckDuotone />}
              />
              <InfoCard
                title="Servicio al cliente"
                content="Tuarriendo te brindará soluciones efectivas, atención constante y un servicio que superará tus expectativas."
                icon={<PiHeadsetDuotone />}
              />
            </div>
          </div>
        </section>

        <section
          className="pt-6 pb-10 md:py-16 lg:py-20 items-start w-full"
          id="buscar-por-ciudad"
        >
          <h2 className="text-primary-500 font-semibold text-3xl text-center px-8 mb-8 lg:ml-16 lg:text-4xl lg:text-left lg:px-0 lg:mb-10 pt-10 pb-6">
            Busca inmuebles por ciudad
          </h2>
          <div className="flex flex-row items-stretch w-full px-8 md:px-12 lg:px-16 gap-4 pb-4 overflow-x-auto lg:overflow-visible">
            {cities.map((city, index) => (
              <CityCard
                key={index}
                img={city.img}
                name={city.name}
                color={city.color}
                lat={city.lat}
                lng={city.lng}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20" id="como-funciona">
          <h2 className="text-primary-500 font-semibold text-3xl text-center px-8 mb-8 lg:ml-16 lg:text-4xl lg:text-left lg:px-0 lg:mb-10">
            ¡Consigue tu hogar en solo cinco pasos!
          </h2>

          <div className="px-[7.5vw] lg:px-[5vw] md:pr-0">
            <div className="w-full p-4 md:px-0 bg-third-300 md:bg-transparent md:w-auto flex flex-col gap-2 md:gap-4 md:flex-row rounded-xl overflow-hidden">
              <button
                className={`px-6 py-3 text-lg md:text-xl font-medium transition-colors rounded-lg ${
                  selectedOption === "ser_arrendatario"
                    ? "bg-third-200 text-primary-700 md:bg-third-300"
                    : "bg-third-300 text-gray-600 hover:bg-third-200/25 md:hover:bg-third-300/50 cursor-pointer md:bg-third-200"
                }`}
                onClick={() => handleOptionChange("ser_arrendatario")}
              >
                Quiero arrendar
              </button>
              <button
                className={`px-6 py-3 text-lg md:text-xl font-medium transition-colors rounded-lg ${
                  selectedOption === "rentar"
                    ? "bg-third-200 text-primary-700 md:bg-third-300"
                    : "bg-third-300 text-gray-600 hover:bg-third-200/25 md:hover:bg-third-300/50 cursor-pointer md:bg-third-200"
                }`}
                onClick={() => handleOptionChange("rentar")}
              >
                Quiero poner en arriendo
              </button>
            </div>
          </div>

          {selectedSteps.length === 4 ? (
            <div className="md:grid flex gap-8 md:grid-cols-2 px-8 md:px-12 lg:px-16 py-12 overflow-x-auto">
              {selectedSteps.map((step, index) => (
                <StepCard
                  key={index}
                  index={step.index}
                  title={step.title}
                  content={step.content}
                  color={step.color}
                  icon={step.icon}
                />
              ))}
            </div>
          ) : (
            <div className="md:grid md:grid-cols-3 gap-8 px-8 flex md:px-12 lg:px-16 py-12 overflow-x-auto">
              {selectedSteps.map((step, index) => (
                <StepCard
                  key={index}
                  index={step.index}
                  title={step.title}
                  content={step.content}
                  color={step.color}
                  icon={step.icon}
                />
              ))}
            </div>
          )}
        </section>
        <section
          className="w-full py-12 md:py-16 lg:py-20"
          id="preguntas-frecuentes"
        >
          <h2 className="text-primary-500 font-semibold text-3xl text-center px-8 mb-8 lg:ml-16 lg:text-4xl lg:text-left lg:px-0 lg:mb-10">
            Preguntas frecuentes
          </h2>
          <div className="md:px-12 lg:px-16">
            <FAQ questions={questions} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
