import { CreateTeamDto } from './create-team.dto';
import { Members } from '../entities/team.entity';
declare const UpdateTeamDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTeamDto>>;
export declare class UpdateTeamDto extends UpdateTeamDto_base {
    name: string;
    description: string;
    members: Members[];
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    updatedBy: string;
}
export {};
