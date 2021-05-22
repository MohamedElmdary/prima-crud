import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { UserService } from 'src/user/user.service';
import { TodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
@UsePipes(ValidationPipe)
export class TodoController {
  constructor(
    private userService: UserService,
    private todoService: TodoService,
  ) {}

  @Post()
  createTodo(@User() userId: number, @Body() todo: TodoDTO) {
    return this.userService
      .getUserById(userId)
      .then(() => {
        return this.todoService.createTodo(todo, userId);
      })
      .catch(() => {
        return new InternalServerErrorException();
      });
  }

  @Get(':id')
  getTodoWithId(@User() userId: number, @Query('id') todoId: number) {
    return this.userService
      .isUserExist(userId)
      .then(() => {
        return this.todoService.getTodo(todoId);
      })
      .then((todo) => {
        if (!todo) {
          return new NotFoundException();
        }

        if (todo.userId !== userId) {
          return new UnauthorizedException();
        }

        return todo;
      })
      .catch(() => {
        return new InternalServerErrorException();
      });
  }

  @Get()
  getTodos(@User() userId: number) {
    return this.userService
      .isUserExist(userId)
      .then(() => {
        return this.todoService.getTodos(userId);
      })
      .catch(() => {
        return new InternalServerErrorException();
      });
  }
}
