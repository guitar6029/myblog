"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  get: (val: string) => string;
};

export async function register(state, formData: FormData) {
  // Validate form fields
  const validateFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        message: "Server error! Unable to connect to the database.",
      },
    };
  }

  const { email, password } = validateFields.data;

  // Check if the email is already registered
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        message: "Email already exists",
      },
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const result = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  if (!result.insertedId) {
    return {
      errors: {
        message: "Failed to register user.",
      },
    };
  }

  // Create a session for the new user
  await createSession(result.insertedId.toString());

  // Redirect to the dashboard after successful registration
  redirect("/dashboard");
}
