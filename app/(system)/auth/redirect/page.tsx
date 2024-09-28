"use client";
// import { signIn } from "next-auth/react";

// const Callback = ({
//   params,
//   searchParams,
// }: {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }) => {
//   const token = searchParams["token"];
//   console.log(token);

//   if (token) {
//     (async () => {
//       try {
//         await signIn("credentialsGoogle", {
//           token,
//           callbackUrl: "/dashboard",
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }

//   return <div>Signing in...</div>;
// };

// export default Callback;

import { useEffect } from "react";
import { signIn } from "next-auth/react";

const Callback = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams["token"];
  console.log(token);

  useEffect(() => {
    if (token && typeof window !== "undefined") {
      // Check for client-side
      (async () => {
        try {
          const response = await signIn("credentialsGoogle", {
            token,
          });
          if (!response?.ok) {
            console.log(response?.error);
          }
        } catch (error) {
          console.log("login error");
        }
      })();
    }
  }, [token]); // Dependency array to run effect when token changes

  return <div>Signing in...</div>;
};

export default Callback;
