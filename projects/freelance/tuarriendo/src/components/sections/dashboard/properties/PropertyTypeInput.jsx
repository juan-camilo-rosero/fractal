"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  PiHouseDuotone,
  PiBuildingsDuotone,
  PiBuildingOfficeDuotone,
  PiWarehouseDuotone,
  PiDoorDuotone,
  PiBedDuotone,
} from "react-icons/pi";

function PropertyTypeInput({ type, setType }) {
  const propertyTypes = [
    {
      id: "apartment",
      label: "Apartamento",
      icon: <PiBuildingsDuotone size={36} />,
    },
    { id: "house", label: "Casa", icon: <PiHouseDuotone size={36} /> },
    { id: "studio", label: "Apartaestudio", icon: <PiDoorDuotone size={36} /> },
    { id: "local", label: "Local", icon: <PiWarehouseDuotone size={36} /> },
    {
      id: "office",
      label: "Oficina",
      icon: <PiBuildingOfficeDuotone size={36} />,
    },
    {
      id: "medical",
      label: "Consultorio",
      icon: <PiBuildingOfficeDuotone size={36} />,
    },
    { id: "roomie", label: "Roomie", icon: <PiBedDuotone size={36} /> },
  ];

  return (
    <div className="space-y-4">
      <Label className="text-xl font-semibold">Tipo de inmueble</Label>
      <RadioGroup
        value={type}
        onValueChange={setType}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {propertyTypes.map((propertyType) => (
          <div
            key={propertyType.id}
            className={`relative border rounded-lg p-4 cursor-pointer shadow-none ${
              type === propertyType.id
                ? "bg-blue-100 text-purpus-blue-700 border-purpus-blue-400"
                : "border-gray-300"
            }`}
          >
            <RadioGroupItem
              value={propertyType.id}
              id={propertyType.id}
              className="absolute top-4 right-4"
            />
            <Label
              htmlFor={propertyType.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center text-purpus-blue-500 flex-shrink-0">
                {propertyType.icon}
              </div>
              <span className="font-medium">{propertyType.label}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default PropertyTypeInput;