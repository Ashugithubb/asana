import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ProjectService } from 'src/project/project.service';
import { UserModule } from 'src/user/user.module';
import { TeamMemebrsService } from 'src/team_memebrs/team_memebrs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>,
    private readonly projectService: ProjectService,
    private readonly memberService: TeamMemebrsService) { }

  async createTask(createTaskDto: CreateTaskDto, projectId: number, memberId: number) {
    const member = await this.memberService.findOne(memberId);
    if (!member) throw new NotFoundException("Member not Found");

    const project = await this.projectService.findOneByProjectId(projectId);
    if (!project) throw new NotFoundException("Project not Found");

    const task = this.taskRepo.create({
      ...createTaskDto,
      project,
      team_member: [member] 
    });

    await this.taskRepo.save(task); // Don’t forget to save it!

    return { message: 'Task created successfully', task };
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
