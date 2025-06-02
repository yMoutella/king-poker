import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private AuthService;
    private configService;
    constructor(AuthService: AuthService, configService: ConfigService);
    signIn(body: SignInDto, request: any, res: Response): Promise<{
        access_token: string | null;
    }>;
    private validateApiToken;
    private validateReaders;
}
