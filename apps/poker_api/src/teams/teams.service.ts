import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/team.dto';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { PlayerInterface } from './entities/team.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TeamsService {

  constructor(
    @Inject('DYNAMODB_CLIENT')
    private readonly dynamoClient: DynamoDBDocumentClient,
    private readonly userService: UsersService
  ) { }

  async create(createTeamDto: CreateTeamDto) {

    createTeamDto.name = createTeamDto.name.replaceAll(' ', '_').toLowerCase();

    const hasTeam = await this.findOne(createTeamDto.name)

    if (hasTeam) {
      throw new ConflictException({
        error: `This team already exits`
      })
    }

    const invalidTeamPlayers = await this.invalidTeamPlayers(createTeamDto.players)

    if (invalidTeamPlayers.length > 0) {
      throw new BadRequestException({
        error: 'The following player(s) do not exist or is invalid!',
        players: invalidTeamPlayers
      })
    }

    const uuid = crypto.randomUUID();
    createTeamDto.id = uuid;
    createTeamDto.name_sk = `#TEAM#${createTeamDto.name}`

    try {
      await this.dynamoClient.send(
        new PutCommand({
          TableName: 'poker_team',
          Item: {
            pk: `${createTeamDto.name}`,
            sk: `${createTeamDto.name_sk}`,
            ...createTeamDto,
          },
        }),
      )

      return createTeamDto;
    }
    catch (error) {
      console.error('Error creating team:', error);
      throw new Error('Error creating team');
    }
  }

  findAll() {
    return `This action returns all teams`;
  }

  async findOne(name: string) {

    const hasTeam = await this.dynamoClient.send(
      new GetCommand({
        TableName: "poker_team",
        Key: {
          name: name,
          name_sk: `#TEAM#${name}`
        }
      })
    )

    if (hasTeam) {
      return hasTeam.Item
    }

    return hasTeam;
  }

  update(id: number, updateTeamDto: any) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

  private async invalidTeamPlayers(players: PlayerInterface[]): Promise<PlayerInterface[]> {

    const returnedUsers: PlayerInterface[] = []

    for (const player of players) {
      const result = await this.userService.findUser(player.email)

      if (!result) {
        returnedUsers.push(player)
      }

    }

    return returnedUsers

  }
}

