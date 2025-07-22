import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto, @Req() req) {
    const role = req.user.role;
    const userId = req.user.id
    if (role !== 'Admin') return { "msg": "only Admin can create Team" };
    return this.teamService.createTeam(createTeamDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const role = req.user.role;
    if (role !== 'Admin') return { "msg": "only Admin can see all Team" };
    return this.teamService.findAllTeam();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:teamName')
  findOne(@Param('teamName') teamName: string, @Req() req) {
    const role = req.user.role;
    if (role !== 'Admin') {
      throw new ForbiddenException('Only Admin can see all teams');
    }
    return this.teamService.findOne(teamName);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:teamName')
  update(@Param('teamName') teamName: string, @Body() updateTeamDto: UpdateTeamDto, @Req() req) {
    const role = req.user.role;
    if (role !== 'Admin')throw new ForbiddenException( "only Admin can Update Team Deatils" );
    return this.teamService.update(teamName, updateTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:teamName')
  remove(@Param('teamName') teamName: string, @Req() req) {
    const role = req.user.role;
    if (role !== 'Admin') throw new ForbiddenException( "only Admin can Update Team Deatils" );
    return this.teamService.remove(teamName);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':teamName')
  async  seeAllProjecofTeam(@Param('teamName') teamName:string){
      return this.teamService.seeAllProjecofTeam(teamName);
  }

}
