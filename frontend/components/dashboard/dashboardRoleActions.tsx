import { useAuth } from "../../hooks/useAuth";
import ActionButtons from "./actionButtons";
import QuickStats from "./quickStats";
import WelcomeBanner from "./welcomeBanner";

export default function DashboardRoleActions() {
  const { user } = useAuth();

  return (
    <>
      <WelcomeBanner />
      <QuickStats />
      <ActionButtons user={user} />
    </>
  );
}
