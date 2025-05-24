"use client";
import { PropertyContext } from "@/context/PropertyContext";
import { useAuth } from "@/lib/useAuth";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import MapInput from "@/components/sections/dashboard/properties/MapInput";
import PropertyTypeInput from "@/components/sections/dashboard/properties/PropertyTypeInput";
import ImageInput from "@/components/sections/dashboard/properties/ImageInput";
import PriceInput from "@/components/sections/dashboard/properties/PriceInput";
import AreaInput from "@/components/sections/dashboard/properties/AreaInput";
import PropertyDetailsInput from "@/components/sections/dashboard/properties/PropertyDetailsInput";
import StrataInput from "@/components/sections/dashboard/properties/StrataInput";
import AmenitiesInput from "@/components/sections/dashboard/properties/AmenitiesInput";
import {
  createProperty,
  getProperty,
  getUserId,
  updateProperty,
} from "@/lib/db_functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

function PropertyFormContainer({ formType = "create" }) {
  const { id } = useParams() || {};
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
  });

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
    parkingSlots,
    setParkingSlots,
    city,
    setCity,
    markerPosition,
    setMarkerPosition,
    resetPropertyContext,
  } = useContext(PropertyContext);

  const showAlert = (title, description) => {
    setAlertMessage({ title, description });
    setAlertOpen(true);
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (formType === "update" && id) {
        try {
          setIsLoading(true);
          const propertyData = await getProperty(id);

          console.log(propertyData)

          if (!propertyData) {
            showAlert("Error", "No se pudo encontrar la propiedad");
            router.push("/dashboard/properties");
            return;
          }

          setType(propertyData.type || "");
          setRooms(propertyData.rooms || 0);
          setBathrooms(propertyData.bathrooms || 0);
          setStrata(propertyData.strata || "");
          setAge(propertyData.age || 0);
          setImgUrl(propertyData.images || []);
          setRent(propertyData.price || 0);
          setSquareMeters(propertyData.squareMeters || 0);
          setAddress(propertyData.address || "");
          setDetails(propertyData.amenities || []);
          setParkingSlots(propertyData.parking || 0);
          setCity(propertyData.city || "bogota");

          if (propertyData.marker) {
            setMarkerPosition({
              lat: propertyData.marker.lat,
              lng: propertyData.marker.lng,
            });
          }
        } catch (err) {
          console.error("Error al cargar los datos de la propiedad:", err);
          setError("Error al cargar los datos de la propiedad");
          showAlert("Error", "Error al cargar los datos de la propiedad");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPropertyData();

    return () => {
      if (formType === "create") {
        resetPropertyContext();
      }
    };
  }, [formType, id, router]);

  const validateForm = () => {
    if (!type) return showAlert("Error de validación", "Debes seleccionar un tipo de propiedad"), false;
    if (!rent || rent <= 0) return showAlert("Error de validación", "El precio debe ser mayor a 0"), false;
    if (!squareMeters || squareMeters <= 0) return showAlert("Error de validación", "El área debe ser mayor a 0"), false;
    if (!rooms || rooms <= 0) return showAlert("Error de validación", "Debes especificar el número de habitaciones"), false;
    if (!bathrooms || bathrooms <= 0) return showAlert("Error de validación", "Debes especificar el número de baños"), false;
    if (!address) return showAlert("Error de validación", "Debes ingresar una dirección"), false;
    if (!city) return showAlert("Error de validación", "Debes seleccionar una ciudad"), false;
    if (!markerPosition || !markerPosition.lat || !markerPosition.lng) {
      return showAlert("Error de validación", "Debes seleccionar una ubicación en el mapa"), false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const propertyData = {
        type,
        images: imgUrl,
        price: rent,
        squareMeters,
        address,
        amenities: details,
        parking: parkingSlots,
        city,
        rooms,
        bathrooms,
        strata,
        age,
        marker: {
          lat: markerPosition.lat,
          lng: markerPosition.lng,
        },
        neighborhood: "",
        state: "",
      };

      if (formType === "create") {
        const userId = await getUserId(user.email)
        const newId = await createProperty(userId, propertyData);

        if (newId) {
          resetPropertyContext();
          router.push("/dashboard");
        } else {
          showAlert("Error", "Error al crear la propiedad");
          console.log(propertyData)
        }
      } else if (formType === "update" && id) {
        const updated = await updateProperty(id, propertyData);

        if (updated) {
          showAlert("Datos actualizados exitosamente", "Los cambios han sido guardados exitosamente");
        } else {
          showAlert("Error", "Error al actualizar la propiedad");
        }
      }
    } catch (err) {
      console.error("Error al procesar la propiedad:", err);
      showAlert(
        "Error",
        formType === "create"
          ? "Error al crear la propiedad"
          : "Error al actualizar la propiedad"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (formType === "update" && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>Cargando datos de la propiedad...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-12 w-full items-center md:items-start">
        <div className="w-full flex flex-col gap-4">
          <PropertyTypeInput type={type} setType={setType} />
          <ImageInput images={imgUrl} onImagesChange={setImgUrl} />
          <PriceInput rent={rent} setRent={setRent} />
          <AreaInput squareMeters={squareMeters} setSquareMeters={setSquareMeters} />
        </div>
        <div className="w-full flex flex-col gap-4">
          <PropertyDetailsInput
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            rooms={rooms}
            setRooms={setRooms}
            parkingSlots={parkingSlots}
            setParkingSlots={setParkingSlots}
            age={age}
            setAge={setAge}
          />
          <StrataInput strata={strata} setStrata={setStrata} />
          <AmenitiesInput details={details} setDetails={setDetails} />
          <MapInput
            cities={cities}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />
          <Button onClick={handleSubmit} className="primary-button" disabled={isLoading}>
            {isLoading
              ? formType === "create"
                ? "Creando..."
                : "Actualizando..."
              : formType === "create"
              ? "Crear inmueble"
              : "Guardar cambios"}
          </Button>
        </div>
      </div>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PropertyFormContainer;
