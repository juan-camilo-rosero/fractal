// @/components/sidebar/UserProfile.jsx
import Link from "next/link";
import {
  PiUserDuotone,
  PiSignOutDuotone,
  PiCaretDownDuotone,
} from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth_functions.js";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";

export default function UserProfile({ isLoading }) {
  const userContext = useContext(UserContext)
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32 mt-1" />
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {userContext.name ? userContext.name.charAt(0).toUpperCase() : "CN"}
          </div>
          <div>
            <div className="text-sm font-medium">
              {userContext.name || "Usuario"}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {userContext.email || "usuario@ejemplo.com"}
            </div>
          </div>
          <PiCaretDownDuotone className="h-4 w-4 text-primary-700" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/cuenta" className="flex items-center">
            <PiUserDuotone className="mr-2 h-4 w-4 text-primary-700" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="flex items-center">
          <PiSignOutDuotone className="mr-2 h-4 w-4 text-primary-700" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
