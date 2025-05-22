import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
export declare class UsersService {
    private readonly dynamoClient;
    constructor(dynamoClient: DynamoDBDocumentClient);
    findUser(email: string): Promise<any>;
}
