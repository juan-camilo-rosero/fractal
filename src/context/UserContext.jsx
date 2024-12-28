"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [username, setUsername] = useState("Juan Camilo");
  const [email, setEmail] = useState("juroseros@unal.edu.co");

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
