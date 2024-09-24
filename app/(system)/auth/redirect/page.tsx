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
  if (token) {
    try {
      signIn("credentialsGoogle", {
        token,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return <div>Signing in...</div>;
};

export default Callback;
