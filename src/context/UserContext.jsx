"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [exam, setExam] = useState("");
  const [examDate, setExamDate] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [school, setSchool] = useState("");
  const [freeTime, setFreeTime] = useState("");
  const [preparation, setPreparation] = useState("");

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
