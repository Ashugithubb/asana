import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Team } from 'src/team/entities/team.entity';
import { TeamMember } from 'src/team_memebrs/entities/team_memebr.entity';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities:[User,Team,TeamMember,Project,Task],
    synchronize: true,
    // migrations: ['dist/migrations/**/*.js'],
  }),
};