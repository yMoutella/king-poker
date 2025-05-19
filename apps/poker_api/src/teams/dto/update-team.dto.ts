import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { Members } from '../entities/team.entity';
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {

    @Length(3, 50)
    @IsNotEmpty()
    name: string;

    @Length(3, 255)
    @IsNotEmpty()
    description: string;

    @IsEmail()
    @IsNotEmpty()
    members: Members[];

    @IsDateString()
    @IsNotEmpty()
    updatedAt: string;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isDeleted: boolean;

    @IsEmail()
    @IsNotEmpty()
    updatedBy: string;

}
