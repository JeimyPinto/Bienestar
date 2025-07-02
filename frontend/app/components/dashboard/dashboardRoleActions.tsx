import { useAuth } from "../../../hooks/useAuth";
import { ROLES } from "../../constants/roles";
import ActionButtons from "./actionButtons";
import UserServicesSection from "../../dashboard/userServicesSection";
import QuickStats from "../../dashboard/quickStats";
import WelcomeBanner from "../../dashboard/welcomeBanner";

export default function DashboardRoleActions() {
  const { user } = useAuth();

  // Solo mostrar si el usuario tiene permisos de instructor o superior
  if (!user || user.role === ROLES.USER) {
    return null;
  }

  return (
    <>
      <WelcomeBanner />
      <QuickStats />
      <ActionButtons user={user} />
      <UserServicesSection />
    </>
  );
}
