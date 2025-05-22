import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DynamoDBModule } from 'src/dynamodb.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtService],
    imports: [DynamoDBModule],
    exports: [UsersService],
})
export class UsersModule { }
