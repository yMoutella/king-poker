import { CreateTeamDto } from './dto/team.dto';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { UsersService } from 'src/users/users.service';
export declare class TeamsService {
    private readonly dynamoClient;
    private readonly userService;
    constructor(dynamoClient: DynamoDBDocumentClient, userService: UsersService);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto>;
    findAll(): string;
    findOne(id: string): Promise<Record<string, any>>;
    update(id: number, updateTeamDto: any): string;
    remove(id: string): Promise<void>;
    private invalidTeamPlayers;
}
