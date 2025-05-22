"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const teams_service_1 = require("./teams.service");
const teams_controller_1 = require("./teams.controller");
const dynamodb_module_1 = require("../dynamodb.module");
const auth_service_1 = require("../auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teams_controller_1.TeamsController],
        providers: [teams_service_1.TeamsService, auth_service_1.AuthService, jwt_1.JwtService, users_service_1.UsersService],
        imports: [dynamodb_module_1.DynamoDBModule],
    })
], TeamsModule);
//# sourceMappingURL=teams.module.js.map