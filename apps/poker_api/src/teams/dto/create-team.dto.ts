import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, Length } from "class-validator";
import { UUID } from "node:crypto";
import { Team } from "../entities/team.entity";
import { PartialType } from "@nestjs/mapped-types";

interface Members {
    email: string
}

export class CreateTeamDto extends PartialType(Team) {

    @Length(3, 50)
    @IsNotEmpty()
    name: string;

    @Length(3, 255)
    @IsNotEmpty()
    description: string;

    @IsEmail()
    @IsNotEmpty()
    user_adm: string;

    @IsEmail()
    @IsNotEmpty()
    scrum_master: string;

    @IsEmail()
    @IsNotEmpty()
    members: Members[];

    @IsDateString()
    @IsNotEmpty()
    createdAt: string;

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
    createdBy: string;

    @IsEmail()
    @IsNotEmpty()
    updatedBy: string;
}
