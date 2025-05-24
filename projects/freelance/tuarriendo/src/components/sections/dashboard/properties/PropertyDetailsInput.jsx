"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PiToiletDuotone, 
  PiBedDuotone, 
  PiCarDuotone, 
  PiCalendarDuotone 
} from "react-icons/pi";

function PropertyDetailsInput({ 
  bathrooms, 
  setBathrooms, 
  rooms, 
  setRooms, 
  parkingSlots, 
  setParkingSlots, 
  age, 
  setAge 
}) {
  const handleBathroomsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setBathrooms(value);
    } else if (e.target.value === "") {
      setBathrooms("");
    }
  };

  const handleBathroomsBlur = () => {
    if (bathrooms === "" || isNaN(parseInt(bathrooms))) {
      setBathrooms(0);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="bathrooms" className="font-semibold">
          Baños
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
            <PiToiletDuotone size={20} />
          </div>
          <Input
            id="bathrooms"
            type="number"
            min="0"
            className="w-full pl-10 py-3 !h-auto"
            value={bathrooms}
            onChange={handleBathroomsChange}
            onBlur={handleBathroomsBlur}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rooms" className="font-semibold">
          Habitaciones
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
            <PiBedDuotone size={20} />
          </div>
          <Input
            id="rooms"
            type="number"
            min="0"
            className="w-full pl-10 py-3 !h-auto"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parking" className="font-semibold">
          Parqueaderos
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
            <PiCarDuotone size={20} />
          </div>
          <Input
            id="parking"
            type="number"
            min="0"
            className="w-full pl-10 py-3 !h-auto"
            placeholder="0"
            value={parkingSlots}
            onChange={(e) => setParkingSlots(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="years" className="font-semibold">
          Años
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
            <PiCalendarDuotone size={20} />
          </div>
          <Input
            id="years"
            type="number"
            min="0"
            className="w-full pl-10 py-3 !h-auto"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsInput;