import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(email: string): Promise<{ access_token: string | null }> {

        const user = await this.usersService.findUser(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.pk,
            email: user.email
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
