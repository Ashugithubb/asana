import { forwardRef, Inject, Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private readonly projectRepo: Repository<Project>,
    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService) { }

  async createProject(createProjectDto: CreateProjectDto, teamid: number, userid: number) {
    const team = await this.teamService.findOneByGroupId(teamid);
    if (!team) throw new NotFoundException("Team Not found");

    if (team.team_leadId !== userid) throw new UnauthorizedException("you cannot add Projects");

    const newProject = this.projectRepo.create({
      ...createProjectDto,
      team
    })
    await this.projectRepo.save(newProject);
    return { "msg": "Project Added" };
  }

  async findAll() {
    return await this.projectRepo.find();
  }

  async findOneByProjectId(id:number){
    return await this.projectRepo.findOneBy({projectId:id});
  }



  async findOne(id: number, teamid: number, userid: number) {
    const team = await this.teamService.findOneByGroupId(teamid);
    if (!team) throw new NotFoundException("Team Not found");

    if (team.team_leadId !== userid) throw new UnauthorizedException("you cannot add Projects");
    return await this.projectRepo.findOneBy({ projectId: id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, teamid: number, userid: number) {
    const team = await this.teamService.findOneByGroupId(teamid);
    if (!team) throw new NotFoundException("Team Not found");
    return await this.projectRepo.update({ projectId: id }, updateProjectDto);
  }

  async remove(id: number, teamid: number, userid: number) {
    const team = await this.teamService.findOneByGroupId(teamid);
    if (!team) throw new NotFoundException("Team Not found");
    return await this.projectRepo.delete({ projectId: id });
  }


  async findAllTask(projectId: number, userId: number, @Req() req) {
    const role = req.user.role;

    if (role != 'Admin') {
      const lead = this.teamService.findOneByleadId(userId);
      if (!lead) throw new UnauthorizedException("Only Team lead or Admin can see all tasks");
    }


    return await this.projectRepo.findOne({
      where: { projectId: projectId },
      relations: ['tasks']
    })
  }
}
