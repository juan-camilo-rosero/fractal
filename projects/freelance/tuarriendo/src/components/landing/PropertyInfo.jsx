"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useContext } from "react";
import { MapContext } from "@/context/MapContext";
import useMediaQuery from "@/hooks/useMediaQuery";

const propertyTypes = [
  { id: "apartment", label: "Apartamento", icon: null },
  { id: "house", label: "Casa", icon: null },
  { id: "studio", label: "Apartaestudio", icon: null },
  { id: "local", label: "Local", icon: null },
  { id: "office", label: "Oficina", icon: null },
  { id: "medical", label: "Consultorio", icon: null },
  { id: "roomie", label: "Roomie", icon: null },
];

const cities = [
  { id: "bogota", label: "Bogotá" },
  { id: "ibague", label: "Ibagué" },
  { id: "manizales", label: "Manizales" },
  { id: "pereira", label: "Pereira" },
  { id: "armenia", label: "Armenia" }
];

const formatPriceToCOP = (precio) => {
  return precio
    .toLocaleString("es-CO", { style: "currency", currency: "COP" })
    .replace(",00", "");
};

const translatePropertyType = (type) => {
  const propertyType = propertyTypes.find((item) => item.id === type);
  return propertyType ? propertyType.label : type;
};

const translateCity = (city) => {
  const cityObj = cities.find((item) => item.id === city);
  return cityObj ? cityObj.label : city;
};

export default function DrawerDialogDemo() {
  const { showInfo, setShowInfo, price, propertyInfo, propertyId, loading } =
    useContext(MapContext);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const defaultImage = "/placeholder.webp";
  const imageSrc =
    propertyInfo?.images?.length > 0 ? propertyInfo.images[0] : defaultImage;
  
  const translatedType = propertyInfo?.type ? translatePropertyType(propertyInfo.type) : "";
  const translatedCity = propertyInfo?.city ? translateCity(propertyInfo.city) : "";
  
  const isDataEmpty = !propertyInfo || loading || !translatedType || !translatedCity;

  return (
    <>
      {isLargeScreen ? (
        // Dialog para pantallas grandes
        <Dialog open={showInfo} onOpenChange={setShowInfo}>
          <DialogContent className="py-2">
            <DialogHeader>
              <DialogTitle className="hidden">
                Información del inmueble
              </DialogTitle>
            </DialogHeader>
            <div className="w-full p-4 flex flex-col">
              {isDataEmpty ? (
                <Skeleton className="h-64 w-full rounded-xl" />
              ) : (
                <img
                  className="h-64 flex-shrink-0 bg-third-400 rounded-xl object-cover"
                  alt="Imagen apartamento"
                  src={imageSrc}
                />
              )}
              <div className="flex flex-col flex-shrink-0">
                {isDataEmpty ? (
                  <Skeleton className="h-6 w-3/4 mt-2" />
                ) : (
                  <p className="mt-2 font-semibold text-black/50 text-lg">
                    {translatedType} en {propertyInfo.neighborhood ? `${propertyInfo.neighborhood}, ` : ""}{translatedCity}
                  </p>
                )}
                {isDataEmpty || !price ? (
                  <Skeleton className="h-10 w-2/3 mt-2" />
                ) : (
                  <p className="mt-2 font-semibold text-primary-500 text-3xl">
                    {formatPriceToCOP(price)} total
                  </p>
                )}
                {isDataEmpty || !propertyInfo.squareMeters || !propertyInfo.rooms || !propertyInfo.bathrooms ? (
                  <Skeleton className="h-6 w-full mt-3" />
                ) : (
                  <p className="mt-3 font-medium text-black text-lg">
                    {propertyInfo.squareMeters} m² • {propertyInfo.rooms} cuartos
                    • {propertyInfo.bathrooms} baños
                  </p>
                )}
                <Link
                  href={`/inmueble/${propertyId}`}
                  className="bg-secondary-500 py-2 rounded-lg text-third-200 font-semibold text-2xl text-center transition-all hover:bg-secondary-700 mt-8"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        // Drawer para pantallas pequeñas y medianas
        <Drawer open={showInfo} onOpenChange={setShowInfo}>
          <DrawerContent className="flex flex-col">
            <DrawerHeader className="text-left">
              <DrawerTitle className="hidden">
                Información del inmueble
              </DrawerTitle>
            </DrawerHeader>
            <div className="w-full px-8 py-12 border-b-[2px] border-third-400">
              {isDataEmpty ? (
                <Skeleton className="w-full h-48 md:h-64 rounded-xl" />
              ) : (
                <img
                  className="w-full h-auto max-h-48 bg-third-300 rounded-xl object-cover md:max-h-64"
                  alt="Imagen apartamento"
                  src={imageSrc}
                />
              )}
              {isDataEmpty ? (
                <Skeleton className="h-8 w-1/2 mt-2" />
              ) : (
                <p className="mt-2 font-semibold text-black/50 text-xl">
                  {translatedType}
                </p>
              )}
              {isDataEmpty || !price ? (
                <Skeleton className="h-10 w-2/3 mt-4" />
              ) : (
                <p className="mt-4 font-semibold text-primary-500 text-3xl">
                  {formatPriceToCOP(price)} total
                </p>
              )}
              {isDataEmpty || !propertyInfo.squareMeters || !propertyInfo.rooms || !propertyInfo.bathrooms ? (
                <Skeleton className="h-8 w-full mt-6" />
              ) : (
                <p className="mt-6 font-medium text-black text-xl">
                  {propertyInfo.squareMeters} m² • {propertyInfo.rooms} cuartos •{" "}
                  {propertyInfo.bathrooms} baños
                </p>
              )}
              {isDataEmpty ? (
                <Skeleton className="h-6 w-3/4 mt-6" />
              ) : (
                <p className="mt-6 font-medium text-black/50 text-lg">
                  {propertyInfo.neighborhood ? `${propertyInfo.neighborhood}, ` : ""}{translatedCity}
                </p>
              )}
            </div>
            <DrawerFooter className="pt-8 px-8">
              <DrawerClose asChild>
                <Link
                  href={`/inmueble/${propertyId}`}
                  className="w-full bg-secondary-500 py-3 rounded-lg text-third-200 font-semibold text-2xl text-center transition-all hover:bg-secondary-700"
                >
                  Ver más
                </Link>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}