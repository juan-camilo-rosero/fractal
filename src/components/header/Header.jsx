"use client";

import { SectionContext } from '@/context/SectionContext'
import { RiMenu3Fill } from "react-icons/ri";
import Button from '../general/Button'
import { useContext } from 'react';

function Header() {
  const {setLoginOpen, setSignUpOpen} = useContext(SectionContext)
  const handleOpenSignup = e => setSignUpOpen(true)
  const handleOpenLogin = e => setLoginOpen(true)
  return (
    <header className="bg-fgray-200 w-screen px-8 py-4 fixed header-shadow flex flex-row  items-center justify-between md:px-16 lg:py-3 z-30">
      <img src="/logo/icon.png" alt="Logo fractal" className="h-5 md:h-6"/>
      <button className="md:hidden">
        <RiMenu3Fill className="text-fred-700 text-3xl"/>
      </button>
      <div className="hidden md:flex md:flex-row md:gap-8">
        <Button text="Iniciar sesión" type="secondary" func={handleOpenLogin}/>
        <Button text="Crea tu cuenta" type="primary" func={handleOpenSignup}/>
      </div>
    </header>
  );
}

export default Header;
