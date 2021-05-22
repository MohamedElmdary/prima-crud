import { MinLength, IsArray } from 'class-validator';

export class TodoDTO {
  @MinLength(4, {
    message: 'Title min length is 4.',
  })
  title: string;

  @IsArray({
    message: 'List of tasks has to be included.',
  })
  tasks: string[];

  description?: string;
}
