"use client";
import React, { useContext, useState, useEffect } from "react";
import { Map, APIProvider } from "@vis.gl/react-google-maps";
import { MapContext } from "../../context/MapContext";
import CustomMarker from "./CustomMarker";
import { getPropertiesMarkers } from "@/lib/db_functions";

const initialCenter = {
  lat: 4.65,
  lng: -74.06,
};

// Helper function para filtrar propiedades
const filterProperties = (properties, filters) => {
  if (!properties || properties.length === 0) return [];
  
  return properties.filter(property => {
    // Filtro por precio mínimo
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    
    // Filtro por precio máximo
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }
    
    // Filtro por tipo de propiedad
    if (filters.propertyType && property.type !== filters.propertyType) {
      return false;
    }
    
    return true;
  });
};

function CityMap() {
  const mapRef = React.useRef(null);
  const { showMap, location, mapZoom, setMapZoom, filters } = useContext(MapContext);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [allMarkers, setAllMarkers] = useState([]); // Todos los markers sin filtrar
  const [filteredMarkers, setFilteredMarkers] = useState([]); // Markers después de aplicar filtros

  useEffect(() => {
    if (location) {
      setMapCenter(location);
      setMapZoom(15);
      setTimeout(() => {
        setMapCenter(undefined);
        setMapZoom(undefined);
      }, 500);
      if (mapRef.current) {
        mapRef.current.panTo(location);
      }
    }
  }, [location]);

  // Cargar todos los markers inicialmente
  useEffect(() => {
    const getMarkers = async () => {
      const markersData = await getPropertiesMarkers();
      setAllMarkers(markersData);
    };
    console.clear();
    getMarkers();
  }, []);

  // Aplicar filtros cada vez que cambien los filtros o los markers
  useEffect(() => {
    const filtered = filterProperties(allMarkers, filters);
    setFilteredMarkers(filtered);
    console.log("Filtros aplicados:", filters);
    console.log("Propiedades filtradas:", filtered.length, "de", allMarkers.length);
  }, [allMarkers, filters]);
 
  return (
    <APIProvider
      className="w-full h-full mt-10 lg:mt-0 flex rounded-lg justify-center items-center"
      apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
    >
      {showMap ? (
        <Map
          id="map"
          defaultCenter={mapCenter}
          defaultZoom={mapZoom}
          center={mapCenter}
          zoom={mapZoom}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          scrollwheel={true}
          gestureHandling="auto"
          onLoad={(map) => {
            mapRef.current = map;
            map.panTo(mapCenter);
          }}
          onZoomChanged={() => {
            if (mapRef.current) {
              setMapZoom(mapRef.current.getZoom());
            }
          }}
        >
          {/* Usar filteredMarkers invece de markers */}
          {filteredMarkers.map((point, index) => (
            <CustomMarker point={point} index={index} key={point.id || index}/>
          ))}
        </Map>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/static/landing.png"
            alt="Imagen de bienvenida"
            className="max-w-full max-h-full object-cover"
          />
        </div>
      )}
    </APIProvider>
  );
}

export default CityMap;