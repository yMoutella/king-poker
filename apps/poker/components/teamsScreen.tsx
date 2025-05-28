'use server'

import { getTeams } from "@/lib/getTeams";
import TeamsList from "./teamsList";


export default async function TeamsScreen() {

    const teams = await getTeams()

    return (
        <div>
            <TeamsList teams={[...teams]} />
        </div>
    )

}