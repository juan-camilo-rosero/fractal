'use client'

import { useContext } from 'react';
import { SectionContext } from '@/context/SectionContext';
import Button from '../general/Button'

function HeroSection() {

  const { setSignUpOpen, setLoginOpen } = useContext(SectionContext);
  return (
    <section className="w-screen min-h-screen pt-20 px-8 flex flex-col items-center justify-center md:w-2/3 md:mx-auto lg:pt-32">
        <h1 className="text-center text-[1.75rem] font-bold text-fblue-700 md:text-3xl lg:text-5xl">University preparation with a <span className="text-fred-700">tailor-made</span> study plan for you</h1>
        <h2 className="text-fgray-600 text-center mt-10 font-semibold md:text-xl">A unique study path, created to improve your key areas and maximize your chances of getting into the university of your dreams.</h2>
        <div className='w-full mt-8 flex flex-col items-center gap-6 md:mt-20 lg:flex-row lg:gap-12 lg:justify-center lg:mt-12'>
            <Button text="Sign up" type="primary" size="xl" func={e => setSignUpOpen(true)
            } aditionalStyles='w-full lg:w-auto lg:text-xl lg:px-16'/>
            <Button text="Login" type="secondary" size="xl" func={e => setLoginOpen(true)
            } aditionalStyles='w-full lg:w-auto lg:text-xl lg:px-16'/>
        </div>
        <div className='bg-fgray-400 w-screen h-[20vh] mt-20'></div>
    </section>
  )
}

export default HeroSection