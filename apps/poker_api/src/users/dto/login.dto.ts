import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class LoginDto extends PartialType(User) {

    @IsEmail()
    @IsNotEmpty()
    email: string

}