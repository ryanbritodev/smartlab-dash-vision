import { Building2, FileText, HomeIcon, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Home", url: "/dashboard", icon: HomeIcon },
  { title: "Unidades", url: "/unidades", icon: Building2 },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">SmartLab</h1>
      </SidebarHeader>
     
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-4 ${
                        isActive
                          ? "bg-[#1f88ca] text-white font-medium border-white"
                          : "text-white hover:bg-[#1f88ca] border-transparent"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-lg font-semibold mb-0.5">{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-0">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-[#1f88ca] hover:text-white px-6 py-3 transition-all duration-200 border-l-4 border-transparent hover:border-transparent rounded-none h-auto"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-lg font-semibold">Sair</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}