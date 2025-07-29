import { getServerSession } from "next-auth";
import { authOptions } from "@/config/nextAuth";
import AuthWrapper from "./component/auth-wrapper";
import DashboardContent from "./component/dashboard-content";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverSession = await getServerSession(authOptions);

  return (
    <AuthWrapper serverSession={serverSession}>
      <DashboardContent serverSession={serverSession}>
        {children}
      </DashboardContent>
    </AuthWrapper>
  );
}
