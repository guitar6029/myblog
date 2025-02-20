"use client";
import { useActionState } from "react";
import { login } from "@/actions/auth";
import Link from "next/link";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <form
        className="flex flex-col gap-1 p-4 w-[50vw] border-1 rounded-lg border-black"
        action={action}
      >
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className="text-black" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" className="text-black" />

        <button type="submit" disabled={isPending}
          className={`${isPending ? "bg-neutral-600" : "bg-black"} text-white p-1 rounded-sm mt-2`}>Login</button>
        <hr className="mt-4" />
        <div className="flex flex-row items-center justify-center gap-2">
          <span>Don&apos;t have an account?</span>
          <Link href="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
