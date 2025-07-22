import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMemebrDto } from './create-team_memebr.dto';

export class UpdateTeamMemebrDto extends PartialType(CreateTeamMemebrDto) {}
