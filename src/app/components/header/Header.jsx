"use client";

import Image from "next/image";
import { RiMenu3Fill } from "react-icons/ri";

function Header() {
  return (
    <header className="bg-fgray-200 w-screen px-8 py-4 fixed header-shadow flex flex-row  items-center justify-between">
      <Image
        src="/logo/icon.png"
        width={50}
        height={50}
        priority
        className="w-8 h-8"
        alt="Picture of the author"
      />
      <button>
        <RiMenu3Fill className="text-fred-700 text-3xl"/>
      </button>
    </header>
  );
}

export default Header;
