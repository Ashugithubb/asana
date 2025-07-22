import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamMemebrDto } from './dto/create-team_memebr.dto';
import { UpdateTeamMemebrDto } from './dto/update-team_memebr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './entities/team_memebr.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class TeamMemebrsService {
  constructor(@InjectRepository(TeamMember) private readonly teamMemebrRepo: Repository<TeamMember>,
    private readonly userService: UserService,
    // private readonly teamService:TeamService 
    @Inject(forwardRef(() => TeamService))
    private teamService: TeamService
  ) { }


  async create(userId: number, teamId: number) {
  const user = await this.userService.findOne(userId);
  if (!user) throw new NotFoundException("User not Found");

  const team = await this.teamService.findOneByGroupId(teamId);
  if (!team) throw new NotFoundException("Team not Found");

  const existing = await this.teamMemebrRepo.findOne({
    where: {
      user: { userId: userId },
      team: { teamId: teamId }
    },
    relations: ['user', 'team']
  });

  if (existing) throw new ConflictException('User already exists in this team');

  const newMember = this.teamMemebrRepo.create({
    user,
    team
  });

  await this.teamMemebrRepo.save(newMember);
  return { msg: "Member added" };
}


  findAll() {
    return `This action returns all teamMemebrs`;
  }

  async findOne(id: number) {
    return await this.teamMemebrRepo.findOneBy({member_Id:id});
  }

  update(id: number, updateTeamMemebrDto: UpdateTeamMemebrDto) {
    return `This action updates a #${id} teamMemebr`;
  }

  remove(id: number) {
    return `This action removes a #${id} teamMemebr`;
  }
}
