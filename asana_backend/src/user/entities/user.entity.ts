import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender, Role } from "../enum/user.enum";
import { Team } from "src/team/entities/team.entity";
import { TeamMember } from "src/team_memebrs/entities/team_memebr.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    Organization: string

    @Column({ type: 'enum', enum: Role })
    role: Role

    @Column({ type: 'enum', enum: Gender })
    gender: Gender

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Team, (t) => t.admin)
    team: Team[]

    @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
    team_memberships: TeamMember[];
}


