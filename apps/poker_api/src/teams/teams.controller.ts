import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ConflictException, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';
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

  @Get()
  findAll(@Res() response) {
    const mock: string = this.teamsService.findAll()
    return response.status(200).json({
      message: 'Teams retrieved successfully',
      teams: mock,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: any) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':name')
  remove(@Param('name') id: string) {
    const result = this.teamsService.remove(id)
    return result
  }
}
