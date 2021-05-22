import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TodoDTO } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  public createTodo({ tasks, title, description }: TodoDTO, userId: number) {
    return this.prisma.todo.create({
      data: {
        userId,
        title,
        description,
        tasks: {
          createMany: {
            data: tasks.map((details) => ({ details })),
          },
        },
      },
      include: {
        tasks: true,
      },
    });
  }

  public getTodos(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
    });
  }

  public getTodo(id: number) {
    return this.prisma.todo.findFirst({
      where: { id },
      include: {
        tasks: true,
      },
    });
  }
}
