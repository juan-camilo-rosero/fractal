"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [email, setEmail] = useState("juroseros@unal.edu.co");
  const [username, setUsername] = useState("Juan Camilo");
  const [lastName, setLastName] = useState(undefined);
  const [exam, setExam] = useState(undefined);
  const [examDate, setExamDate] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [profilePic, setProfilePic] = useState(undefined);
  const [school, setSchool] = useState(undefined);
  const [freeTime, setFreeTime] = useState(undefined);
  const [preparation, setPreparation] = useState(undefined);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        lastName,
        setLastName,
        exam,
        setExam,
        phone,
        setPhone,
        profilePic,
        setProfilePic,
        school,
        setSchool,
        freeTime,
        setFreeTime,
        preparation,
        setPreparation,
        examDate,
        setExamDate,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
