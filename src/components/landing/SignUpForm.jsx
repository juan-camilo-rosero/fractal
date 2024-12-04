"use client";
import { RiCloseCircleFill, RiLock2Fill, RiMailFill } from "react-icons/ri";
import FormInput from "./FormInput";
import Button from "../general/Button";
import { useContext, useState } from "react";
import { SectionContext } from "@/context/SectionContext";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSignUpOpen } = useContext(SectionContext);
  return (
    <div className="w-[90vw] md:w-[50vw] lg:w-[30vw] max-h-[90%] bg-fgray-200 rounded-xl min-h-[60%] p-8" onClick={e => e.stopPropagation()}>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-fblue-700">
          Create an account
        </h2>
        <RiCloseCircleFill
          className="text-3xl text-fblue-700 relative cursor-pointer"
          onClick={(e) => setSignUpOpen(false)}
        />
      </div>
      <div className="w-full flex flex-col items-center py-8 gap-6">
        <FormInput
          labelText="email"
          value={email}
          setValue={setEmail}
          placeholder="yourmail@gmail.com"
          icon={<RiMailFill />}
          type="text"
        />
        <FormInput
          labelText="password"
          value={password}
          setValue={setPassword}
          icon={<RiLock2Fill />}
          type="password"
        />
        <Button
          text="continue"
          type="primary"
          size="xl"
          func={(e) => console.log("Iniciando sesión")}
          aditionalStyles="w-full py-3 mt-4"
        />
      </div>
    </div>
  );
}

export default SignUpForm;
