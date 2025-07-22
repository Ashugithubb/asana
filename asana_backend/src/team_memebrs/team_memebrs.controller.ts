import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamMemebrsService } from './team_memebrs.service';
import { CreateTeamMemebrDto } from './dto/create-team_memebr.dto';
import { UpdateTeamMemebrDto } from './dto/update-team_memebr.dto';

@Controller('team-memebrs')
export class TeamMemebrsController {
  constructor(private readonly teamMemebrsService: TeamMemebrsService) {}

  @Post('/:userId/:teamId')
  create(@Param('userId')userId:string,
          @Param('teamId')teamId:string,) {
    return this.teamMemebrsService.create(+userId,+teamId);
  }

  @Get()
  findAll() {
    return this.teamMemebrsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMemebrsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamMemebrDto: UpdateTeamMemebrDto) {
    return this.teamMemebrsService.update(+id, updateTeamMemebrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamMemebrsService.remove(+id);
  }
}
