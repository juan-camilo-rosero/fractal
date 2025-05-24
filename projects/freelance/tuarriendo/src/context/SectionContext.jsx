"use client";
import { createContext, useState } from "react";

export const SectionContext = createContext();

export function SectionContextProvider(props) {
  const [section, setSection] = useState("properties");
  const [createPropertyOpen, setCreatePropertyOpen] = useState(false);

  return (
    <SectionContext.Provider
      value={{
        section,
        setSection,
        createPropertyOpen,
        setCreatePropertyOpen,
      }}
    >
      {props.children}
    </SectionContext.Provider>
  );
}
