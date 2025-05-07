"use client";

import {
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-courses";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { RiHome3Fill, RiLineChartFill } from "react-icons/ri";

const data = {
  user: {
    name: "juanca",
    email: "juanca@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: RiHome3Fill,
    },
    {
      name: "Estadísticas",
      url: "#",
      icon: RiLineChartFill,
    },
  ],
  courses: [
    {
      title: "Funciones",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Funciones lineales",
          url: "#",
        },
        {
          title: "Funciones cuadráticas",
          url: "#",
        },
        {
          title: "Funciones racionales",
          url: "#",
        },
        {
          title: "Funciones exponenciales",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { username, email } = useContext(UserContext);
  data.user.name = username;
  data.user.email = email;
  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="w-full py-6 flex items-center justify-center bg-fgray-200">
        <img src="/logo/icon.png" alt="Logo Fractal" className="h-5 md:h-6" />
      </div>
      <SidebarContent className="bg-fgray-200">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.courses} />
      </SidebarContent>
      <SidebarFooter className="bg-fgray-200">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
