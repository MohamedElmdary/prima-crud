import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { TodoController } from './todo/todo.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TodoController],
  providers: [PrismaService, UserService, TodoService],
})
export class AppModule {}
