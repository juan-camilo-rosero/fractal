"use client";

import { UserContextProvider, UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import Button from "@/components/general/Button";
import FormInput from "@/components/general/FormInput";
import FormSelection from "@/components/general/FormSelection";

function PageContent() {
  const [section, setSection] = useState(0);
  const {
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
  } = useContext(UserContext);

  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-fgray-100">
      {section === 0 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-3/4 lg:w-1/2">
          <h1 className="text-center text-3xl font-bold text-fblue-700  lg:text-5xl">
            Welcome to <span className="text-fred-700">Fractal</span>
          </h1>
          <h2 className="text-fgray-600 text-center mt-10 font-semibold md:text-xl">
            Before we get started, we'd love to get to know you a little bit so
            we can tailor the content to your unique needs.
          </h2>
          <Button
            text="Continue"
            type="primary"
            size="xl"
            func={(e) => setSection(1)}
            aditionalStyles="w-full lg:w-auto lg:text-xl lg:px-16 mt-14"
          />
        </section>
      )}
      {section === 1 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-1/2 lg:w-2/3">
          <div className="w-full flex flex-col items-center pt-8 gap-6 lg:gap-10">
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
              <FormInput
                labelText="Name"
                value={username}
                setValue={setUsername}
                placeholder=""
                type="text"
              />
              <FormInput
                labelText="Last name"
                value={lastName}
                setValue={setLastName}
                type="text"
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
              <FormInput
                labelText="Phone number"
                value={phone}
                setValue={setPhone}
                type="tel"
              />
              <FormSelection
                labelText="School"
                value={school}
                setValue={setSchool}
                id="school"
                options={[
                  {
                    value: "cambridge_school",
                    label: "Cambridge School",
                  },
                  {
                    value: "oxford_school",
                    label: "Oxford School",
                  },
                  {
                    value: "harvard_school",
                    label: "Harvard School",
                  },
                  {
                    value: "purdue_school",
                    label: "Purdue School",
                  },
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row-reverse lg:gap-10 lg:mt-6 lg:justify-start">
              <Button
                text="continue"
                type="primary"
                size="xl"
                func={(e) => setSection(2)}
                aditionalStyles={`w-full py-3 mt-12 transition-all lg:w-auto lg:px-16 lg:py-2 lg:mt-0`}
              />
              <Button
                text="return"
                type="secondary"
                size="xl"
                func={(e) => setSection(0)}
                aditionalStyles={`w-full py-3 mt-2 lg:mt-0 transition-all lg:w-auto lg:px-16 lg:py-2`}
              />
            </div>
          </div>
        </section>
      )}
      {section === 2 && (
        <section className="w-full h-full flex flex-col items-center justify-center p-5 md:w-1/2 lg:w-2/3">
          <div className="w-full flex flex-col items-center pt-8 gap-6 lg:gap-10">
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
            <FormSelection
                labelText="What exam will you present?"
                value={exam}
                setValue={setExam}
                id="exam"
                options={[
                  {
                    value: "icfes",
                    label: "ICFES",
                  },
                  {
                    value: "unal",
                    label: "UNAL",
                  },
                ]}
              />
            <FormSelection
                labelText="When will you present it?"
                value={examDate}
                setValue={setExamDate}
                id="exam"
                options={[
                  {
                    value: "2025-1",
                    label: "2025-1",
                  },
                  {
                    value: "2025-2",
                    label: "2025-2",
                  },
                  {
                    value: "2026-1",
                    label: "2026-1",
                  },
                  {
                    value: "2026-2",
                    label: "2026-2",
                  },
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row lg:gap-24">
            <FormSelection
                labelText="How prepared do you feel?"
                value={preparation}
                setValue={setPreparation}
                id="exam"
                options={[
                  {
                    value: "nothing",
                    label: "Nothing at all :(",
                  },
                  {
                    value: "more_or_less",
                    label: "More or less",
                  },
                  {
                    value: "prepared",
                    label: "Prepared :D",
                  },
                ]}
              />
            <FormSelection
                labelText="How much free time do you have?"
                value={freeTime}
                setValue={setFreeTime}
                id="exam"
                options={[
                  {
                    value: "few",
                    label: "Few time :(",
                  },
                  {
                    value: "more_or_less",
                    label: "More or less",
                  },
                  {
                    value: "lot",
                    label: "A lot of time",
                  },
                ]}
              />
              
            </div>
            <div className="w-full flex flex-col gap-6 lg:flex-row-reverse lg:gap-10 lg:mt-6 lg:justify-start">
              <Button
                text="continue"
                type="primary"
                size="xl"
                func={(e) => setSection(2)}
                aditionalStyles={`w-full py-3 mt-12 transition-all lg:w-auto lg:px-16 lg:py-2 lg:mt-0`}
              />
              <Button
                text="return"
                type="secondary"
                size="xl"
                func={(e) => setSection(0)}
                aditionalStyles={`w-full py-3 mt-2 lg:mt-0 transition-all lg:w-auto lg:px-16 lg:py-2`}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <UserContextProvider>
      <PageContent />
    </UserContextProvider>
  );
}
