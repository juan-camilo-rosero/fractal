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
import {
  RiCalculatorLine,
  RiLeafFill,
  RiTimeFill,
  RiBookReadLine,
} from "react-icons/ri";

const getIcon = (type) => {
  switch (type) {
    case "math":
      return <RiCalculatorLine />;
    case "science":
      return <RiLeafFill />;
    case "history":
      return <RiTimeFill />;
    case "literature":
      return <RiBookReadLine />;
    case "social-studies":
      return <RiTimeFill />;
    case "languages":
      return <RiBookReadLine />;
    default:
      return <RiCalculatorLine />;
  }
};

export function NavProjects() {
  const { isMobile } = useSidebar();
  const courses = useContext(CoursesContext);

  const coursesData = Object.keys(courses).map((key) => courses[key]);
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-lg">My courses</SidebarGroupLabel>
      <SidebarMenu>
        {coursesData[0].map((course, index) => (
          <Collapsible
            key={index}
            asChild
            defaultOpen={course.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={course.name} className="text-base mt-2">
                  {course.type && getIcon(course.type)}
                  <span className="text-base">{course.name}</span>
                  <ChevronRight className="ml-auto w-5 h-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {course.lessons?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className="text-base">{subItem.title}</span>
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
