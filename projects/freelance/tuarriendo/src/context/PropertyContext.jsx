"use client";
import { createContext, useState } from "react";

export const PropertyContext = createContext();

export function PropertyContextProvider(props) {
  const [type, setType] = useState("Apartamento");
  const [rooms, setRooms] = useState("1");
  const [bathrooms, setBathrooms] = useState("1");
  const [strata, setStrata] = useState("1");
  const [state, setState] = useState("Nuevo");
  const [age, setAge] = useState(0);
  const [imgUrl, setImgUrl] = useState([]);
  const [city, setCity] = useState("Bogotá");
  const [rent, setRent] = useState(0);
  const [squareMeters, setSquareMeters] = useState(0);
  const [parkingSlots, setParkingSlots] = useState(0);
  const [neighborhood, setNeighborhood] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [propertyId, setPropertyId] = useState("");

  const resetPropertyContext = () => {
    setType("Apartamento");
    setRooms("1");
    setBathrooms("1");
    setStrata("1");
    setState("Nuevo");
    setAge(0);
    setImgUrl([]);
    setCity("Bogotá");
    setRent(0);
    setSquareMeters(0);
    setParkingSlots(0);
    setNeighborhood("");
    setMarkerPosition(null);
    setAddress("");
    setDetails([]);
    setIsEditing(false);
    setPropertyId("");
  };

  return (
    <PropertyContext.Provider
      value={{
        type,
        setType,
        rooms,
        setRooms,
        bathrooms,
        setBathrooms,
        strata,
        setStrata,
        state,
        setState,
        age,
        setAge,
        parkingSlots,
        setParkingSlots,
        imgUrl,
        setImgUrl,
        city,
        setCity,
        rent,
        setRent,
        squareMeters,
        setSquareMeters,
        neighborhood,
        setNeighborhood,
        markerPosition,
        setMarkerPosition,
        address,
        setAddress,
        details,
        setDetails,
        isEditing,
        setIsEditing,
        propertyId,
        setPropertyId,
        resetPropertyContext, // se incluye aquí
      }}
    >
      {props.children}
    </PropertyContext.Provider>
  );
}
