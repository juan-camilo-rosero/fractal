"use client";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import ShortCuts from "@/components/sections/dashboard/ShortCuts";
import PropertyTable from "@/components/sections/dashboard/properties/PropertyTable";

export default function Page() {
  const [userProperties, setUserProperties] = useState([]);
  const { properties, lessedProperties, userType } = useContext(UserContext);
  
  useEffect(() => {
    if (userType === "arrendatario") {
      if (lessedProperties) {
        setUserProperties(lessedProperties);
      }
    } else {
      if (properties) {
        setUserProperties(properties);
      }
    }
  }, [properties, lessedProperties, userType]);
  
  return (
    <div>
      <ShortCuts />
      <div className="mt-8 w-full flex flex-col gap-8">
        <h2 className="dashboard-title">Mis propiedades</h2>
        <PropertyTable properties={userProperties} />
      </div>
    </div>
  );
}