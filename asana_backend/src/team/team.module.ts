import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports:[TypeOrmModule.forFeature([Team]),UserModule,ProjectModule],
  controllers: [TeamController],
  providers: [TeamService],
  exports:[TeamService]
})
export class TeamModule {}
