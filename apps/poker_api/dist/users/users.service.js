"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let UsersService = class UsersService {
    dynamoClient;
    constructor(dynamoClient) {
        this.dynamoClient = dynamoClient;
    }
    async findUser(email) {
        try {
            const result = await this.dynamoClient.send(new lib_dynamodb_1.QueryCommand({
                TableName: 'poker_auth',
                IndexName: 'GSI1',
                KeyConditionExpression: `GSI1PK = :pk and GSI1SK = :sk`,
                ExpressionAttributeValues: {
                    ':pk': `USER#${email}`,
                    ':sk': `USER#${email}`,
                },
            }));
            return result.Items[0];
        }
        catch (error) {
            console.error('Error fetching user:', error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DYNAMODB_CLIENT')),
    __metadata("design:paramtypes", [lib_dynamodb_1.DynamoDBDocumentClient])
], UsersService);
//# sourceMappingURL=users.service.js.map