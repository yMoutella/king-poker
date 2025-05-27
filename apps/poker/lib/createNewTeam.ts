'use server'

import { getToken } from "./getToken"
import { Team, Player } from "@/interfaces/team"
import { cookies } from 'next/headers'

function newTeam(name: string, user: Player): Team {
    return {
        name: name,
        description: `This is your team ${name} description`,
        players: [
            {
                ...user
            }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        isDeleted: false,
        createdBy: user.email,
        updatedBy: user.email
    }
}

export async function createNewTeam(teamName: string) {


    const user: Player = {
        name: (await cookies()).get('user_name')!.value,
        email: (await cookies()).get('user_email')!.value,
        type: 'admin'
    }
    const token = await getToken('ymoutella@gmail.com')
    const host = process.env.BACKEND_HOST
    const team = newTeam(teamName, user)


    const response = await fetch(`${host}/teams`, {
        body: JSON.stringify(team),
        method: "POST",
        headers: {
            'Authentication': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        mode: 'cors'
    })

    return response.json()
}