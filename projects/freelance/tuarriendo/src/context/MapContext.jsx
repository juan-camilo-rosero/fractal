// Ejemplo de cómo actualizar tu MapContext para incluir filtros

"use client";
import { createContext, useState } from "react";

export const MapContext = createContext();

export function MapContextProvider(props) {
  const [showMap, setShowMap] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [location, setLocation] = useState(null);
  const [mapZoom, setMapZoom] = useState(15);
  const [price, setPrice] = useState(0);
  const [propertyId, setPropertyId] = useState("");
  const [propertyInfo, setPropertyInfo] = useState({
    age: 0,
    amenities: [],
    bathrooms: 0,
    city: "",
    hasPermission: true,
    marker: {
      lat: 0,
      long: 0,
    },
    neighborhood: "",
    owner: undefined,
    price: 0,
    rooms: 0,
    squareMeters: 0,
    strata: 1,
    type: undefined,
    visible: true,
    images: ["/placeholder_image.webp"]
  });

  // Nuevo estado para filtros
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    propertyType: null,
  });

  return (
    <MapContext.Provider
      value={{
        showMap,
        setShowMap,
        location,
        setLocation,
        mapZoom,
        setMapZoom,
        showInfo,
        setShowInfo,
        price,
        setPrice,
        propertyInfo,
        setPropertyInfo,
        propertyId,
        setPropertyId,
        filters,
        setFilters,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
}