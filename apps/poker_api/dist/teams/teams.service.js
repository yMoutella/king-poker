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
        const invalidTeamPlayers = await this.invalidTeamPlayers(createTeamDto.players);
        if (invalidTeamPlayers.length > 0) {
            throw new common_1.BadRequestException({
                error: 'The following player(s) do not exist or is invalid!',
                players: invalidTeamPlayers
            });
        }
        const uuid = crypto.randomUUID();
        createTeamDto.id = uuid;
        createTeamDto.name = `#TEAM#${createTeamDto.name}`;
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
    findAll() {
        return `This action returns all teams`;
    }
    async findOne(id) {
        const hasTeam = await this.dynamoClient.send(new lib_dynamodb_1.GetCommand({
            TableName: "poker_team",
            Key: {
                id: id,
            }
        }));
        console.log(hasTeam);
        if (hasTeam.Item) {
            return hasTeam.Item;
        }
        throw new common_1.NotFoundException({
            error: "Team not found!"
        });
    }
    update(id, updateTeamDto) {
        return `This action updates a #${id} team`;
    }
    async remove(id) {
    }
    async invalidTeamPlayers(players) {
        const returnedUsers = [];
        for (const player of players) {
            const result = await this.userService.findUser(player.email);
            if (!result) {
                returnedUsers.push(player);
            }
        }
        return returnedUsers;
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