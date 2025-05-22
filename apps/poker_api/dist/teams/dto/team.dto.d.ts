import { PlayerInterface, Team } from "../entities/team.entity";
import { playerType } from "../enums/player.enum";
export declare class Player implements PlayerInterface {
    email: string;
    type: playerType;
}
declare const UpdateTeamDto_base: import("@nestjs/mapped-types").MappedType<Partial<Team>>;
export declare class UpdateTeamDto extends UpdateTeamDto_base {
    name: string;
    description: string;
    players: Player[];
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    updatedBy: string;
}
declare const CreateTeamDto_base: import("@nestjs/mapped-types").MappedType<Partial<Team>>;
export declare class CreateTeamDto extends CreateTeamDto_base {
    name: string;
    description: string;
    players: Player[];
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
}
export {};
