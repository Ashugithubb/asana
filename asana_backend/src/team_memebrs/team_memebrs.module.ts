import { forwardRef, Module } from '@nestjs/common';
import { TeamMemebrsService } from './team_memebrs.service';
import { TeamMemebrsController } from './team_memebrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './entities/team_memebr.entity';
import { UserModule } from 'src/user/user.module';
import { TeamModule } from 'src/team/team.module';

@Module({
  imports:[TypeOrmModule.forFeature([TeamMember]),UserModule,forwardRef(() => TeamModule)],
  controllers: [TeamMemebrsController],
  providers: [TeamMemebrsService],
  exports:[TeamMemebrsService]
})
export class TeamMemebrsModule {}
