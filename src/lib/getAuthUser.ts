import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getAuthUser(){
    const cookiesStore = await cookies();
    const sessionValue = await cookiesStore.get("sessionToken")?.value;

    if (sessionValue){
        const user = await decrypt(sessionValue);
        return user;
    }


}