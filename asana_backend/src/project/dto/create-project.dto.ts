import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'Project name must be a string' })
  @IsNotEmpty({ message: 'Project name cannot be empty' })
  project_name: string;

  @IsString({ message: 'Deadline must be a valid string or date' })
  @IsNotEmpty({ message: 'Deadline cannot be empty' })
  Deadline: string;
}
