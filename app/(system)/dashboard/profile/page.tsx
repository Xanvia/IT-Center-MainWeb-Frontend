import { getServerSession } from "next-auth";
import Staffprofile from "./staff/profile";
import Studentprofile from "./student/profile";
import { authOptions } from "@/config/nextAuth";

export default async function profile() {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  if (role === "STAFF" || role === "ADMIN" || role === "S_ADMIN") {
    return <Staffprofile />;
  } else if (role === "STUDENT") {
    return <Studentprofile />;
  } else {
    return (
      <div className="text-center text-red-500">You are not Authorized</div>
    );
  }
}
