import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUser(body: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
