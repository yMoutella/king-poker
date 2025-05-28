export interface Player {
    name: string;
    email: string;
    type?: string;
}

export interface Team {
    name: string;
    description: string;
    players: Player[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}

export interface TeamState {
    team: Team
    selectTeam: (team: Team) => void
}