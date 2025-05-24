import { useContext, useEffect } from "react";
import { PiPencilSimpleDuotone, PiEyeDuotone, PiCreditCardDuotone, PiStarDuotone } from "react-icons/pi";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import RatingDialog from "@/components/sections/dashboard/properties/RatingDialog";

const propertyTypes = [
  {
    id: "apartment",
    label: "Apartamento",
    icon: null,
  },
  { id: "house", label: "Casa", icon: null },
  { id: "studio", label: "Apartaestudio", icon: null },
  { id: "local", label: "Local", icon: null },
  {
    id: "office",
    label: "Oficina",
    icon: null,
  },
  {
    id: "medical",
    label: "Consultorio",
    icon: null,
  },
  { id: "roomie", label: "Roomie", icon: null },
];

const PropertyTable = ({ properties }) => {
  const { userType } = useContext(UserContext);

  const formatPrice = (price) => {
    return `$ ${Number(price).toLocaleString("es-CO")}`;
  };

  const getPropertyTypeLabel = (typeId) => {
    const propertyType = propertyTypes.find((type) => type.id === typeId);
    return propertyType ? propertyType.label : typeId;
  };

  const getTypeBadge = (type) => {
    const typeLabel = getPropertyTypeLabel(type);
    return <p>{typeLabel}</p>;
  };

  if (!properties || properties.length === 0) {
    return (
      <div className="w-full">
        <div className="p-6 text-center border rounded-md">
          {userType === "arrendatario" ? "No has arrendado ningún inmueble aún" : "No hay inmuebles para mostrar"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="w-6 p-4 text-left font-medium text-gray-500"></th>
              <th className="p-4 text-left font-medium text-gray-500">
                Dirección
              </th>
              <th className="p-4 text-left font-medium text-gray-500">Tipo</th>
              <th className="p-4 text-left font-medium text-gray-500">
                Precio
              </th>
              <th className="p-4 text-left font-medium text-gray-500">
                Fecha de pago
              </th>
              <th className="w-6 p-4 text-left font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property, index) => (
              <tr key={property.id} className="border-b">
                <td className="p-4 text-center font-medium">
                  {properties.length - index}
                </td>
                <td className="p-4">{property.address}</td>
                <td className="p-4">{getTypeBadge(property.type)}</td>
                <td className="p-4">{formatPrice(property.price)}</td>
                <td className="p-4">
                  {property.paymentDate || "15 de cada mes"}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {userType === "arrendatario" ? (
                      <>
                        <Link
                          href={`/dashboard/pagar-inmueble/${property.id}`}
                          className="h-8 w-8 bg-secondary-500 hover:bg-secondary-700 text-white rounded-sm flex items-center justify-center transition-colors duration-300"
                        >
                          <PiCreditCardDuotone className="h-4 w-4" />
                        </Link>
                        <RatingDialog property={property}>
                          <div className="h-8 w-8 bg-primary-500 hover:bg-primary-700 text-white rounded-sm flex items-center justify-center transition-colors duration-300 cursor-pointer">
                            <PiStarDuotone className="h-4 w-4" />
                          </div>
                        </RatingDialog>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/dashboard/inmuebles/editar/${property.id}`}
                          className="h-8 w-8 bg-primary-500 hover:bg-primary-700 text-white rounded-sm flex items-center justify-center transition-colors duration-300"
                        >
                          <PiPencilSimpleDuotone className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/inmueble/${property.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-8 w-8 bg-secondary-500 hover:bg-secondary-700 text-white rounded-sm flex items-center justify-center transition-colors duration-300"
                        >
                          <PiEyeDuotone className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyTable;