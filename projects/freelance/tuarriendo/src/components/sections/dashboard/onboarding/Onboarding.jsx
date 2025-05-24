"use client";
import { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PiUserDuotone,
  PiIdentificationCardDuotone,
  PiPhoneDuotone,
  PiUserCheckDuotone,
  PiHouseDuotone,
  PiBuildingsDuotone,
  PiUserFocusDuotone,
} from "react-icons/pi";
import { UserContext } from "@/context/UserContext";
import { createUser } from "@/lib/db_functions";
import { useRouter } from "next/navigation";
import TermsAndConditions from "./TermsAndConditions";

function Onboarding() {
  const { user } = useContext(UserContext);
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [errors, setErrors] = useState({
    userType: "",
    name: "",
    idNumber: "",
    phone: "",
    terms: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleConfirm = async () => {
    setLoading(true);
    const newErrors = {
      userType: !userType ? "Por favor selecciona un tipo de usuario" : "",
      name: !name.trim() ? "Por favor ingresa tu nombre" : "",
      idNumber: !idNumber.trim() ? "Por favor ingresa tu cédula" : "",
      phone: !phone.trim() ? "Por favor ingresa tu número de teléfono" : "",
      terms: !acceptedTerms ? "Debes aceptar los términos y condiciones" : "",
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      const userData = {
        email: user.email,
        hasPermission: true,
        name: name,
        properties: [],
        lessedProperties: [],
        role: userType,
        phone: phone,
        idNumber: idNumber,
        missingProperties: 2,
      };

      try {
        const res = await createUser(userData);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleTermsLinkClick = (e) => {
    e.preventDefault();
    setShowTermsDialog(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 mt-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center w-full lg:text-left lg:mb-8">
        Bienvenido a <span className="text-secondary-700">tu</span>
        <span className="text-primary-700">arriendo</span>
      </h2>

      <div className="w-full">
        <div className="lg:hidden space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">¿Cuál es tu rol?</h3>
            <RadioGroup
              value={userType}
              onValueChange={setUserType}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "tenant"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="tenant"
                    id="tenant-mobile"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="tenant-mobile"
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiUserCheckDuotone size={36} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Arrendatario</span>
                      <p className="text-xs text-gray-500">
                        Estoy buscando un inmueble para arrendar
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "landlord"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="landlord"
                    id="landlord-mobile"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="landlord-mobile"
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiHouseDuotone size={36} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Arrendador</span>
                      <p className="text-xs text-gray-500">
                        Quiero poner mi inmueble en renta
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "agent"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="agent"
                    id="agent-mobile"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="agent-mobile"
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiUserFocusDuotone size={36} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Agente Inmobiliario</span>
                      <p className="text-xs text-gray-500">
                        Soy un agente independiente
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "agency"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="agency"
                    id="agency-mobile"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="agency-mobile"
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiBuildingsDuotone size={36} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Inmobiliaria</span>
                      <p className="text-xs text-gray-500">
                        Represento a una empresa inmobiliaria
                      </p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
            )}
          </div>

          {/* Input Fields - Bottom on mobile */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="name-mobile" className="text-xl font-semibold">
                Nombre completo
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none z-10">
                  <PiUserDuotone className="text-secondary-700" />
                </div>
                <input
                  id="name-mobile"
                  className="w-full pl-10 py-4 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa tu nombre completo"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label
                htmlFor="idNumber-mobile"
                className="text-xl font-semibold"
              >
                Número de cédula
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none z-10">
                  <PiIdentificationCardDuotone className="text-secondary-700" />
                </div>
                <input
                  id="idNumber-mobile"
                  className="w-full pl-10 py-4 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Ingresa tu número de cédula"
                />
              </div>
              {errors.idNumber && (
                <p className="text-red-500 text-sm">{errors.idNumber}</p>
              )}
            </div>

            <div className="space-y-4">
              <Label htmlFor="phone-mobile" className="text-xl font-semibold">
                Teléfono
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none z-10">
                  <PiPhoneDuotone className="text-secondary-700" />
                </div>
                <input
                  id="phone-mobile"
                  className="w-full pl-10 py-4 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ingresa tu número de teléfono"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Terms and Conditions Checkbox - Mobile */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms-mobile"
                  checked={acceptedTerms}
                  onCheckedChange={setAcceptedTerms}
                  className="mt-1"
                />
                <Label htmlFor="terms-mobile" className="text-sm leading-5">
                  Acepto los{" "}
                  <button
                    onClick={handleTermsLinkClick}
                    className="text-primary-700 hover:text-primary-800 underline"
                  >
                    términos y condiciones
                  </button>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms}</p>
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={handleConfirm}
                className="dashboard-primary-button w-full py-2 rounded-md shadow-none bg-primary-700 text-white hover:bg-primary-800 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:flex lg:gap-8">
          {/* Input Fields - Left side on desktop */}
          <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="name" className="text-xl font-semibold">
                  Nombre completo
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none z-10">
                    <PiUserDuotone className="text-secondary-700" />
                  </div>
                  <input
                    id="name"
                    className="w-full pl-10 py-4 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="idNumber" className="text-xl font-semibold">
                  Número de cédula
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none z-10">
                    <PiIdentificationCardDuotone className="text-secondary-700" />
                  </div>
                  <input
                    id="idNumber"
                    className="w-full pl-10 py-4 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="Ingresa tu número de cédula"
                  />
                </div>
                {errors.idNumber && (
                  <p className="text-red-500 text-sm">{errors.idNumber}</p>
                )}
              </div>

              <div className="space-y-4">
                <Label htmlFor="phone" className="text-xl font-semibold">
                  Teléfono
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-600 pointer-events-none z-10">
                    <PiPhoneDuotone className="text-secondary-700" />
                  </div>
                  <input
                    id="phone"
                    className="w-full pl-10 py-4 rounded-md border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ingresa tu número de teléfono"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Terms and Conditions Checkbox - Desktop */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms-desktop"
                    checked={acceptedTerms}
                    onCheckedChange={setAcceptedTerms}
                    className="mt-1"
                  />
                  <Label htmlFor="terms-desktop" className="text-sm leading-5">
                    Acepto los{" "}
                    <button
                      onClick={handleTermsLinkClick}
                      className="text-primary-700 hover:text-primary-800 underline"
                    >
                      términos y condiciones
                    </button>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm">{errors.terms}</p>
                )}
              </div>

              {/* Botón de confirmar movido directamente debajo del checkbox en desktop */}
              <div className="mt-4">
                <button
                  onClick={handleConfirm}
                  className="dashboard-primary-button w-auto py-2 px-6 rounded-md shadow-none bg-primary-700 text-white hover:bg-primary-800 transition-colors duration-300"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Confirmar"}
                </button>
              </div>
            </div>
          </div>

          {/* User Type Selection - Right side on desktop */}
          <div className="lg:w-1/2 space-y-4">
            <h3 className="text-xl font-semibold">¿Cuál es tu rol?</h3>
            <RadioGroup
              value={userType}
              onValueChange={setUserType}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "arrendatario"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="arrendatario"
                    id="arrendatario"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="arrendatario"
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiUserCheckDuotone size={36} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Arrendatario</span>
                      <p className="text-sm text-gray-500">
                        Estoy buscando un inmueble para arrendar
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "propietario"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="propietario"
                    id="propietario"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="propietario"
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiHouseDuotone size={36} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Propietario</span>
                      <p className="text-sm text-gray-500">
                        Quiero poner mi inmueble en renta
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "agente inmobiliario"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="agente inmobiliario"
                    id="agente inmobiliario"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="agente inmobiliario"
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiUserFocusDuotone size={36} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Agente Inmobiliario</span>
                      <p className="text-sm text-gray-500">
                        Soy un agente independiente
                      </p>
                    </div>
                  </Label>
                </div>

                <div
                  className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
                    userType === "inmobiliaria"
                      ? "bg-third-200 text-primary-700 border-primary-400"
                      : "border-third-400"
                  }`}
                >
                  <RadioGroupItem
                    value="inmobiliaria"
                    id="inmobiliaria"
                    className="absolute top-4 right-4"
                  />
                  <Label
                    htmlFor="inmobiliaria"
                    className="flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-primary-500 flex-shrink-0">
                      <PiBuildingsDuotone size={36} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Inmobiliaria</span>
                      <p className="text-sm text-gray-500">
                        Represento a una empresa inmobiliaria
                      </p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
            )}
          </div>
        </div>
      </div>

      {/* Terms and Conditions Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Términos y Condiciones</DialogTitle>
          </DialogHeader>
          <TermsAndConditions />
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowTermsDialog(false)}
              className="px-4 py-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Onboarding;