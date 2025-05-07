'use client'

import { useContext } from 'react';
import { SectionContext } from '@/context/SectionContext';
import Button from '../general/Button'
import InfiniteScroller from './InfiniteScroller'

function HeroSection() {

  const { setSignUpOpen, setLoginOpen } = useContext(SectionContext);
  return (
    <section className="w-screen min-h-screen pt-20 px-8 flex flex-col items-center justify-center md:w-2/3 md:mx-auto lg:pt-32">
        <h1 className="text-center text-3xl font-bold text-fblue-700  lg:text-5xl">Preparación universitaria con un plan de estudio creado <span className="text-fred-700">especialmente para ti</span></h1>
        <h2 className="text-fgray-600 text-center mt-10 font-semibold md:text-xl">Creamos la ruta de aprendizaje para que puedas ingresar a la universidad de tus sueños.</h2>
        <div className='w-full mt-8 flex flex-col items-center gap-6 md:mt-20 lg:flex-row lg:gap-12 lg:justify-center lg:mt-12'>
            <Button text="Crea tu cuenta" type="primary" size="xl" func={e => setSignUpOpen(true)
            } aditionalStyles='w-full lg:w-auto lg:text-xl lg:px-16'/>
            <Button text="Inicia sesión" type="secondary" size="xl" func={e => setLoginOpen(true)
            } aditionalStyles='w-full lg:w-auto lg:text-xl lg:px-16'/>
        </div>
        <div className='w-screen mt-20 flex flex-col items-center gap-6'>
          <InfiniteScroller words={["análisis literario", "microeconomía", "biología celular", "historia del arte", "fotosíntesis", "civilizaciones antiguas", "cálculo", "cambio climático", "mecánica clásica", "historia mundial", "anatomía humana", "filosofía"]}/>
          <InfiniteScroller words={["probabilidad", "genética", "globalización", "tabla periódica", "verbos compuestos", "derechos humanos", "revolución industrial", "trigonometría", "tipos de párrafos", "guerra fría", "termodinámica"]} direction='right'/>
        </div>
    </section>
  )
}

export default HeroSection