import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Length, ValidateNested } from "class-validator";
import { PlayerInterface, Team } from "../entities/team.entity";
import { PartialType } from "@nestjs/mapped-types";
import { playerType } from "../enums/player.enum";
import { Type } from "class-transformer";

export class Player implements PlayerInterface {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEnum(playerType)
    type: playerType;

    @IsNotEmpty()
    @IsString()
    name: string;

}

export class UpdateTeamDto extends PartialType(Team) {

    @Length(3, 50)
    @IsNotEmpty()
    name: string;

    @Length(3, 255)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Player)
    players: Player[];

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
export class CreateTeamDto extends PartialType(Team) {

    @Length(3, 50)
    @IsNotEmpty()
    name: string;

    @Length(3, 255)
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Player)
    players: Player[];

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
