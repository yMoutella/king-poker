import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export declare class TeamsService {
    private readonly dynamoClient;
    constructor(dynamoClient: DynamoDBDocumentClient);
    create(createTeamDto: CreateTeamDto): Promise<import("@aws-sdk/lib-dynamodb").PutCommandOutput>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTeamDto: UpdateTeamDto): string;
    remove(id: number): string;
}
