import { ROLES } from "../constants/roles";
import { 
  Wrench, 
  FileText, 
  Hospital, 
  Users, 
  User, 
  History,
  LayoutDashboard,
  LucideIcon
} from "lucide-react";

interface NavLinkInfo {
  name: string;
  path: string;
  roles: string[];
  icon: LucideIcon;
}

export const useNavigation = (role: string | undefined) => {
  const allLinks: NavLinkInfo[] = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      roles: ["all"],
      icon: LayoutDashboard
    },
    { 
      name: "Servicios", 
      path: "/services", 
      roles: ["all"],
      icon: Wrench
    },
    { 
      name: "Mis Solicitudes", 
      path: "/requests", 
      roles: [ROLES.USER, ROLES.INSTRUCTOR],
      icon: FileText
    },
    { 
      name: "Remisiones", 
      path: "/remissions", 
      roles: [ROLES.INSTRUCTOR, ROLES.ADMIN, ROLES.SUPERADMIN],
      icon: Hospital
    },
    { 
      name: "Gestión Fichas", 
      path: "/groups", 
      roles: [ROLES.INSTRUCTOR, ROLES.ADMIN, ROLES.SUPERADMIN],
      icon: Users
    },
    { 
      name: "Usuarios", 
      path: "/users", 
      roles: [ROLES.ADMIN, ROLES.SUPERADMIN],
      icon: User
    },
    { 
      name: "Auditoría", 
      path: "/audits", 
      roles: [ROLES.SUPERADMIN],
      icon: History
    },
  ];

  // Filter links based on role
  const filteredLinks = allLinks.filter(link => 
    link.roles.includes("all") || (role && link.roles.includes(role))
  );

  return { links: filteredLinks };
};
