import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto>;
    findAll(response: any): any;
    findOne(name: string): Promise<Record<string, any> | undefined>;
    update(id: string, updateTeamDto: any): string;
    remove(id: string): string;
}
