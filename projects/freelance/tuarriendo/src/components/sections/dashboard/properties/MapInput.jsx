"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiMapPinDuotone, PiBuildingsDuotone as PiCityDuotone } from "react-icons/pi";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function MapInput({ 
  cities, 
  city, 
  setCity, 
  address, 
  setAddress, 
  markerPosition, 
  setMarkerPosition 
}) {
  const [showMap, setShowMap] = useState(false);
  const [center, setCenter] = useState(undefined);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 4.60971,
    lng: -74.08175,
  });
  const [autocompleteLoaded, setAutocompleteLoaded] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    setShowMap(true);

    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setAutocompleteLoaded(true);
      };
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      setAutocompleteLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (autocompleteLoaded && !autocomplete) {
      const addressInput = document.getElementById("location");
      if (addressInput) {
        const newAutocomplete = new window.google.maps.places.Autocomplete(
          addressInput,
          {
            types: ["address"],
            componentRestrictions: { country: "co" },
          }
        );

        newAutocomplete.addListener("place_changed", () => {
          const place = newAutocomplete.getPlace();
          if (place.geometry) {
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };

            setMarkerPosition(location);
            setAddress(place.formatted_address);
            setCenter(location);
            setTimeout(() => {
              setCenter(undefined);
            }, 500);
          }
        });

        setAutocomplete(newAutocomplete);
      }
    }
  }, [autocompleteLoaded, setMarkerPosition, setAddress]);

  const getAddressFromLatLng = useCallback(
    async (latLng) => {
      if (window.google) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            setAddress(results[0].formatted_address);
          } else {
            console.error("Error al obtener la dirección: ", status);
          }
        });
      }
    },
    [setAddress]
  );

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);

    const cityData = cities.find((c) => c.value === selectedCity);
    if (cityData && cityData.coords && mapRef.current) {
      mapRef.current.panTo(cityData.coords);
      mapRef.current.setZoom(13);

      if (!markerPosition || !markerPosition.lat) return;

      if (markerRef.current) {
        markerRef.current.setPosition(markerPosition);
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        <Label htmlFor="city" className="text-xl font-semibold">
          Ciudad
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
            <PiCityDuotone size={20} />
          </div>
          <Select value={city} onValueChange={handleCityChange}>
            <SelectTrigger className="w-full pl-10 py-3 h-auto">
              <SelectValue placeholder="Selecciona una ciudad" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="location" className="text-xl font-semibold">
          Ubicación
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
            <PiMapPinDuotone size={20} />
          </div>
          <Input
            id="location"
            className="w-full pl-10 py-3 !h-auto"
            placeholder="Dirección del inmueble"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      {showMap && (
        <div className="w-full h-64 bg-gray-200 rounded-lg mt-2 relative overflow-hidden">
          {autocompleteLoaded && window.google && (
            <div
              id="map"
              className="w-full h-full"
              style={{ position: "relative" }}
            >
              {(() => {
                if (
                  typeof window !== "undefined" &&
                  window.google &&
                  document.getElementById("map")
                ) {
                  const mapElement = document.getElementById("map");
                  if (!mapRef.current && mapElement) {
                    const map = new window.google.maps.Map(mapElement, {
                      center: center || defaultCenter,
                      zoom: 13,
                    });

                    mapRef.current = map;

                    map.addListener("click", (e) => {
                      const position = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                      };
                      setMarkerPosition(position);

                      if (markerRef.current) {
                        markerRef.current.setPosition(position);
                      } else {
                        markerRef.current = new window.google.maps.Marker({
                          position: position,
                          map: map,
                          draggable: true,
                        });

                        markerRef.current.addListener("dragend", () => {
                          const newPos = {
                            lat: markerRef.current.getPosition().lat(),
                            lng: markerRef.current.getPosition().lng(),
                          };
                          setMarkerPosition(newPos);
                          getAddressFromLatLng(newPos);
                        });
                      }

                      getAddressFromLatLng(position);
                    });
                  }

                  if (mapRef.current && center) {
                    mapRef.current.panTo(center);
                  }

                  if (
                    mapRef.current &&
                    markerPosition &&
                    markerPosition.lat
                  ) {
                    if (markerRef.current) {
                      markerRef.current.setPosition(markerPosition);
                    } else {
                      markerRef.current = new window.google.maps.Marker({
                        position: markerPosition,
                        map: mapRef.current,
                        draggable: true,
                      });

                      markerRef.current.addListener("dragend", () => {
                        const newPos = {
                          lat: markerRef.current.getPosition().lat(),
                          lng: markerRef.current.getPosition().lng(),
                        };
                        setMarkerPosition(newPos);
                        getAddressFromLatLng(newPos);
                      });
                    }
                  }
                }
                return null;
              })()}
            </div>
          )}
          {!autocompleteLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purpus-blue-500" />
              <span className="ml-2">Cargando el mapa...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MapInput;