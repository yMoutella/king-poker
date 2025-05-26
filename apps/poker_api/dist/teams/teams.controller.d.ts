import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto>;
    findAll(findFilter: {
        createdBy: string;
    }, response: any): Promise<any>;
    findOne(id: string): Promise<Record<string, any>>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<{
        message: string;
        team: UpdateTeamDto;
    }>;
    remove(id: string, response: any): Promise<any>;
}
