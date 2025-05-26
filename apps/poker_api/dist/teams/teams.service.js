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
const users_service_1 = require("../users/users.service");
let TeamsService = class TeamsService {
    dynamoClient;
    userService;
    constructor(dynamoClient, userService) {
        this.dynamoClient = dynamoClient;
        this.userService = userService;
    }
    async create(createTeamDto) {
        createTeamDto.name = createTeamDto.name.replaceAll(' ', '_').toLowerCase();
        await this.checkInvalidTeamPlayers(createTeamDto.players);
        const uuid = crypto.randomUUID();
        createTeamDto.id = uuid;
        createTeamDto.name = `#TEAM#${createTeamDto.name}`;
        createTeamDto.createdBy_pk = createTeamDto.createdBy;
        try {
            await this.dynamoClient.send(new lib_dynamodb_1.PutCommand({
                TableName: 'poker_team',
                Item: {
                    pk: `${createTeamDto.id}`,
                    sk: `${createTeamDto.name}`,
                    ...createTeamDto,
                },
            }));
            return createTeamDto;
        }
        catch (error) {
            console.error('Error creating team:', error);
            throw new Error('Error creating team');
        }
    }
    async findTeamsUserFilter(filter) {
        const { createdBy } = filter;
        try {
            const result = await this.dynamoClient.send(new lib_dynamodb_1.QueryCommand({
                TableName: 'poker_team',
                IndexName: 'createdBy',
                KeyConditionExpression: `createdBy_pk = :pk`,
                ExpressionAttributeValues: {
                    ':pk': createdBy,
                },
            }));
            return {
                message: 'Teams retrieved successfully',
                teams: result.Items,
            };
        }
        catch (error) {
            console.error('Error fetching user:', error);
            throw new common_1.HttpException({
                message: "Error fetching teams",
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const hasTeam = await this.dynamoClient.send(new lib_dynamodb_1.GetCommand({
            TableName: "poker_team",
            Key: {
                id: id,
            }
        }));
        if (hasTeam.Item) {
            return hasTeam.Item;
        }
        throw new common_1.NotFoundException({
            message: "Team not found!"
        });
    }
    async update(id, updateTeamDto) {
        await this.findOne(id);
        await this.checkInvalidTeamPlayers(updateTeamDto.players);
        const { ...fields } = updateTeamDto;
        const updateExpressions = [];
        const expressionAttributeNames = {};
        const expressionAtributeValues = {};
        Object.entries(fields).forEach(([key, value]) => {
            if (value !== undefined || value !== null) {
                updateExpressions.push(`#${key} = :${key}`);
                expressionAttributeNames[`#${key}`] = key;
                expressionAtributeValues[`:${key}`] = value;
            }
        });
        try {
            await this.dynamoClient.send(new lib_dynamodb_1.UpdateCommand({
                TableName: 'poker_team',
                Key: {
                    id: id,
                },
                UpdateExpression: `SET ${updateExpressions.join(', ')}`,
                ExpressionAttributeNames: expressionAttributeNames,
                ExpressionAttributeValues: expressionAtributeValues,
            }));
            return {
                message: "Team updated successfully",
                team: updateTeamDto,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                message: "Error updating team",
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkInvalidTeamPlayers(players) {
        const invalidPlayers = [];
        for (const player of players) {
            const result = await this.userService.findUser(player.email);
            if (!result) {
                invalidPlayers.push(player);
            }
        }
        if (invalidPlayers.length > 0) {
            throw new common_1.ConflictException({
                error: 'The following player(s) do not exist or are invalid!',
                players: invalidPlayers,
            });
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            await this.dynamoClient.send(new lib_dynamodb_1.DeleteCommand({
                TableName: 'poker_team',
                Key: {
                    id: id,
                }
            }));
            return {
                message: "Team deleted successfully",
            };
        }
        catch (error) {
            console.error('Error deleting team:', error);
            throw new common_1.HttpException({ message: "Error deleting team" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DYNAMODB_CLIENT')),
    __metadata("design:paramtypes", [lib_dynamodb_1.DynamoDBDocumentClient,
        users_service_1.UsersService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map