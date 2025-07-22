import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config.ts/typeorm.config';
import { TeamModule } from './team/team.module';
import { TeamMemebrsModule } from './team_memebrs/team_memebrs.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRootAsync(typeOrmConfig),UserModule, 
    TeamModule,  TeamMemebrsModule, 
    ProjectModule, TaskModule,AuthModule],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
