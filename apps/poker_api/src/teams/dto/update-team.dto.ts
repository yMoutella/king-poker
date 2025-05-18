import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
    name: string;
    description: string;
    members: string[];
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    updatedBy: string;
}
