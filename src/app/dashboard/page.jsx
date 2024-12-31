"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserContextProvider, UserContext } from "@/context/UserContext";
import {
  CoursesContextProvider,
  CoursesContext,
} from "@/context/CoursesContext";
import Courses from "@/components/dashboard/Courses";
import { isUserLoggedIn } from "@/lib/auth_functions";
import { useContext, useEffect, useState } from "react";
import { getDocument } from "@/lib/db_functions";

const findUser = async () => {
  try {
    const res = await isUserLoggedIn();
    return res;
  } catch (error) {
    console.error("Error checking user login status:", error);
    return null;
  }
};

const getUser = async (email) => {
  try {
    const res = await getDocument("users", email);
    return res;
  } catch (err) {
    console.error("An error has ocurred: " + err);
    return null;
  }
};

const getCourses = async (email) => {
  try {
    const res = await getDocument("courses", email);
    return res;
  } catch (err) {
    console.error("An error has ocurred: " + err);
    return null;
  }
};

const getProgress = async (email) => {
  try {
    const res = await getDocument("progress", email);
    return res;
  } catch (err) {
    console.error("An error has ocurred: " + err);
    return null;
  }
};

function PageContent() {
  const {
    setEmail,
    setPhone,
    setUsername,
    setLastName,
    setFreeTime,
    setPreparation,
    setExamDate,
    setExam,
    setSchool,
    setProfilePic,
  } = useContext(UserContext);
  const {setCourses} = useContext(CoursesContext)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await findUser();
      if (!res) {
        window.location.href = "/";
        return;
      }
      setUser(res);
      setEmail(res.email);

      const userData = await getUser(res.email);
      const coursesData = await getCourses(res.email);
      const progressData = await getProgress(res.email);

      setPhone(userData.phone);
      setUsername(userData.username);
      setLastName(userData.lastName);
      setFreeTime(userData.freeTime);
      setPreparation(userData.preparation);
      setExam(userData.exam);
      setExamDate(userData.examDate);
      setSchool(userData.school);
      setProfilePic(userData.profilePic);

      const coursesContent = Object.keys(coursesData).map(
        (key) => coursesData[key]
      );

      setCourses(coursesContent)
  
    };

    checkUser();
  }, [setEmail]);

  // Evitar renderizar contenido si `user` aún es nulo
  if (user === null) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}

export default function Page() {
  return (
    <UserContextProvider>
      <CoursesContextProvider>
        <PageContent />
      </CoursesContextProvider>
    </UserContextProvider>
  );
}
