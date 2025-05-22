import { UUID } from "crypto";
import { playerType } from "../enums/player.enum";

export interface PlayerInterface {
    email: string;
    type: playerType;
}

export class Team {
    id: UUID;
    name: string;
    name_sk: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
