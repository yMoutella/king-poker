import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(createTeamDto: CreateTeamDto): Promise<CreateTeamDto>;
    findAll(response: any): any;
    findOne(id: string): Promise<Record<string, any>>;
    update(id: string, updateTeamDto: any): string;
    remove(id: string): Promise<void>;
}
