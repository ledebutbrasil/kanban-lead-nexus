
import React from "react";
import { NavLink } from "react-router-dom";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Kanban", href: "/kanban", icon: TagIcon },
    { name: "Leads", href: "/leads", icon: FolderIcon },
    { name: "Team", href: "/team", icon: UsersIcon },
    { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  ];

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-sidebar">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      isActive
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
                      "mr-3 h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
