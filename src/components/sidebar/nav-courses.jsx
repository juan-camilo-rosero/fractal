"use client";

import { ChevronRight } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useContext } from "react";
import { CoursesContext } from "@/context/CoursesContext";

export function NavProjects() {
  const { isMobile } = useSidebar();
  const courses = useContext(CoursesContext)

  const coursesData = Object.keys(courses).map(key => courses[key])

  console.log(coursesData);
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-lg">My courses</SidebarGroupLabel>
      <SidebarMenu>
        {coursesData[0].map((item, index) => (
          <Collapsible
            key={index}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.name} className="text-base mt-2">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span className="text-base">{item.name}</span>
                  <ChevronRight className="ml-auto w-5 h-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.lessons?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.name}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className="text-base">{subItem.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
