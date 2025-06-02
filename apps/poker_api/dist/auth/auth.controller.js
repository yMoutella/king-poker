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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signIn_dto_1 = require("./dto/signIn.dto");
const config_1 = require("@nestjs/config");
let AuthController = class AuthController {
    AuthService;
    configService;
    constructor(AuthService, configService) {
        this.AuthService = AuthService;
        this.configService = configService;
    }
    signIn(body, request, res) {
        const apiToken = request.headers['api_token'];
        const grant_type = request.headers['grant-type'];
        this.validateReaders(grant_type, apiToken);
        this.validateApiToken(apiToken);
        const { email } = body;
        return this.AuthService.signIn(email);
    }
    validateApiToken(apiToken) {
        const getApiToken = this.configService.get('JWT_SECRET');
        if (apiToken !== getApiToken) {
            throw new common_1.BadRequestException({
                code: 404,
                message: "Invalid api token!!"
            });
        }
    }
    validateReaders(grant_type, apiToken) {
        const badRequest = {
            code: 404,
            message: 'Invalid headers!!'
        };
        if (!apiToken || !grant_type) {
            throw new common_1.BadRequestException(badRequest);
        }
        if (grant_type != 'client_credentials') {
            throw new common_1.BadRequestException(badRequest);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('getToken'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map