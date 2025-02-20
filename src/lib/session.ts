import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(sessionToken) {
  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey);
    return payload;
  } catch (err) {
    console.log("Failed to verify token", err);
  }
}


export async function createSession(userId){
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const sessionToken = await encrypt({ userId, expiresAt });
    const cookiesStore = await cookies();
    
    cookiesStore.set("sessionToken", sessionToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    });
}