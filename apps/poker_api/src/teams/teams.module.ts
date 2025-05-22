import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { DynamoDBModule } from 'src/dynamodb.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, AuthService, JwtService, UsersService],
  imports: [DynamoDBModule],
})
export class TeamsModule { }
