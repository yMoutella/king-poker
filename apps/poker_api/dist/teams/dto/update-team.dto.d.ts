import { CreateTeamDto } from './create-team.dto';
declare const UpdateTeamDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTeamDto>>;
export declare class UpdateTeamDto extends UpdateTeamDto_base {
    name: string;
    description: string;
    members: string[];
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    updatedBy: string;
}
export {};
