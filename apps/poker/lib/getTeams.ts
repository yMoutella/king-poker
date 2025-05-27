'use server'

import { cookies } from "next/headers";
import { getToken } from "./getToken";
import { Team } from "@/interfaces/team";

export async function getTeams(): Promise<Team[]> {

    const email = (await cookies()).get('user_email')!.value

    const token = await getToken(email)
    const host = process.env.BACKEND_HOST

    const response = await fetch(`${host}/teams/${email}`, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Content-type': 'application/json'
        },
    })

    const { teams } = await response.json()

    return teams
}