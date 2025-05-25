import { UUID } from "crypto";
import { playerType } from "../enums/player.enum";

export interface PlayerInterface {
    email: string;
    name: string
    type: playerType;
}

export class Team {
    id: UUID;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
