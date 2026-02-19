import { useAuthContext } from "../../contexts/authContext";
import ActionButtons from "./actionButtons";
import QuickStats from "./quickStats";
import WelcomeBanner from "./welcomeBanner";

interface DashboardRoleActionsProps {
  refreshTrigger?: number;
}

export default function DashboardRoleActions({ refreshTrigger = 0 }: DashboardRoleActionsProps) {
  const { user } = useAuthContext();

  return (
    <>
      <WelcomeBanner />
      <QuickStats refreshTrigger={refreshTrigger} />
      <ActionButtons user={user} />
    </>
  );
}
