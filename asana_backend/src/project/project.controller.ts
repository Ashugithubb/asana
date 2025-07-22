import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':teamid')
  create(@Body() createProjectDto: CreateProjectDto,@Param('teamid') teamid:string, @Req() req) {
    
    return this.projectService.createProject(createProjectDto,+teamid,+req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
   @Post(':teamid')
  findOne(@Param('id') id: string,@Param('teamid') teamid:string, @Req() req) {
    return this.projectService.findOne(+id,+teamid,+req.user.id);
  }



  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Post(':teamid')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto,@Param('teamid') teamid:string, @Req() req) {
    return this.projectService.update(+id, updateProjectDto,+teamid,+req.user.id);
  }

   @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Post(':teamid')
  remove(@Param('id') id: string,@Param('teamid') teamid:string, @Req() req) {
    return this.projectService.remove(+id,+teamid,+req.user.id);
  }

   @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  findAllTask(@Param('projectId')projectId:string, @Req() req){
    const userId = req.user.id;
      return this.projectService.findAllTask(+projectId,userId,req)
  }
}
