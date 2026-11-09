import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const password = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password,
        role: data.role,
        city: data.city,
      },
    });

    if (data.role === Role.DOCTOR) {
      await this.prisma.doctorProfile.create({
        data: {
          userId: user.id,
          specialty: data.specialty ?? 'General Medicine',
        },
      });
    }

    if (data.role === Role.PATIENT) {
      await this.prisma.patientProfile.create({ data: { userId: user.id } });
    }

    return this.signToken(user.id, user.email, user.role);
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matched = await bcrypt.compare(data.password, user.password);
    if (!matched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.signToken(user.id, user.email, user.role);
  }

  private signToken(userId: string, email: string, role: Role) {
    const accessToken = this.jwtService.sign({ sub: userId, email, role });
    return { accessToken, user: { id: userId, email, role } };
  }
}
