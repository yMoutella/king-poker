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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
let TeamsService = class TeamsService {
    dynamoClient;
    constructor(dynamoClient) {
        this.dynamoClient = dynamoClient;
    }
    async create(createTeamDto) {
        const uuid = crypto.randomUUID();
        createTeamDto.id = uuid;
        console.log(createTeamDto);
        const result = await this.dynamoClient.send(new lib_dynamodb_1.PutCommand({
            TableName: 'poker_teams',
            Item: {
                pk: `TEAM#${createTeamDto.id}`,
                sk: `TEAM#${createTeamDto.name}`,
                ...createTeamDto,
            },
        }));
        return result;
    }
    findAll() {
        return `This action returns all teams`;
    }
    findOne(id) {
        return `This action returns a #${id} team`;
    }
    update(id, updateTeamDto) {
        return `This action updates a #${id} team`;
    }
    remove(id) {
        return `This action removes a #${id} team`;
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DYNAMODB_DOCUMENT_CLIENT')),
    __metadata("design:paramtypes", [lib_dynamodb_1.DynamoDBDocumentClient])
], TeamsService);
//# sourceMappingURL=teams.service.js.map