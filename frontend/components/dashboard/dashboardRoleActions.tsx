import {useAuthContext} from "../../contexts/authContext";
import ActionButtons from "./actionButtons";
import QuickStats from "./quickStats";
import WelcomeBanner from "./welcomeBanner";

export default function DashboardRoleActions() {
  const { user } = useAuthContext();

  return (
    <>
      <WelcomeBanner />
      <QuickStats />
      <ActionButtons user={user} />
    </>
  );
}
