"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema/LoginSchema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid Field" };
  }

  const { email, password } = validateFields.data;

  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
