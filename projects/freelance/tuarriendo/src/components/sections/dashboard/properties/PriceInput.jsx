"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiMoneyDuotone } from "react-icons/pi";

function PriceInput({ rent, setRent }) {
  const [formattedValue, setFormattedValue] = useState("");

  // Actualiza el valor formateado cuando cambia el valor numérico
  useEffect(() => {
    if (rent === "" || rent === 0) {
      setFormattedValue("");
    } else {
      setFormattedValue(formatCurrency(rent));
    }
  }, [rent]);

  // Función para formatear el valor a formato de moneda colombiana
  const formatCurrency = (value) => {
    if (!value) return "";
    const numberString = Math.floor(value).toString();
    let formattedNumber = "";
    
    for (let i = 0; i < numberString.length; i++) {
      if (i > 0 && (numberString.length - i) % 3 === 0) {
        formattedNumber += ".";
      }
      formattedNumber += numberString[i];
    }
    
    return `$${formattedNumber}`;
  };

  // Función para extraer sólo los dígitos de un string
  const extractNumbers = (str) => {
    return str.replace(/[^\d]/g, "");
  };

  const handleChange = (e) => {
    // Obtenemos sólo los números del valor ingresado
    const inputValue = extractNumbers(e.target.value);
    const numericValue = inputValue === "" ? "" : parseFloat(inputValue);
    
    // Actualizamos el valor real (sin formato)
    setRent(numericValue);
    
    // El formato visual se actualiza automáticamente a través del useEffect
  };

  const handleBlur = () => {
    if (rent === "" || isNaN(parseFloat(rent))) {
      setRent(0);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="price" className="text-xl font-semibold">
        Precio
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purpus-blue-500 pointer-events-none z-10">
          <PiMoneyDuotone size={20} />
        </div>
        <Input
          id="price"
          type="text" // Cambiado de "number" a "text" para permitir caracteres especiales de formato
          className="w-full pl-10 py-3 !h-auto"
          placeholder="Ingresa el valor mensual"
          value={formattedValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

export default PriceInput;