'use server'

import { cookies } from "next/headers";
import { getToken } from "./getToken";

export async function getTeams() {

    const email = (await cookies()).get('user_email')!.value

    const token = getToken(email)
    const host = process.env.BACKEND_HOST


    const response = await fetch(`${host}/teams/${email}`, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Authentication': `Bearer ${token}`,
            'Content-type': 'application/json'
        },
    })

    return await response.json()
}