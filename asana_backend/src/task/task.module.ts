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


// npm install lru-cache
// import LRU from 'lru-cache';

// const cache = new LRU<string, any>({
//   max: 10,
//   ttl: 1000 * 60 * 5, // optional: expire after 5 minutes
// });

// const handleSearch = async (query: string) => {
//   if (cache.has(query)) {
//     setResults(cache.get(query));
//     return;
//   }

//   const res = await axios.get(`/api/search?q=${query}`);
//   cache.set(query, res.data);
//   setResults(res.data);
// };
