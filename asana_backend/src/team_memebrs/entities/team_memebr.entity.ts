import { Task } from "src/task/entities/task.entity";
import { Team } from "src/team/entities/team.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn()
  member_Id:number

  @ManyToOne(() => User, (user) => user.team_memberships, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Team, (team) => team.members, { onDelete: 'CASCADE' })
  team: Team;

  @ManyToMany(()=>Task,(t)=>t.team_member)
  @JoinTable()
  task:Task[]
}
