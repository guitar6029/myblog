"use client";
import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/actions/auth";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <form
        className="flex flex-col gap-1 p-4 w-[50vw] border-1 rounded-lg border-black"
        action={action}
      >
        <h1 className="font-bold text-2xl text-center">Register</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className="border-2 border-black p-1 rounded-sm text-black"
          required
        />
        {state?.errors?.email && (
          <span className="text-red-600">{state.errors?.email}</span>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border-2 border-black p-1 rounded-sm text-black"
          required
        />
        {state?.errors?.password && (
          <span className="text-red-600">{state.errors?.password}</span>
        )}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="border-2 border-black p-1 rounded-sm text-black"
          required
        />
        {state?.errors?.confirmPassword && (
          <span className="text-red-600">{state.errors?.confirmPassword}</span>
        )}
        <button
          type="submit"
          disabled={isPending}
          className={`${
            isPending ? "bg-neutral-800" : "bg-black"
          } p-1 rounded-sm mt-2 text-white`}
        >
          Register
        </button>
        <hr className="mt-4" />
        <div className="flex flex-row items-center justify-center gap-2">
          <span>Already have an account?</span>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
