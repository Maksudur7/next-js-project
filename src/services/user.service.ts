import {env} from "@/env"
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL

export const userService = {
    getSelection: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            })

            const session = await res.json()
            console.log(session);
            return { data: session, error: null };
        }
        catch (err) {
            console.log(err);
            return { data: null, error: { message: "some thing is wrong" } }
        }
    }

}