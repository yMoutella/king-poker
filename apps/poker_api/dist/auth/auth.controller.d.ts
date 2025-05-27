import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
export declare class AuthController {
    private AuthService;
    constructor(AuthService: AuthService);
    signIn(body: SignInDto, request: any): Promise<{
        access_token: string | null;
    }>;
}
