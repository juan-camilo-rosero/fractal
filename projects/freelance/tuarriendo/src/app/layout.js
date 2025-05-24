import "./globals.css";
import { UserContextProvider } from "../context/UserContext";
import { MapContextProvider } from "../context/MapContext";
import { SectionContextProvider } from "@/context/SectionContext";
import { PropertyContextProvider } from "@/context/PropertyContext";

import { Comfortaa } from 'next/font/google'

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "TuArriendo - encuentra el mejor inmueble para ti",
  description:
    "¿Buscas un nuevo hogar?, en TuArriendo te ayudamos a conseguir el mejor inmueble para ti y tu familia, todo de forma fácil, rápida y segura",
  keywords:
    "inmuebles, arriendo, renta, alquiler, hogar, vivienda, TuArriendo, encontrar casa, buscar inmuebles, inmueble ideal",

  openGraph: {
    title: "TuArriendo - encuentra el mejor inmueble para ti",
    description:
      "¿Buscas un nuevo hogar?, en TuArriendo te ayudamos a conseguir el mejor inmueble para ti y tu familia, todo de forma fácil, rápida y segura",
    url: "https://tuarriendo.vercel.app",
    site_name: "TuArriendo",
    images: [
      {
        url: "https://tusitio.com/home_search",
        width: 800,
        height: 600,
        alt: "TuArriendo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TuArriendo - encuentra el mejor inmueble para ti",
    description:
      "¿Buscas un nuevo hogar?, en TuArriendo te ayudamos a conseguir el mejor inmueble para ti y tu familia, todo de forma fácil, rápida y segura",
    image: "https://tusitio.com/home_search.jpg",
    site: "@tuarriendo.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height}
        />
        <meta property="og:type" content={metadata.openGraph.type} />

        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />
        <meta name="twitter:site" content={metadata.twitter.site} />
      </head>
      <body className={`bg-third-200 ${comfortaa.className}`}>
        <UserContextProvider>
          <SectionContextProvider>
            <PropertyContextProvider>
              <MapContextProvider>
                
                {children}
              </MapContextProvider>
            </PropertyContextProvider>
          </SectionContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
