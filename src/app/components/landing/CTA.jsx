'use client'

import Button from '../general/Button'
function CTA() {
  return (
    <section className="px-8 pb-20 md:px-16">
        <div className="bg-fred-700 rounded-xl min-h-20 p-8 text-fgray-200 md:px-16">
            <h3 className="text-center font-semibold text-2xl md:text-3xl">Do you want to use fractal with your students?</h3>
            <p className="mt-6 text-center text-sm md:text-lg">No two students are the same, so why should their curriculum be?. Improve your students' level and drive their progress with a platform that adapts to their needs.</p>
            <div className='mt-12 flex items-center w-full justify-center'>
                <Button text="Book a demo" func={e => console.log("Presionaste el CTA")} aditionalStyles="border-fgray-200 text-fgray-200"/>
            </div>
        </div>
    </section>
  )
}

export default CTA