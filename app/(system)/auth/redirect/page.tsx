"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const googleCB = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams["token"];
  const router = useRouter();

  useEffect(() => {
    if (token && typeof window !== "undefined") {
      // Check for client-side
      (async () => {
        try {
          const response = await signIn("google-credentials", {
            token,
            redirect: false,
          });
          console.log(response);
          if (!response?.ok) {
            console.log(response?.error);
            alert("something went wrong!");
            return;
          }
          router.push("/dashboard");
        } catch (error) {
          console.log("login error");
          alert("something went wrong!");
        }
      })();
    }
  }, []);

  return <div>Signing in...</div>;
};

export default googleCB;
