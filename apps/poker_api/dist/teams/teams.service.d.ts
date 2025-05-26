import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { UsersService } from 'src/users/users.service';
export declare class TeamsService {
    private readonly dynamoClient;
    private readonly userService;
    constructor(dynamoClient: DynamoDBDocumentClient, userService: UsersService);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto>;
    findTeamsUserFilter(filter: {
        createdBy: string;
    }): Promise<{
        message: string;
        teams: any;
    }>;
    findOne(id: string): Promise<Record<string, any>>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<{
        message: string;
        team: UpdateTeamDto;
    }>;
    private checkInvalidTeamPlayers;
    remove(id: string): Promise<{
        message: string;
    }>;
}
