"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiRulerDuotone } from "react-icons/pi";

function AreaInput({ squareMeters, setSquareMeters }) {
  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setSquareMeters(value);
    } else if (e.target.value === "") {
      setSquareMeters("");
    }
  };

  const handleBlur = () => {
    if (squareMeters === "" || isNaN(parseFloat(squareMeters))) {
      setSquareMeters(0);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="area" className="text-xl font-semibold">
        Área (m²)
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
          <PiRulerDuotone size={20} />
        </div>
        <Input
          id="area"
          type="number"
          min="0"
          step="0.1"
          className="w-full pl-10 py-3 !h-auto"
          placeholder="Metros cuadrados"
          value={squareMeters}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default AreaInput;