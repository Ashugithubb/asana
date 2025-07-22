import { Project } from "src/project/entities/project.entity";
import { TeamMember } from "src/team_memebrs/entities/team_memebr.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
@PrimaryGeneratedColumn()
taskId:number

@Column()
task_name:string

@ManyToOne(()=>Project,(p)=>p.tasks)
project:Project

@ManyToMany(()=>TeamMember,(m)=>m.task)
team_member:TeamMember[]
}
