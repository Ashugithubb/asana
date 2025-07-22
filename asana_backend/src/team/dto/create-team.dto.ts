import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString({ message: 'Team name must be a string' })
  @IsNotEmpty({ message: 'Team name cannot be empty' })
  team_name: string;

  @IsString({ message: 'Team lead must be a string' })
  @IsNotEmpty({ message: 'Team lead cannot be empty' })
  team_lead: string;
}
