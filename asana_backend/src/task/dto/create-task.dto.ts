import { IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    task_name:string
}
