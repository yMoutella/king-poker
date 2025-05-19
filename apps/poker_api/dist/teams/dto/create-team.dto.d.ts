import { Team } from "../entities/team.entity";
interface Members {
    email: string;
}
declare const CreateTeamDto_base: import("@nestjs/mapped-types").MappedType<Partial<Team>>;
export declare class CreateTeamDto extends CreateTeamDto_base {
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
export {};
