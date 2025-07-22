import { Project } from "src/project/entities/project.entity";
import { TeamMember } from "src/team_memebrs/entities/team_memebr.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../enum/status.enum";

@Entity('tasks')
export class Task {
@PrimaryGeneratedColumn()
taskId:number

@Column()
task_name:string

@Column({ type: 'enum', enum: Status,default:Status.PENDING})
task_status: Status

@ManyToOne(()=>Project,(p)=>p.tasks)
project:Project

@ManyToMany(()=>TeamMember,(m)=>m.task)
team_member:TeamMember[]
}
