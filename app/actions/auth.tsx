"use server";

import { registerSchemaType } from "../auth/components/schema/registerFormSchema";

export async function signup(data: registerSchemaType) {
  const { rePassword, ...postData } = data;
  try {
    const response = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData: any = await response.json();

      setError(errorData.field, { message: errorData.message });
      return;
    }
    const result = await response.json();
    console.log(result);
    alert("Registration successful!");
  } catch (error) {
    console.error("Error submitting the form:", error);
    setError("root.server", {
      message: "An error occurred. Please try again.",
    });
  }
}
