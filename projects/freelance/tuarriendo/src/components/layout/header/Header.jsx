"use client";

import { RiMenu3Fill, RiCloseLargeLine } from "react-icons/ri";
import Link from "next/link";
import { React, useState, useEffect } from "react";
import AnimatedLink from "../../ui/AnimatedLink";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevenir scroll del body cuando el menú esté abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup cuando se desmonte el componente
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    (pathname !== "/panel") && <header
      className={`fixed px-8 h-16 flex flex-row items-center justify-between w-screen md:px-12 lg:px-16 z-40 
        ${!isScrolled ? "lg:bg-transparent lg:shadow-none lg:pointer-events-none" : "bg-third-200 shadow-lg"}`}
    >
      <nav className="flex justify-between items-center py-8 lg:py-4 w-full">
        <Link
          href="/"
          className="flex flex-row gap-3 items-center cursor-pointer group pointer-events-auto"
        >
          <img src="/static/logo.png" alt="logo tuarriendo" className="h-8" />
        </Link>
        <RiMenu3Fill
          onClick={toggleMenu}
          className="text-primary-500 text-3xl cursor-pointer transition-all md:hidden"
        />

        <Link
          href="/login"
          className="text-secondary-600 font-medium text-lg hidden md:flex group"
        >
          <AnimatedLink title="Tu cuenta" aditionalClasses="font-semibold bg-primary-500 py-2 px-8 rounded-md text-third-200 pointer-events-auto"/>
        </Link>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-third-200 text-primary-400 overflow-y-auto"
          >
            <div className="min-h-full flex flex-col px-8 pt-4">
              <div className="flex justify-between mb-6">
                <h3 className="text-3xl text-primary-500 font-medium transition-all">
                  Menú
                </h3>
                <RiCloseLargeLine
                  className="cursor-pointer text-3xl text-primary-500"
                  onClick={toggleMenu}
                />
              </div>
              <motion.div
                initial="initial"
                animate="open"
                className="flex flex-col flex-1 justify-start font-lora items-center gap-4 pb-8"
              >
                <div className="w-full">
                  <div className="w-full border-y-2 py-4 border-gray-300">
                    <h3 className="text-2xl font-semibold text-primary-700">
                      ¿En qué podemos ayudarte?
                    </h3>
                  </div>
                  <div className="py-4">
                    <MobileNavLink
                      title="Buscar inmuebles"
                      href="/#buscar-inmueble"
                      toggleMenu={toggleMenu}
                    />
                    <MobileNavLink
                      title="¿Por qué arrendar con nosotros?"
                      href="/#porque-nosotros"
                      toggleMenu={toggleMenu}
                    />
                    <MobileNavLink
                      title="Buscar por ciudad"
                      href="/#buscar-por-ciudad"
                      toggleMenu={toggleMenu}
                    />
                    <MobileNavLink
                      title="¿Cómo funciona TuArriendo?"
                      href="/#como-funciona"
                      toggleMenu={toggleMenu}
                    />
                    <MobileNavLink
                      title="Preguntas frecuentes"
                      href="/#preguntas-frecuentes"
                      toggleMenu={toggleMenu}
                    />
                    <MobileNavLink
                      title="Contacto"
                      href="#"
                      toggleMenu={toggleMenu}
                    />
                  </div>
                  <div className="mt-6">
                    <button 
                      className="w-full py-3 bg-secondary-500 transition-all hover:bg-secondary-700 rounded-lg text-third-200 font-semibold text-2xl text-center" 
                      onClick={() => {
                        router.push("/login");
                        toggleMenu();
                      }} 
                    >
                      Tu cuenta
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const MobileNavLink = ({ title, href, toggleMenu }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-lg text-gray-500 uppercase text-primary-400 py-3"
    >
      <Link href={href} onClick={toggleMenu}>
        {title}
      </Link>
    </motion.div>
  );
};

export default Header;