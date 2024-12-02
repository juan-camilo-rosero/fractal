"use client";

import Image from "next/image";
import { RiMenu3Fill } from "react-icons/ri";
import Button from '../general/Button'

function Header() {
  return (
    <header className="bg-fgray-200 w-screen px-8 py-4 fixed header-shadow flex flex-row  items-center justify-between md:px-16">
      <Image
        src="/logo/icon.png"
        width={50}
        height={50}
        priority
        className="w-8 h-8"
        alt="Picture of the author"
      />
      <button className="md:hidden">
        <RiMenu3Fill className="text-fred-700 text-3xl"/>
      </button>
      <div className="hidden md:flex md:flex-row md:gap-8">
        <Button text="Login" type="secondary" func={e => console.log("I'm the login button :3")}/>
        <Button text="Sign up" type="primary" func={e => console.log("I'm the sign up button :3")}/>
      </div>
    </header>
  );
}

export default Header;
