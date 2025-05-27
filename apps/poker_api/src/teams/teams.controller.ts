import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ConflictException, HttpException, HttpStatus, UseGuards, Header } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('teams')
// @UseGuards(AuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {

    const result = this.teamsService.create(createTeamDto);
    return result

  }

  @Get(':createdBy')
  async findAll(@Param('createdBy') createdBy: string, @Res() response) {

    const result: object = await this.teamsService.findTeamsUserFilter(createdBy)
    return response.status(200).json(result);

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const result = await this.teamsService.remove(id)
    return response.status(200).json(result)
  }
}
