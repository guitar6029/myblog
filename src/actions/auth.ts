"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema, LoginFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  get: (val: string) => string;
};

type LoginFormData = {
  email: string;
  password: string;
  get: (val: string) => string;
};

export async function login(state, formData: LoginFormData) {
  //validate form fields
  const validateLoginFormFields = LoginFormSchema.safeParse({
    email: formData.get("email").toLowerCase(),
    password: formData.get("password"),
  });

  //if the form has errors
  if (!validateLoginFormFields.success) {
    return {
      errors: validateLoginFormFields.error.flatten().fieldErrors,
    };
  }


  // find the user in the db collection
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        message: "Server error! Unable to connect to the database.",
      },
    };
  }

  const { email, password } = validateLoginFormFields.data;
  //if found the collection, find the user
  const exisitingUser = await userCollection.findOne({ email: email });
  // if not found
  if (!exisitingUser) {
    return {
      errors: {
        message: "Invalid email or password",
      },
    };
  }

  //if user is found, compare the password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    exisitingUser.password
  );
  if (!isPasswordCorrect) {
    return {
      errors: {
        message: "Something is wrong with your login credentials",
      },
    };
  }

  //if password is good, then create the session
  await createSession(exisitingUser._id);

  //redirect to the home page
  redirect("/dashboard");
}

export async function register(state, formData: FormData) {
  // Validate form fields
  const validateFields = RegisterFormSchema.safeParse({
    email: formData.get("email").toLowerCase(),
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
