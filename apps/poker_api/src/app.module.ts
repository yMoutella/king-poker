import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { DynamoDBModule } from './dynamodb.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TeamsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({
        JWT_SECRET: process.env.JWT_SECRET,
      }),]
    }),
    DynamoDBModule,
    AuthModule,
    UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, JwtService],
})
export class AppModule { }
