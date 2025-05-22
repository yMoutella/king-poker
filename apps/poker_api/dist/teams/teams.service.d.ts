import { CreateTeamDto } from './dto/team.dto';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export declare class TeamsService {
    private readonly dynamoClient;
    constructor(dynamoClient: DynamoDBDocumentClient);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto>;
    findAll(): string;
    findOne(name: string): Promise<Record<string, any> | undefined>;
    update(id: number, updateTeamDto: any): string;
    remove(id: number): string;
}
