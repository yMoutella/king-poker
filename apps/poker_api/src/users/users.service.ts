import { Inject, Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DYNAMODB_CLIENT')
        private readonly dynamoClient: DynamoDBDocumentClient,
    ) { }

    async findUser(email: string): Promise<any> {
        try {
            const result: any = await this.dynamoClient.send(
                new QueryCommand({
                    TableName: 'poker_auth',
                    IndexName: 'GSI1',
                    KeyConditionExpression: `GSI1PK = :pk and GSI1SK = :sk`,
                    ExpressionAttributeValues: {
                        ':pk': `USER#${email}`,
                        ':sk': `USER#${email}`,
                    },
                })
            );

            return result.Items[0];

        }
        catch (error) {
            console.error('Error fetching user:', error);
        }

    }
}
