import { UUID } from "node:crypto";

export class CreateTeamDto {
    id: UUID;
    name: string;
    description: string;
    members: string[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
