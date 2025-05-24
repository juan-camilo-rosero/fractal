"use client";
import { useAuth } from "@/lib/useAuth";
import { useEffect, useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PiSidebarSimpleDuotone } from "react-icons/pi";
import { UserContext } from "@/context/UserContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SidebarContent from "@/components/sidebar/SidebarContent";
import BreadcrumbNavigation from "@/components/sidebar/BreadcrumbNavigation";
import { getUserData, getUserProperties, getUserType, getUserLessedProperties } from "@/lib/db_functions";

export default function DashboardLayout({ children }) {
  const userContext = useContext(UserContext);
  const router = useRouter();
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [isInmueblesOpen, setIsInmueblesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userIsTenant, setUserIsTenant] = useState(false);

  useEffect(() => {
    const checkUserRole = async email => {
      if(userContext.email){
        const userRole = await getUserType(userContext.email)
        setUserIsAdmin(userRole === "admin")
        setUserIsTenant(userRole === "arrendatario")
        userContext.setUserType(userRole)
      }
    }

    if (user) {
      userContext.setUser(user);
      userContext.setEmail(user.email);
      checkUserRole()
    }
  }, [user, userContext]);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const email = userContext.email;
    const fetchData = async () => {
      if (email) {
        const userData = await getUserData(email);
        if (!userData && pathname !== "/dashboard/onboarding") {
          router.push("/dashboard/onboarding");
        }
        else{
          const userRole = await getUserType(email);
          
          if (userRole === "arrendatario") {
            // Si es arrendatario, obtener propiedades arrendadas
            const lessedPropertiesData = await getUserLessedProperties(userData.id);
            userContext.setLessedProperties(lessedPropertiesData);
            console.log("Lesseed Properties:", lessedPropertiesData); // Debug
          } else {
            // Si no es arrendatario, obtener propiedades normales
            const propertiesData = await getUserProperties(userData.id);
            userContext.setProperties(propertiesData);
            console.log("Owner Properties:", propertiesData); // Debug
          }
        }
      }
    };
    fetchData();
  }, [userContext.email, pathname, router]);

  // CAMBIO PRINCIPAL: Usar userContext.userType en lugar de userIsTenant
  const properties = userContext.userType === "arrendatario"
    ? (userContext.lessedProperties || [])
    : (userContext.properties || []);

  console.log("UserType:", userContext.userType); // Debug
  console.log("Properties to show:", properties); // Debug

  const generateBreadcrumbs = () => {
    if (!pathname) return [];

    const paths = pathname.split("/").filter((path) => path);

    return paths.map((path, index) => {
      const formattedPath =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

      const url = "/" + paths.slice(0, index + 1).join("/");

      const isLast = index === paths.length - 1;

      return {
        text: formattedPath,
        url,
        isLast,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="hidden lg:block fixed inset-y-0 left-0 z-10 w-64 border-r bg-background">
          <SidebarContent isLoading={true} properties={[]} userContext={{}} />
        </div>
        <div className="lg:ml-64 p-6">
          <div className="flex items-center h-12 gap-2 pb-2 border-b">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-4 w-[250px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-[180px] rounded-xl" />
            <Skeleton className="h-[180px] rounded-xl" />
          </div>

          <Skeleton className="flex-1 min-h-[300px] rounded-xl mt-6" />
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div
        className={`hidden lg:block fixed inset-y-0 left-0 z-10 w-64 border-r bg-background transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          isInmueblesOpen={isInmueblesOpen}
          setIsInmueblesOpen={setIsInmueblesOpen}
          userContext={userContext}
          properties={properties}
          userIsAdmin={userIsAdmin}
          userIsTenant={userIsTenant} // Cambiado nombre
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:hidden fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-md border bg-background cursor-pointer">
            <PiSidebarSimpleDuotone className="h-5 w-5 text-primary-700" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent
            isInmueblesOpen={isInmueblesOpen}
            setIsInmueblesOpen={setIsInmueblesOpen}
            userContext={userContext}
            properties={properties}
          />
        </SheetContent>
      </Sheet>

      <div
        className={`${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="p-6">
          <div className="flex items-center h-12 gap-2 pb-2 border-b">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-md border bg-background cursor-pointer"
            >
              <PiSidebarSimpleDuotone className="h-5 w-5 text-primary-700" />
            </button>
            <BreadcrumbNavigation breadcrumbs={breadcrumbs} />
          </div>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}