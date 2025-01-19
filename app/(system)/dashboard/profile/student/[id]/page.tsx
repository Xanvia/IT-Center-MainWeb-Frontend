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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }
    const getStudentData = async () => {
      try {
        setIsLoading(true);
        const result = await Axios.get(`/user/student/${params.id}`, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        setStudent(result.data);
      } catch (err) {
        setError("Failed to load student profile");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getStudentData();
  }, [params.id, session]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20 animate-spin">
        <Loader />
      </div>
    );
  }

  if (error) {
    // return <ErrorMessage message={error} />
  }

  if (!student) {
    return <></>; //<ErrorMessage message="Student not found" />
  }

  return <StudentProfileView stuProfile={student} />;
}
