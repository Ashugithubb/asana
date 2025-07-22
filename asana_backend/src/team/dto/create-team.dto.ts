import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString({ message: 'Team name must be a string' })
  @IsNotEmpty({ message: 'Team name cannot be empty' })
  team_name: string;

  @IsInt()
  @IsNotEmpty({ message: 'Team lead cannot be empty' })
  team_leadId:number;
}
