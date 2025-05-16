export interface TeamState {
    team: Team
    selectTeam: (team: Team) => void
}

export interface Team {
    name: string | null
    date: string | null
}

