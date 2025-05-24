"use client";

import Link from "next/link";

import { PiPlusCircleDuotone, PiMagnifyingGlassDuotone, PiCreditCardDuotone, PiUploadDuotone } from "react-icons/pi";

const SHORTCUTS = [
  {
    icon: <PiPlusCircleDuotone className="text-secondary-700 text-3xl lg:text-2xl" />,
    text: "Crear inmueble",
    link: "/dashboard/inmuebles/crear",
  },
  {
    icon: <PiMagnifyingGlassDuotone className="text-primary-500 text-3xl lg:text-2xl" />,
    text: "Ver inmuebles",
    link: "/dashboard/inmuebles",
  },
  {
    icon: <PiUploadDuotone className="text-secondary-700 text-3xl lg:text-2xl" />,
    text: "Mis documentos",
    link: "/dashboard/documentos",
  },
  {
    icon: <PiCreditCardDuotone className="text-primary-700 text-3xl lg:text-2xl" />,
    text: "Mis pagos",
    link: "/dashboard/pagos",
  },
];

function ShortCuts() {
  return (
    <div>
      <h2 className="dashboard-title">Atajos</h2>
      <div className="flex flex-col gap-4 items-center md:items-start w-full md:flex-row mt-8">
        {SHORTCUTS.map((shortcut, index) => (
          <Link key={index} href={shortcut.link} className="shortcut-btn">
            {shortcut.icon}
            <span className="text-lg lg:text-sm font-semibold">{shortcut.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ShortCuts;
