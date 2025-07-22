import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Task } from './entities/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService],
})
export class TaskModule {}
