import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type Payload = {
  userId: string;
  expiresAt: number; // Change Date -> number (timestamp)
};

export async function encrypt(payload: Payload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt) // Use the provided expiration timestamp
    .sign(encodedKey);
}

export async function decrypt(sessionToken: string): Promise<Payload | null> {
  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey);
    return {
      userId: payload.userId as string,
      expiresAt: payload.exp as number, // Extract expiration from `exp`
    };
  } catch (err) {
    console.error("Failed to verify token", err);
    return null; // Explicitly return null on failure
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // Convert to seconds
  const sessionToken = await encrypt({ userId, expiresAt });

  const cookiesStore = await cookies(); // Await here

  cookiesStore.set("sessionToken", sessionToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt * 1000), // Convert back to milliseconds
    sameSite: "lax",
    path: "/",
  });
}

