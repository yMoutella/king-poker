import { UUID } from "node:crypto";
export declare class CreateTeamDto {
    id: UUID;
    name: string;
    description: string;
    user_adm: string;
    scrum_master: string;
    members: string[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
