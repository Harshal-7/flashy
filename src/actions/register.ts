"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schema/RegisterSchema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/utils/user";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validateFields.data;

  try {
    const doesUserExists = await getUserByEmail(email);

    if (doesUserExists) return { error: "User already exists with this email" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    console.log("New User Created : ", user);

    return { success: "Account Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
