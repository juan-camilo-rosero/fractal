"use client";
import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  PiHouseDuotone,
  PiBuildingsDuotone,
  PiBuildingOfficeDuotone,
  PiWarehouseDuotone,
  PiDoorDuotone,
  PiImageDuotone,
  PiMoneyDuotone,
  PiRulerDuotone,
  PiToiletDuotone,
  PiBedDuotone,
  PiCarDuotone,
  PiCalendarDuotone,
  PiMedalDuotone,
  PiListChecksDuotone,
  PiMapPinDuotone,
  PiBuildingsDuotone as PiCityDuotone,
} from "react-icons/pi";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyContext } from "@/context/PropertyContext";
import { cn } from "@/lib/utils";
import { createProperty, getUserData, updateProperty, updateUser } from "@/lib/db_functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/lib/useAuth";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PropertyForm() {
  const { user } = useAuth();
  const {
    type,
    setType,
    rooms,
    setRooms,
    bathrooms,
    setBathrooms,
    strata,
    setStrata,
    age,
    setAge,
    imgUrl,
    setImgUrl,
    rent,
    setRent,
    squareMeters,
    setSquareMeters,
    address,
    setAddress,
    details,
    setDetails,
    city,
    setCity,
    markerPosition,
    setMarkerPosition,
  } = useContext(PropertyContext);

  const [open, setOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, title: "", message: "" });
  const [parking, setParking] = useState(0);
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

  const router = useRouter();
  const pathname = usePathname();
  const { propertyId } = useParams();

  const isEditMode = pathname?.includes("/dashboard/inmuebles/editar");

  const propertyTypes = [
    {
      id: "apartment",
      label: "Apartamento",
      icon: <PiBuildingsDuotone size={36} />,
    },
    { id: "house", label: "Casa", icon: <PiHouseDuotone size={36} /> },
    { id: "studio", label: "Apartaestudio", icon: <PiDoorDuotone size={36} /> },
    { id: "local", label: "Local", icon: <PiWarehouseDuotone size={36} /> },
    {
      id: "office",
      label: "Oficina",
      icon: <PiBuildingOfficeDuotone size={36} />,
    },
    {
      id: "medical",
      label: "Consultorio",
      icon: <PiBuildingOfficeDuotone size={36} />,
    },
    { id: "roomie", label: "Roomie", icon: <PiBedDuotone size={36} /> },
  ];

  const amenities = [
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Gimnasio" },
    { value: "parking", label: "Estacionamiento" },
    { value: "security", label: "Seguridad 24/7" },
    { value: "pet_friendly", label: "Admite mascotas" },
    { value: "furnished", label: "Amoblado" },
    { value: "balcony", label: "Balcón" },
    { value: "garden", label: "Jardín" },
    { value: "bbq", label: "Zona de BBQ" },
    { value: "playground", label: "Área de juegos" },
    { value: "laundry", label: "Lavandería" },
    { value: "elevator", label: "Ascensor" },
    { value: "storage", label: "Bodega" },
  ];

  const cities = [
    {
      value: "bogota",
      label: "Bogotá",
      coords: { lat: 4.60971, lng: -74.08175 },
    },
    {
      value: "ibague",
      label: "Ibagué",
      coords: { lat: 4.43889, lng: -75.23222 },
    },
    {
      value: "manizales",
      label: "Manizales",
      coords: { lat: 5.06889, lng: -75.51738 },
    },
    {
      value: "pereira",
      label: "Pereira",
      coords: { lat: 4.80872, lng: -75.6906 },
    },
    {
      value: "armenia",
      label: "Armenia",
      coords: { lat: 4.53389, lng: -75.68111 },
    },
  ];

  useEffect(() => {
    setShowMap(true);

    // Script para cargar la API de Google Maps
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
  }, [autocompleteLoaded, setMarkerPosition]);

  const handleDetailsSelection = (value) => {
    if (selectedDetails.includes(value)) {
      setSelectedDetails(selectedDetails.filter((item) => item !== value));
      setDetails(details.filter((item) => item !== value));
    } else {
      setSelectedDetails([...selectedDetails, value]);
      setDetails([...details, value]);
    }
  };

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

  const handleMapClick = (e) => {
    if (window.google) {
      const latLng = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setMarkerPosition(latLng);
      getAddressFromLatLng(latLng);
    }
  };

  const validateForm = () => {
    if (!type) {
      setError({
        show: true,
        title: "Tipo requerido",
        message: "Por favor selecciona el tipo de inmueble",
      });
      return false;
    }

    if (!rent || rent <= 0) {
      setError({
        show: true,
        title: "Precio inválido",
        message: "Por favor ingresa un precio válido para el inmueble",
      });
      return false;
    }

    if (!squareMeters || squareMeters <= 0) {
      setError({
        show: true,
        title: "Área inválida",
        message: "Por favor ingresa un área válida para el inmueble",
      });
      return false;
    }

    if (!address) {
      setError({
        show: true,
        title: "Dirección requerida",
        message: "Por favor ingresa la dirección del inmueble",
      });
      return false;
    }

    if (!markerPosition || !markerPosition.lat || !markerPosition.lng) {
      setError({
        show: true,
        title: "Ubicación requerida",
        message: "Por favor selecciona la ubicación en el mapa",
      });
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Obtener los datos del usuario actual
      const userData = await getUserData(user.email);

      if (!userData) {
        setError({
          show: true,
          title: "Usuario no encontrado",
          message: "No se pudo encontrar la información del usuario",
        });
        return;
      }

      // Verificar si el usuario puede crear más propiedades
      if (userData.missingProperties <= 0) {
        setError({
          show: true,
          title: "Límite alcanzado",
          message:
            "Has alcanzado el límite de propiedades que puedes crear. Contacta al administrador para aumentar tu límite.",
        });
        return;
      }

      // Preparar los datos de la propiedad
      const propertyData = {
        type,
        bathrooms: parseInt(bathrooms) || 0,
        rooms: parseInt(rooms) || 0,
        strata: parseInt(strata) || 1,
        age: parseInt(age) || 0,
        price: parseFloat(rent) || 0,
        squareMeters: parseFloat(squareMeters) || 0,
        address,
        city,
        amenities: details,
        parking: parseInt(parking) || 0,
        images: [],
        marker: markerPosition,
      };

      if (isEditMode) {
        const propertyId = await createProperty(userData.id, propertyData);

        if (!propertyId) {
          setError({
            show: true,
            title: "Error al actualizar",
            message:
              "Ocurrió un error al actualizar la propiedad. Inténtalo de nuevo.",
          });
          return;
        }

        await updateUser(userData.id, {
          missingProperties: Math.max(0, userData.missingProperties - 1),
        });

        setError({
          show: true,
          title: "¡Propiedad actualizar!",
          message: "La propiedad ha sido actualizar exitosamente.",
        });

        router.push("/dashboard");
      } else {
        const res = await updateProperty(propertyId, propertyData);

        if (!res) {
          setError({
            show: true,
            title: "Error al crear",
            message:
              "Ocurrió un error al crear la propiedad. Inténtalo de nuevo.",
          });
          return;
        }
        setError({
          show: true,
          title: "¡Propiedad creada!",
          message: "La propiedad ha sido creada exitosamente.",
        });
      }
    } catch (error) {
      console.error("Error en la creación de la propiedad:", error);
      setError({
        show: true,
        title: "Error inesperado",
        message: "Ocurrió un error inesperado. Inténtalo de nuevo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Detalles del inmueble</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-8">
          {/* Property Type */}
          <div className="space-y-4">
            <Label className="text-xl font-semibold">Tipo de inmueble</Label>
            <RadioGroup
              value={type}
              onValueChange={setType}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {propertyTypes.map((propertyType) => (
                <div
                  key={propertyType.id}
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    type === propertyType.id
                      ? "bg-blue-100 text-purpus-blue-700 border-purpus-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={propertyType.id}
                    id={propertyType.id}
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor={propertyType.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-purpus-blue-500 flex-shrink-0">
                      {propertyType.icon}
                    </div>
                    <span className="font-medium">{propertyType.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <Label htmlFor="images" className="text-xl font-semibold">
              Imágenes
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                <PiImageDuotone size={20} />
              </div>
              <Input
                id="images"
                type="file"
                multiple
                className="w-full pl-10 py-3 !h-auto"
                onChange={(e) => {
                  // Este espacio es para agregar la funcionalidad más tarde
                }}
              />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-4">
            <Label htmlFor="price" className="text-xl font-semibold">
              Precio
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                <PiMoneyDuotone size={20} />
              </div>
              <Input
                id="price"
                type="number"
                min="0"
                step="1000"
                className="w-full pl-10 py-3 !h-auto"
                placeholder="Ingresa el valor mensual"
                value={rent}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setRent(value);
                  } else if (e.target.value === "") {
                    setRent("");
                  }
                }}
                onBlur={() => {
                  if (rent === "" || isNaN(parseFloat(rent))) {
                    setRent(0);
                  }
                }}
              />
            </div>
          </div>

          {/* Area */}
          <div className="space-y-4">
            <Label htmlFor="area" className="text-xl font-semibold">
              Área (m²)
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                <PiRulerDuotone size={20} />
              </div>
              <Input
                id="area"
                type="number"
                min="0"
                step="0.1"
                className="w-full pl-10 py-3 !h-auto"
                placeholder="Metros cuadrados"
                value={squareMeters}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setSquareMeters(value);
                  } else if (e.target.value === "") {
                    setSquareMeters("");
                  }
                }}
                onBlur={() => {
                  if (squareMeters === "" || isNaN(parseFloat(squareMeters))) {
                    setSquareMeters(0);
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Bathrooms, Rooms, Parking, Years */}
          <div className="grid grid-cols-2 gap-4 lg:mt-6">
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className="font-semibold">
                Baños
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                  <PiToiletDuotone size={20} />
                </div>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                  className="w-full pl-10 py-3 !h-auto"
                  value={bathrooms}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setBathrooms(value);
                    } else if (e.target.value === "") {
                      setBathrooms("");
                    }
                  }}
                  onBlur={() => {
                    if (bathrooms === "" || isNaN(parseInt(bathrooms))) {
                      setBathrooms(0);
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rooms" className="font-semibold">
                Habitaciones
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                  <PiBedDuotone size={20} />
                </div>
                <Input
                  id="rooms"
                  type="number"
                  min="0"
                  className="w-full pl-10 py-3 !h-auto"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="parking" className="font-semibold">
                Parqueaderos
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                  <PiCarDuotone size={20} />
                </div>
                <Input
                  id="parking"
                  type="number"
                  min="0"
                  className="w-full pl-10 py-3 !h-auto"
                  placeholder="0"
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="years" className="font-semibold">
                Años
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                  <PiCalendarDuotone size={20} />
                </div>
                <Input
                  id="years"
                  type="number"
                  min="0"
                  className="w-full pl-10 py-3 !h-auto"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Estrato */}
          <div className="space-y-4">
            <Label htmlFor="strata" className="text-xl font-semibold">
              Estrato
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                <PiMedalDuotone size={20} />
              </div>
              <Input
                id="strata"
                type="number"
                min="1"
                max="6"
                className="w-full pl-10 py-3 !h-auto"
                placeholder="Ingresa el estrato (1-6)"
                value={strata}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    if (value < 1) setStrata(1);
                    else if (value > 6) setStrata(6);
                    else setStrata(value);
                  } else {
                    setStrata("");
                  }
                }}
                onBlur={() => {
                  if (strata === "" || isNaN(parseInt(strata))) {
                    setStrata(1);
                  }
                }}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <Label className="text-xl font-semibold">Comodidades</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between pl-10 relative text-left"
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
                    <PiListChecksDuotone size={20} />
                  </div>
                  {selectedDetails.length > 0
                    ? `${selectedDetails.length} comodidades seleccionadas`
                    : "Selecciona las comodidades"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Buscar comodidades..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                    <CommandGroup>
                      {amenities.map((amenity) => (
                        <CommandItem
                          key={amenity.value}
                          onSelect={() => handleDetailsSelection(amenity.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedDetails.includes(amenity.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {amenity.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Ciudad */}
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

          {/* Location */}
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

          {/* Map */}
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
                      // Component to render Google Map
                      const mapElement = document.getElementById("map");
                      if (!mapRef.current && mapElement) {
                        const map = new window.google.maps.Map(mapElement, {
                          center: center || defaultCenter,
                          zoom: 13,
                        });

                        mapRef.current = map;

                        // Add click event to map
                        map.addListener("click", (e) => {
                          const position = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                          };
                          setMarkerPosition(position);

                          // Update or create marker
                          if (markerRef.current) {
                            markerRef.current.setPosition(position);
                          } else {
                            markerRef.current = new window.google.maps.Marker({
                              position: position,
                              map: map,
                              draggable: true,
                            });

                            // Add dragend listener only once
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

                      // Update map center if changed
                      if (mapRef.current && center) {
                        mapRef.current.panTo(center);
                      }

                      // Update marker position if changed
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

          {/* Create Button */}
          <div className="pt-4">
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando inmueble...
                </>
              ) : (
                "Crear inmueble"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Error/Success Dialog */}
      <AlertDialog
        open={error.show}
        onOpenChange={(open) => setError({ ...error, show: open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{error.title}</AlertDialogTitle>
            <AlertDialogDescription>{error.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendido</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PropertyForm;
