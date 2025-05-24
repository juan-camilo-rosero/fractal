"use client";

import { UserContext } from "@/context/UserContext";
import { getUserEmail } from "@/lib/auth_functions";
import { useContext, useEffect, useState } from "react";
import { getUserData, hasPermission } from "@/lib/db_functions";
import { useRouter } from "next/navigation";
import PropertyFormContainer from "@/components/sections/dashboard/properties/PropertyFormContainer";

function page() {
  const { email } = useContext(UserContext);
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (email) => {
      const userEmail = await getUserEmail();
      const permission = await hasPermission(userEmail);
      const userData = await getUserData(userEmail);

      if (!permission) {
        router.push("/dashboard/espera-permiso");
      }

      if (!userData.missingProperties) {
        router.push("/dashboard/pagos");
      }

      setIsValid(permission);
    };
    if (email) {
      fetchData();
    }
  }, [email]);
  return (
    <div>
      {isValid ? (
        <div>
          <PropertyFormContainer formType="create"/>
        </div>
        ) : <h2 className="dashboard-title">Cargando...</h2>}
    </div>
  );
}

export default page;
