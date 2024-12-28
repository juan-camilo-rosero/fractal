import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserContextProvider } from "@/context/UserContext";
import Courses from '@/components/dashboard/Courses'

export default function Page() {
  return (
    <UserContextProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex-grow w-full">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:hidden">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <div className="flex flex-col gap-4 p-4 pt-0">
              <div className="h-48 rounded-xl w-full mt-5 bg-fblue-700" />
            </div>
            <Courses />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserContextProvider>
  );
}
