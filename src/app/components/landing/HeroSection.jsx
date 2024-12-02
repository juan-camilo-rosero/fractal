'use client'

import Button from '../general/Button'

function HeroSection() {
  return (
    <section className="w-screen min-h-screen pt-20 px-8 flex flex-col items-center justify-center md:w-2/3 md:mx-auto">
        <h1 className="text-center text-[1.75rem] font-bold text-fblue-700 md:text-3xl">University preparation with a <span className="text-fred-700">tailor-made</span> study plan for you</h1>
        <h2 className="text-fgray-600 text-center mt-10 font-semibold md:text-xl">A unique study path, created to improve your key areas and maximize your chances of getting into the university of your dreams.</h2>
        <div className='w-full mt-8 flex flex-col items-center gap-6 md:mt-20'>
            <Button text="Sign up" type="primary" size="xl" func={e => console.log("Hola, presionaste el botón")
            } aditionalStyles='w-full'/>
            <Button text="Login" type="secondary" size="xl" func={e => console.log("Hola, presionaste otro botón")
            } aditionalStyles='w-full'/>
        </div>
        <div className='bg-fgray-400 w-screen h-[20vh] mt-20'></div>
    </section>
  )
}

export default HeroSection