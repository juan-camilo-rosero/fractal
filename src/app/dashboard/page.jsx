"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserContextProvider } from "@/context/UserContext";
import Courses from "@/components/dashboard/Courses";
import { isUserLoggedIn } from "@/lib/auth_functions";
import { useEffect, useState } from "react";

const findUser = async () => {
  try {
    const res = await isUserLoggedIn();
    console.log("User check result:", res);
    return res;
  } catch (error) {
    console.error("Error checking user login status:", error);
    return null;
  }
};

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await findUser();
      if (!res) {
        window.location.href = "/";
        return;
      }
      setUser(res);
    };

    checkUser();
  }, []);

  // Evitar renderizar contenido si `user` aún es nulo
  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
    <UserContextProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-grow w-full">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:hidden">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <div className="flex flex-col gap-4 p-4 pt-0">
              <div className="h-48 rounded-xl w-full mt-5 bg-fblue-700" />
            </div>
            <Courses />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserContextProvider>
  );
}
