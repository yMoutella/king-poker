import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('getToken')
    signIn(@Body() body: SignInDto) {

        const { email } = body;
        return this.AuthService.signIn(email);
    }

    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req, @Res() res) {
    //     console.log(req)
    //     res.status(HttpStatus.OK).json({})
    // }

}
