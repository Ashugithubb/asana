import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team) private readonly teamRepo: Repository<Team>,
    private readonly userService: UserService,
    private readonly projectService:ProjectService) { }

  async createTeam(createTeamDto: CreateTeamDto, userId: number) {
    const lead = createTeamDto.team_lead;
    const teamLead = await this.teamRepo.findOneBy({team_lead:createTeamDto.team_lead});

    const team = teamLead?.team_name;

    if(teamLead) return {"msg":`${lead} is already team lead of ${team} team`}

    const user = await this.userService.findOne(userId);
    if (!user) return { "msg": "You are not Authorized" }
    const newTeam = this.teamRepo.create({
      ...createTeamDto,
      admin: user
    })
    return await this.teamRepo.save(newTeam);
  }


  async findAllTeam() {
    return await this.teamRepo.find();
  }



 async findOne(teamName: string) {
  const team = await this.teamRepo.findOne({
    where: { team_name: teamName },
  });
  if (!team) {
    throw new NotFoundException(`Team with name ${teamName} not found`);
  }

  return team;
}
async findOneByGroupId(teamId:number){
  return await this.teamRepo.findOneBy({teamId});
}


 async update(teamName: string, updateTeamDto: UpdateTeamDto) {
  await this.teamRepo.update({ team_name: teamName }, updateTeamDto);
  return { message: 'Team updated successfully' };
}


  async remove(teamName:string) {
    return await this.teamRepo.delete({team_name:teamName}) ;
  }



  async seeAllProjecofTeam(teamName:string){
      const exist = await this.teamRepo.findOne( {
        where:{team_name:teamName},
        relations:["projects"]
      });
      if(!exist) throw new NotFoundException("Team not Found");     
      return exist;
  }
}
