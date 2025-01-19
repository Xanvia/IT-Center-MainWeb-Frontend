"use client";

import { StuProfile } from "@/utils/types";
import Axios from "@/config/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import StudentProfileView from "./profileView";

export default function StudentProfile() {
  const [stuProfile, setstuProfile] = useState<StuProfile>();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }
    // Fetch stuProfile from the server
    const fetchStuProfile = async () => {
      const response = await Axios.get(`/user/student/me`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.data;
      setstuProfile(data);
    };
    fetchStuProfile();
  }, [session]);

  return <StudentProfileView stuProfile={stuProfile} />;
}
