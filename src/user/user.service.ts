import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDTO } from './user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public createUser(user: UserDTO) {
    return this.prisma.user.create({
      data: user,
    });
  }

  public createToken(id: number) {
    return sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  public getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  public getUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  public isUserExist(id: number) {
    return this.prisma.user
      .findFirst({
        where: { id },
        select: {
          id: true,
        },
      })
      .then((user) => {
        if (!user) {
          return new UnauthorizedException();
        }

        return id;
      });
  }
}
