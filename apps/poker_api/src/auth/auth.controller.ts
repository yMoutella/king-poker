import { BadRequestException, Body, Controller, Get, Head, Headers, HttpCode, HttpException, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService,
        private configService: ConfigService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('getToken')
    signIn(@Body() body: SignInDto, @Req() request, res: Response) {

        const apiToken: string = request.headers['api_token']
        const grant_type: string = request.headers['grant-type']

        this.validateReaders(grant_type, apiToken)
        this.validateApiToken(apiToken)

        const { email } = body;
        return this.AuthService.signIn(email);
    }

    private validateApiToken(apiToken: string): void {
        const getApiToken = this.configService.get<string>('JWT_SECRET')

        if (apiToken !== getApiToken) {
            throw new BadRequestException({
                code: 404,
                message: "Invalid api token!!"
            })
        }
    }


    private validateReaders(grant_type: string, apiToken: string): void {

        const badRequest = {
            code: 404,
            message: 'Invalid headers!!'
        }

        if (!apiToken || !grant_type) {
            throw new BadRequestException(badRequest)
        }

        if (grant_type != 'client_credentials') {
            throw new BadRequestException(badRequest)
        }
    }

}
