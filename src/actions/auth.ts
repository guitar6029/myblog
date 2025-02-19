"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  get: (val: string) => string;
}

export async function register(state, formData: FormData) {
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
  console.log("userCollection", userCollection);
  if (userCollection) {
    const { email, password } = validateFields.data;
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await userCollection.insertOne({ email: email, password: hashedPassword });

      //create session todo


      //redirect todo
      redirect('/dashboard');


    } else {
      return {
        errors: {
          message: "Email already exists",
        },
      };
    }
  } else {
    return {
      errors: {
        message: "Somehthing went wrong",
      },
    };
  }
}
