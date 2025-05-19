"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBModule = void 0;
const common_1 = require("@nestjs/common");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const config_1 = require("@nestjs/config");
let DynamoDBModule = class DynamoDBModule {
};
exports.DynamoDBModule = DynamoDBModule;
exports.DynamoDBModule = DynamoDBModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'DYNAMODB_DOCUMENT_CLIENT',
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const config = {
                        credentials: {
                            accessKeyId: configService.get('AUTH_DYNAMODB_ID'),
                            secretAccessKey: configService.get('AUTH_DYNAMODB_SECRET'),
                        },
                        region: process.env.AUTH_DYNAMODB_REGION,
                    };
                    return lib_dynamodb_1.DynamoDBDocumentClient.from(new client_dynamodb_1.DynamoDB(config), {
                        marshallOptions: {
                            convertEmptyValues: true,
                            removeUndefinedValues: true,
                            convertClassInstanceToMap: true,
                        },
                    });
                }
            }
        ],
        exports: ['DYNAMODB_DOCUMENT_CLIENT'],
    })
], DynamoDBModule);
//# sourceMappingURL=dynamodb.module.js.map