"use client";
import { createContext, useState } from "react";

const dummyUser = {
  name: "Nombre de ejemplo",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(dummyUser);
  const [id, setId] = useState(undefined);
  const [number, setNumber] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [role, setRole] = useState(undefined);
  const [permission, setPermission] = useState(undefined);
  const [paid, setPaid] = useState(true);
  const [properties, setProperties] = useState([]);
  const [lessedProperties, setLessedProperties] = useState([]);
  const [userType, setUserType] = useState("");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        id,
        setId,
        number,
        setNumber,
        name,
        setName,
        email,
        setEmail,
        role,
        setRole,
        permission,
        setPermission,
        paid,
        setPaid,
        properties,
        setProperties,
        lessedProperties,
        setLessedProperties,
        userType,
        setUserType,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
