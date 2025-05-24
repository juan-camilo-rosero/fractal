"use client";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import PropertyTable from "@/components/sections/dashboard/properties/PropertyTable";

function page() {
  const [userProperties, setUserProperties] = useState([]);
  const { properties } = useContext(UserContext);

  useEffect(() => {
    if (properties) {
      setUserProperties(properties);
    }
  }, [properties]);

  return (
    <div>
      <h2 className="dashboard-title">Mis inmuebles</h2>
      <div className="w-full mt-8">
        <PropertyTable properties={userProperties} />
      </div>
    </div>
  );
}

export default page;
