import { Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class TeamsService {

  constructor(
    @Inject('DYNAMODB_DOCUMENT_CLIENT')
    private readonly dynamoClient: DynamoDBDocumentClient,
  ) { }

  async create(createTeamDto: CreateTeamDto) {

    const uuid = crypto.randomUUID();
    createTeamDto.id = uuid;

    console.log(createTeamDto)
    const result = await this.dynamoClient.send(
      new PutCommand({
        TableName: 'poker_teams',
        Item: {
          pk: `TEAM#${createTeamDto.id}`,
          sk: `TEAM#${createTeamDto.name}`,
          ...createTeamDto,
        },
      }),
    )

    return result;
  }

  findAll() {
    return `This action returns all teams`;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
