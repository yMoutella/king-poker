import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, Response } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
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

    await this.checkInvalidTeamPlayers(createTeamDto.players)

    const uuid = crypto.randomUUID();

    createTeamDto.id = uuid;
    createTeamDto.createdBy_pk = createTeamDto.createdBy;

    try {
      await this.dynamoClient.send(
        new PutCommand({
          TableName: 'poker_team',
          Item: {
            pk: `${createTeamDto.id}`,
            sk: `${createTeamDto.name}`,
            ...createTeamDto,
          },
        }),
      )

      return createTeamDto;
    }
    catch (error) {
      throw new Error('Error creating team');
    }
  }

  async findTeamsUserFilter(createdBy: string) {


    try {
      const result: any = await this.dynamoClient.send(
        new QueryCommand({
          TableName: 'poker_team',
          IndexName: 'createdBy',
          KeyConditionExpression: `createdBy_pk = :pk`,
          ExpressionAttributeValues: {
            ':pk': createdBy,
          },
        })
      );
      return {
        message: 'Teams retrieved successfully',
        teams: result.Items,
      }
    }
    catch (error) {
      throw new HttpException({
        message: "Error fetching teams",
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {

    const hasTeam = await this.dynamoClient.send(
      new GetCommand({
        TableName: "poker_team",
        Key: {
          id: id,
        }
      })
    )

    if (hasTeam.Item) {
      return hasTeam.Item
    }

    throw new NotFoundException({
      message: "Team not found!"
    })
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {

    await this.findOne(id)
    await this.checkInvalidTeamPlayers(updateTeamDto.players)

    const { ...fields } = updateTeamDto;
    const updateExpressions: string[] = []
    const expressionAttributeNames = {}
    const expressionAtributeValues = {}

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined || value !== null) {
        updateExpressions.push(`#${key} = :${key}`);
        expressionAttributeNames[`#${key}`] = key;
        expressionAtributeValues[`:${key}`] = value;
      }
    });

    try {

      await this.dynamoClient.send(new UpdateCommand({
        TableName: 'poker_team',
        Key: {
          id: id,
        },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAtributeValues,
      }))

      return {
        message: "Team updated successfully",
        team: updateTeamDto,
      }

    } catch (error) {
      throw new HttpException({
        message: "Error updating team",
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async checkInvalidTeamPlayers(players: PlayerInterface[]): Promise<void> {
    const invalidPlayers: PlayerInterface[] = [];

    for (const player of players) {
      const result = await this.userService.findUser(player.email);

      if (!result) {
        invalidPlayers.push(player);
      }
    }

    if (invalidPlayers.length > 0) {
      throw new ConflictException({
        error: 'The following player(s) do not exist or are invalid!',
        players: invalidPlayers,
      });
    }
  }


  async remove(id: string) {

    await this.findOne(id)

    try {
      await this.dynamoClient.send(
        new DeleteCommand({
          TableName: 'poker_team',
          Key: {
            id: id,
          }
        }))
      return {
        message: "Team deleted successfully",
      }
    } catch (error) {
      throw new HttpException({ message: "Error deleting team" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
