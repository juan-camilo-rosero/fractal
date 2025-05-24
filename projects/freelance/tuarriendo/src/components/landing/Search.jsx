"use client";
import React, { useContext, useState } from "react";
import GooglePlacesAutocomplete from "react-google-autocomplete";
import { useJsApiLoader } from "@react-google-maps/api";
import { MapContext } from "../../context/MapContext";
import Filter from "./Filter";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link"; // Corregido: 'next/link' en lugar de 'next/navigation'

function Search() {
  const { setShowMap, setLocation, showMap } = useContext(MapContext);
  const [mapLat, setMapLat] = useState(undefined);
  const [mapLng, setMapLng] = useState(undefined);
  
  const handlePlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setMapLat(lat);
    setMapLng(lng);
    setLocation({ lat, lng }); // Aquí se pasa el nuevo valor directamente
  };
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: ["places"],
  });
  
  if (loadError) return <div>Error al cargar la API de Google Maps</div>;
  
  const handleSearch = () => {
    if (mapLat !== undefined && mapLng !== undefined) {
      setShowMap(true);
      setLocation({ lat: mapLat, lng: mapLng });
    } else {
      alert("Por favor, selecciona una ubicación válida.");
    }
  };
  
  // Componente de Skeleton que simula la apariencia del buscador mientras carga
  if (!isLoaded) {
    return (
      <div className="relative w-full mt-6 md:w-2/3">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 md:text-lg font-semibold w-full flex items-center justify-center">
          <Skeleton className="h-6 w-64 bg-third-200" />
        </div>
        <Skeleton className="w-full h-14 md:h-16 rounded-lg border-[2px] border-third-400 bg-third-200" />
        <div className="flex flex-col lg:items-center lg:justify-between mt-6">
          <Skeleton className="w-full h-12 rounded-md bg-secondary-500" />
          {showMap && (
            <section className="w-full lg:py-0 lg:pb-6 rounded-lg justify-center items-center mt-6 lg:mt-0 flex lg:order-1">
              <Skeleton className="w-full h-24 rounded-lg" />
            </section>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-full mt-6 md:w-2/3">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 md:text-lg font-semibold w-full flex items-center justify-center">
        <p className="bg-third-200 px-3">¿Dónde te gustaría vivir?</p>
      </div>
      <GooglePlacesAutocomplete
        placeholder="Busca por barrio, ciudad o zona"
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: ["geocode"],
          componentRestrictions: { country: "CO" },
        }}
        className="w-full py-4 px-4 rounded-lg border-[2px] border-third-400 text-black bg-third-200 font-semibold outline-none md:text-xl md:py-5 text-center focus:border-primary-500 transition-all"
      />
      <div className="flex flex-col lg:items-center lg:justify-between mt-6">
        <button
          onClick={handleSearch}
          className="w-full py-3 rounded-md text-third-200 font-semibold text-lg bg-secondary-500 text-center transition-all hover:bg-secondary-700 lg:order-2 lg:mt-4 cursor-pointer"
        >
          Buscar inmuebles en renta
        </button>
        <Link 
          href="/login"
          className="w-full py-3 rounded-md bg-third-300 font-semibold text-lg text-center transition-all hover:bg-third-400 lg:order-2 mt-4 lg:mt-6 cursor-pointer"
        >
          Publica aquí
        </Link>
        <section
          className={`w-full lg:py-0 lg:pb-6 rounded-lg justify-center items-center mt-6 lg:mt-0 ${
            showMap ? "flex" : "hidden"
          } lg:order-1`}
        >
          <Filter />
        </section>
      </div>
    </div>
  );
}

export default Search;