"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiMedalDuotone } from "react-icons/pi";


function StrataInput({ strata, setStrata }) {
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < 1) setStrata(1);
      else if (value > 6) setStrata(6);
      else setStrata(value);
    } else {
      setStrata("");
    }
  };

  const handleBlur = () => {
    if (strata === "" || isNaN(parseInt(strata))) {
      setStrata(1);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="strata" className="text-xl font-semibold">
        Estrato
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
          <PiMedalDuotone size={20} />
        </div>
        <Input
          id="strata"
          type="number"
          min="1"
          max="6"
          className="w-full pl-10 py-3 !h-auto"
          placeholder="Ingresa el estrato (1-6)"
          value={strata}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default StrataInput;