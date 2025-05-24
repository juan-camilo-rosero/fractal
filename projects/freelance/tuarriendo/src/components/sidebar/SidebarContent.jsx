// @/components/sidebar/SidebarContent.jsx
import Link from "next/link";
import Logo from "@/components/sidebar/Logo";
import MainNavigation from "@/components/sidebar/MainNavigation";
import SettingsNavigation from "@/components/sidebar/SettingsNavigation";
import UserProfile from "@/components/sidebar/UserProfile";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarContent({
  isLoading = false,
  isInmueblesOpen,
  setIsInmueblesOpen,
  userContext,
  properties,
  userIsAdmin = false,
  userIsTenant = false
}) {
  return (
    <div className="flex h-full flex-col">
      <Logo />
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-1 px-2">
          <div className="py-2">
            <MainNavigation
              isLoading={isLoading}
              isInmueblesOpen={isInmueblesOpen}
              setIsInmueblesOpen={setIsInmueblesOpen}
              properties={properties}
              userIsAdmin={userIsAdmin}
              userIsTenant={userIsTenant}
            />
          </div>
         
          <div className="py-2">
            <div className="px-3 text-xs font-medium text-muted-foreground">
              {isLoading ? <Skeleton className="h-4 w-24" /> : "Configuraciones"}
            </div>
            <div className="grid gap-1 pt-1">
              <SettingsNavigation isLoading={isLoading} />
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <UserProfile isLoading={isLoading} userContext={userContext} />
      </div>
    </div>
  );
}