import { Task } from "src/task/entities/task.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export class Project {
    @PrimaryGeneratedColumn()
    projectId: number

    @Column()
    project_name: string

    @CreateDateColumn()
    assignedAt: Date

    @Column()
    Deadline: string

    @ManyToOne(()=>Team,(t)=>t.projects)
    team:Team

    @OneToMany(()=>Task,(t)=>t.project)
    tasks:Task[]
}
