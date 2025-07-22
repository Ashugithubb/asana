import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Task } from './entities/task.entity';
import { ProjectModule } from 'src/project/project.module';
import { UserModule } from 'src/user/user.module';
import { TeamMemebrsService } from 'src/team_memebrs/team_memebrs.service';
import { TeamMemebrsModule } from 'src/team_memebrs/team_memebrs.module';

@Module({
  imports:[TypeOrmModule.forFeature([Task]),ProjectModule,TeamMemebrsModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports:[TaskService],
})
export class TaskModule {}



