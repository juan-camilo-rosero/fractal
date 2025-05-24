// @/components/sidebar/SettingsNavigation.jsx
import Link from "next/link";
import {
  PiUserDuotone,
  PiCheckSquareDuotone
} from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsNavigation({ isLoading, userIsAdmin }) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="h-9 w-full rounded-md px-3" />
        {userIsAdmin && <Skeleton className="h-9 w-full rounded-md px-3" />}
      </>
    );
  }
 
  return (
    <>
      <Link href="/dashboard/cuenta" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
        <PiUserDuotone className="h-5 w-5 text-secondary-700" />
        Mi cuenta
      </Link>
      {userIsAdmin && (
        <Link href="/dashboard/validar" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          <PiCheckSquareDuotone className="h-5 w-5 text-secondary-700" />
          Validar documentos
        </Link>
      )}
    </>
  );
}