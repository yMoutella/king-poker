import { Module } from '@nestjs/common';
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [
        {
            provide: 'DYNAMODB_DOCUMENT_CLIENT',
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const config: DynamoDBClientConfig = {
                    credentials: {
                        accessKeyId: configService.get<string>('AUTH_DYNAMODB_ID')!,
                        secretAccessKey: configService.get<string>('AUTH_DYNAMODB_SECRET')!,
                    },
                    region: process.env.AUTH_DYNAMODB_REGION,
                }

                return DynamoDBDocumentClient.from(new DynamoDB(config), {
                    marshallOptions: {
                        convertEmptyValues: true,
                        removeUndefinedValues: true,
                        convertClassInstanceToMap: true,
                    },
                })
            }
        }
    ],
    exports: ['DYNAMODB_DOCUMENT_CLIENT'],
})
export class DynamoDBModule { }