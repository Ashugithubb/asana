import { Project } from "src/project/entities/project.entity";
import { TeamMember } from "src/team_memebrs/entities/team_memebr.entity";
import { User } from "src/user/entities/user.entity";
import { Admin, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('team')
export class Team {
    @PrimaryGeneratedColumn()
    teamId:number

    @Column()
    team_name:string

    @Column({unique:true})
    team_leadId:number

    @CreateDateColumn()
    createdAt:Date

    @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
    members: TeamMember[];

    @ManyToOne(()=>User,(a)=>a.team)
    admin:User

    @OneToMany(()=>Project,(p)=>p.team)
    projects:Project[]
}
