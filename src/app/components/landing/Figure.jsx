'use client'

function Figure({route, alt, title, desc}) {
  return (
    <figure className='w-full rounded-md bg-fgray-100 border-fgray-400 border-[2px] p-8'>
        <h4 className='text-center font-semibold text-fblue-700 text-xl'>{title}</h4>
        <p className='text-sm mt-3 text-fgray-800 w-full text-center'>{desc}</p>
        <img src={route} alt={alt} className='w-2/3 block mx-auto mt-10'/>
    </figure>
  )
}

export default Figure