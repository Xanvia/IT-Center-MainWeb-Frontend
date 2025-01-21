"use client";

import { useEffect, useState } from "react";
import StudentProfileView from "../profileView";
import { StuProfile } from "@/utils/types";
import Axios from "@/config/axios";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";

interface Props {
  params: {
    id: string;
  };
}

export default function StudentProfilePage({ params }: Props) {
  const [student, setStudent] = useState<StuProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }
    const getStudentData = async () => {
      try {
        const result = await Axios.get(`/user/student/${params.id}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        console.log(result.data);
        setStudent(result.data);
      } catch (err: any) {
        console.log(err.message);
        setError(err.response.data.message);
      }
    };

    getStudentData();
  }, [params.id, session]);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-20 animate-spin">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Something Went Wrong!
        </h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (student) return <StudentProfileView stuProfile={student!} admin />;
}
