// @/components/sidebar/MainNavigation.jsx
import Link from "next/link";
import {
  PiHouseDuotone,
  PiBuildingsDuotone,
  PiFileTextDuotone,
  PiCaretDownDuotone,
  PiCaretRightDuotone,
  PiUserCircleGearDuotone,
} from "react-icons/pi";
import { CreditCard, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function MainNavigation({
  isLoading,
  isInmueblesOpen,
  setIsInmueblesOpen,
  properties,
  userIsAdmin,
  userIsTenant,
}) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-9 w-full rounded-md px-3" />
        <Skeleton className="h-9 w-full rounded-md px-3" />
        <Skeleton className="h-9 w-full rounded-md px-3" />
        {userIsTenant && (
          <>
            <div className="py-2">
              <Skeleton className="h-4 w-24" />
              <div className="grid gap-1 pt-1">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <PiHouseDuotone className="h-5 w-5 text-primary-700" />
        Inicio
      </Link>
      
      {userIsAdmin && (
        <Link
          href="/dashboard/admin"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          <PiUserCircleGearDuotone className="h-5 w-5 text-primary-700" />
          Panel de administrador
        </Link>
      )}
      
      <Collapsible open={isInmueblesOpen} onOpenChange={setIsInmueblesOpen}>
        <CollapsibleTrigger className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          <PiBuildingsDuotone className="h-5 w-5 text-primary-700" />
          Mis inmuebles
          {isInmueblesOpen ? (
            <PiCaretDownDuotone className="ml-auto h-5 w-5 text-primary-700" />
          ) : (
            <PiCaretRightDuotone className="ml-auto h-5 w-5 text-primary-700" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-7 border-l pl-2 mt-1">
            {properties.map((property) => (
              <Link
                key={property.id}
                href={`/dashboard/inmuebles/editar/${property.id}`}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {property.address}
              </Link>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Link
        href="/dashboard/documentos"
        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        <PiFileTextDuotone className="h-5 w-5 text-primary-700" />
        Mis documentos
      </Link>

      {userIsTenant && (
        <div>
          <div className="grid">
            <Link
              href="/pagar-arriendo"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <CreditCard className="h-4 w-4 text-primary-700" />
              Pagar Arriendo
            </Link>
            <Link
              href="/calificar-inmuebles"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Star className="h-4 w-4 text-primary-700" />
              Calificar Inmuebles
            </Link>
          </div>
        </div>
      )}
    </>
  );
}