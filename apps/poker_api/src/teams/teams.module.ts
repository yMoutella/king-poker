import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { DynamoDBModule } from 'src/dynamodb.module';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [DynamoDBModule],
})
export class TeamsModule { }
