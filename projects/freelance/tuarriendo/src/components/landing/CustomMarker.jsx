"use client";
import React, { useContext } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { MapContext } from "../../context/MapContext";
import { getProperty } from "@/lib/db_functions";

const defaultInfo = {
  age: 0,
  amenities: [],
  bathrooms: 0,
  city: "",
  hasPermission: true,
  marker: {
    lat: 0,
    lng: 0,
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
};

function CustomMarker({ point, index }) {
  const {
    setShowInfo,
    setPrice,
    setPropertyInfo,
    propertyInfo,
    setPropertyId,
  } = useContext(MapContext);
  const handleClick = async () => {
    setPrice(point.price);
    setShowInfo(true);
    setPropertyInfo(defaultInfo);
    const info = await getProperty(point.id);
    console.log(info);
    console.log(point.id);
    setPropertyInfo(info);
    setPropertyId(point.id);
  };

  const formatPriceToCOP = (price) => {
    return price.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
  };

  return (
    <AdvancedMarker
      position={{ lat: point.lat, lng: point.lng }}
      className="px-3 py-1 text-base font-medium text-primary-500 border-[1px] border-primary-500 rounded-lg bg-third-200 transition-all cursor-pointer hover:bg-third-300"
      clickable={true}
      onClick={handleClick}
    >
      <span>{formatPriceToCOP(point.price)}</span>
    </AdvancedMarker>
  );
}

export default CustomMarker;
