'use client'

import Header from "@/components/layout/header/Header"
import Link from "next/link"

export default function page() {
    return (
        <div>
            <Header />
            <div className="w-screen h-screen flex items-center justify-center flex-col gap-4 md:gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">404 :(</h1>
                <h2 className="text-xl font-semibold text-black/50">La página que estás buscando no existe</h2>
                <Link href="/" className="w-full py-3 rounded-md text-third-200 font-semibold text-lg bg-secondary-500 text-center transition-all hover:bg-secondary-700 lg:order-2 lg:mt-4 cursor-pointer md:w-auto md:px-12 lg:px-20">Volver al inicio</Link>
            </div>
        </div>
    )
}