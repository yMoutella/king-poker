import { UUID } from "crypto";
export interface Members {
    email: string;
}
export declare class Team {
    id: UUID;
    name: string;
    description: string;
    user_adm: string;
    scrum_master: string;
    members: Members[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
