"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useContext, useEffect } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import { MapContext } from "../../context/MapContext";

// Función para formatear el número en formato COP
const formatCOP = (value) => {
  const numberValue = Number(value.replace(/[^0-9]/g, ""));
  return isNaN(numberValue) ? "" : `$${numberValue.toLocaleString("es-CO")}`;
};

// Función para convertir el valor formateado a número
const parsePrice = (formattedPrice) => {
  return Number(formattedPrice.replace(/[^0-9]/g, ""));
};

// Tipos de inmuebles disponibles
const propertyTypes = [
  { id: "all", label: "Ver todos" },
  { id: "apartment", label: "Apartamento" },
  { id: "house", label: "Casa" },
  { id: "studio", label: "Apartaestudio" },
  { id: "local", label: "Local" },
  { id: "office", label: "Oficina" },
  { id: "medical", label: "Consultorio" },
  { id: "roomie", label: "Roomie" },
];

function Filter() {
  const { filters, setFilters } = useContext(MapContext);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  // Inicializar valores del contexto si existen
  useEffect(() => {
    if (filters) {
      if (filters.minPrice) {
        setMinPrice(formatCOP(filters.minPrice.toString()));
      }
      if (filters.maxPrice) {
        setMaxPrice(formatCOP(filters.maxPrice.toString()));
      }
      if (filters.propertyType) {
        setPropertyType(filters.propertyType);
      }
    }
  }, []);

  // Función para aplicar filtros
  const applyFilters = () => {
    const newFilters = {
      minPrice: minPrice ? parsePrice(minPrice) : null,
      maxPrice: maxPrice ? parsePrice(maxPrice) : null,
      propertyType: propertyType === "all" ? null : propertyType,
    };
    
    setFilters(newFilters);
    console.log("Filtros aplicados:", newFilters);
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setPropertyType("all");
    setFilters({
      minPrice: null,
      maxPrice: null,
      propertyType: null,
    });
  };

  // Función para manejar el cambio en el input del precio mínimo
  const handleMinPriceChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^0-9]/g, "");
    
    if (numericValue === "") {
      setMinPrice("");
    } else {
      setMinPrice(formatCOP(numericValue));
    }
  };

  // Función para manejar el cambio en el input del precio máximo
  const handleMaxPriceChange = (e) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^0-9]/g, "");
    
    if (numericValue === "") {
      setMaxPrice("");
    } else {
      setMaxPrice(formatCOP(numericValue));
    }
  };

  // Función para manejar el cambio de tipo de propiedad
  const handlePropertyTypeChange = (value) => {
    setPropertyType(value);
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = minPrice !== "" || maxPrice !== "" || propertyType !== "all";

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-0">
      {/* Botón de filtro para móvil */}
      <div className="flex items-center w-full flex-row gap-4 justify-center lg:hidden">
        <button
          className={`py-2 px-6 w-full justify-center rounded-md flex flex-row gap-3 items-center transition-all ${
            hasActiveFilters 
              ? "bg-secondary-500 text-third-200" 
              : "bg-third-300 text-primary-500"
          }`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <p className="text-lg font-semibold">
            {hasActiveFilters ? "Filtros activos" : "Filtrar"}
          </p>
          <RiFilter3Fill className="text-xl" />
        </button>
      </div>

      {/* Contenedor de filtros */}
      <div className={`w-full flex-col gap-4 ${filterOpen ? "flex" : "hidden lg:flex"} ${filterOpen ? "mb-6" : ""}`}>
        
        {/* Contenedor de los filtros (precio y tipo) */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 w-full">
          {/* Filtro de precio */}
          <div className="flex flex-col lg:min-w-0 lg:flex-shrink-0">
            <label className="text-base lg:text-sm font-semibold mb-2 text-gray-700">Rango de precio:</label>
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="text-sm lg:text-base font-semibold bg-third-300 rounded-lg py-2 px-2 border-2 border-transparent outline-none w-full lg:w-28 text-center focus:border-primary-500 transition-all placeholder:text-gray-500"
                placeholder="$Min"
              />
              <span className="text-lg font-bold text-gray-600 flex-shrink-0">-</span>
              <input
                type="text"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="text-sm lg:text-base font-semibold bg-third-300 rounded-lg py-2 px-2 border-2 border-transparent outline-none w-full lg:w-28 text-center focus:border-primary-500 transition-all placeholder:text-gray-500"
                placeholder="$Max"
              />
            </div>
          </div>

          {/* Filtro de tipo de inmueble */}
          <div className="flex flex-col lg:min-w-0 lg:flex-shrink-0">
            <label className="text-base lg:text-sm font-semibold mb-2 text-gray-700">Tipo de inmueble:</label>
            <Select value={propertyType} onValueChange={handlePropertyTypeChange}>
              <SelectTrigger className="px-3 gap-2 bg-third-300 text-primary-500 text-sm lg:text-base font-semibold py-2 border-2 border-transparent outline-none w-full lg:w-40 flex items-center justify-between focus:border-primary-500 transition-all">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-third-200 border border-third-400">
                {propertyTypes.map((type) => (
                  <SelectItem 
                    key={type.id} 
                    value={type.id} 
                    className="cursor-pointer text-sm lg:text-base hover:bg-third-300 focus:bg-third-300"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Botones de acción - ahora en una fila separada */}
        <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-auto">
          <button
            onClick={applyFilters}
            className="py-2 px-4 bg-secondary-500 text-third-200 font-semibold text-sm lg:text-base rounded-lg transition-all hover:bg-secondary-700 cursor-pointer whitespace-nowrap"
          >
            Aplicar
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="py-2 px-4 bg-gray-400 text-white font-semibold text-sm lg:text-base rounded-lg transition-all hover:bg-gray-600 cursor-pointer whitespace-nowrap"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Indicador de filtros activos - ahora aparece debajo de los filtros */}
        {hasActiveFilters && (
          <div className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-secondary-100 border border-secondary-500 rounded-lg w-full lg:w-auto">
            <span className="text-sm font-medium text-secondary-700 text-center lg:text-left">
              <strong>Filtros activos:</strong> {[
                minPrice && `Min: ${minPrice}`,
                maxPrice && `Max: ${maxPrice}`,
                propertyType !== "all" && propertyTypes.find(t => t.id === propertyType)?.label
              ].filter(Boolean).join(" • ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;