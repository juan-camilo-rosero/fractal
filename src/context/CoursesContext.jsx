"use client";

import { createContext, useState } from "react";

export const CoursesContext = createContext();

export function CoursesContextProvider(props) {
  const [courses, setCourses] = useState([]);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
      }}
    >
      {props.children}
    </CoursesContext.Provider>
  );
}
