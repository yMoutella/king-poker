import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor
        (private readonly usersService: UsersService) { }

    @Post()
    async getUser(@Body() body: LoginDto, @Res() res: Response) {

        const { email } = body

        const result = await this.usersService.findUser(email);

        if (!result) {
            res.status(HttpStatus.NOT_FOUND).json({
                message: 'User not found',
                statusCode: HttpStatus.NOT_FOUND,
            })
        }

        return res.status(HttpStatus.OK).json(result);
    }
}


