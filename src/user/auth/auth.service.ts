import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/login.dto';
import { SigninUserDto } from './dtos/signin.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService,
  ) {}

  async login(user: LoginUserDto) {
    const isUserExits = await this.databaseService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!isUserExits) throw new NotFoundException('User not found');

    const isPasswordMatch = await bcrypt.compare(
      user.password,
      isUserExits.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('Password not match');

    const payload = {
      id: isUserExits.id,
      email: isUserExits.email,
      name: isUserExits.name,
    };

    const token = this.jwtService.sign(payload);

    await this.databaseService.user.update({
      where: {
        id: isUserExits.id,
      },
      data: {
        token: token,
      },
    });
    return {
      message: 'Login success',
      token: token,
    };
  }

  async register(user: SigninUserDto) {
    const isUserExits = await this.databaseService.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (isUserExits) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.databaseService.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
      },
    });

    const payload = {
      sub: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    const token = this.jwtService.sign(payload);
    const updatedUser = await this.databaseService.user.update({
      where: {
        id: newUser.id,
      },
      data: {
        token: token,
      },
    });
    return {
      message: 'Register successfully',
      data: updatedUser,
    };
  }
}
