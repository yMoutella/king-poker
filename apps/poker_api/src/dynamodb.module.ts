import { Module } from '@nestjs/common';
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'DYNAMODB_CLIENT',
            useFactory: (configService: ConfigService) => {
                const config: DynamoDBClientConfig = {
                    credentials: {
                        accessKeyId: configService.get<string>('AUTH_DYNAMODB_ID')!,
                        secretAccessKey: configService.get<string>('AUTH_DYNAMODB_SECRET')!,
                    },
                    region: configService.get<string>('AUTH_DYNAMODB_REGION')!,
                }

                return DynamoDBDocumentClient.from(new DynamoDB(config), {
                    marshallOptions: {
                        convertEmptyValues: true,
                        removeUndefinedValues: true,
                        convertClassInstanceToMap: true,
                    },
                })
            },
            inject: [ConfigService],
        }
    ],
    exports: ['DYNAMODB_CLIENT'],
})
export class DynamoDBModule {
}