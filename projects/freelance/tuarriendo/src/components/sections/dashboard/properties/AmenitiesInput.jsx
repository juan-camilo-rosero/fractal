"use client";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { PiListChecksDuotone } from "react-icons/pi";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function AmenitiesInput({ details, setDetails }) {
  const [open, setOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);

  const amenities = [
    { value: "pool", label: "Piscina" },
    { value: "gym", label: "Gimnasio" },
    { value: "parking", label: "Estacionamiento" },
    { value: "security", label: "Seguridad 24/7" },
    { value: "pet_friendly", label: "Admite mascotas" },
    { value: "furnished", label: "Amoblado" },
    { value: "balcony", label: "Balcón" },
    { value: "garden", label: "Jardín" },
    { value: "bbq", label: "Zona de BBQ" },
    { value: "playground", label: "Área de juegos" },
    { value: "laundry", label: "Lavandería" },
    { value: "elevator", label: "Ascensor" },
    { value: "storage", label: "Bodega" },
  ];

  useEffect(() => {
    if (details && details.length > 0) {
      setSelectedDetails(details);
    }
  }, []);

  const handleDetailsSelection = (value) => {
    let newSelectedDetails;
    
    if (selectedDetails.includes(value)) {
      newSelectedDetails = selectedDetails.filter((item) => item !== value);
    } else {
      newSelectedDetails = [...selectedDetails, value];
    }
    
    setSelectedDetails(newSelectedDetails);
    setDetails(newSelectedDetails);
  };

  return (
    <div className="space-y-4">
      <Label className="text-xl font-semibold">Comodidades</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between pl-10 relative text-left"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
              <PiListChecksDuotone size={20} />
            </div>
            {selectedDetails.length > 0
              ? `${selectedDetails.length} comodidades seleccionadas`
              : "Selecciona las comodidades"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar comodidades..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {amenities.map((amenity) => (
                  <CommandItem
                    key={amenity.value}
                    onSelect={() => handleDetailsSelection(amenity.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedDetails.includes(amenity.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {amenity.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default AmenitiesInput;