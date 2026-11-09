import { ConflictException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../generated/prisma/client';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async onModuleInit() {
    if ((await this.prisma.user.count()) === 0) {
      await this.prisma.user.create({ data: {
        email: this.config.get<string>('ADMIN_EMAIL')!,
        passwordHash: await bcrypt.hash(this.config.get<string>('ADMIN_PASSWORD')!, 10),
        role: Role.ADMIN } });
      console.log('Default admin created');
    }
  }
  async login(email: string, password: string) {
    const u = await this.prisma.user.findUnique({ where: { email } });
    if (!u || !(await bcrypt.compare(password, u.passwordHash))) throw new UnauthorizedException('Wrong email or password');
    return { accessToken: await this.jwt.signAsync({ sub: u.id, email: u.email, role: u.role }) };
  }
  async register(email: string, password: string, role: Role) {
    if (await this.prisma.user.findUnique({ where: { email } })) throw new ConflictException('Email already used');
    const u = await this.prisma.user.create({ data: { email, passwordHash: await bcrypt.hash(password, 10), role } });
    return { id: u.id, email: u.email, role: u.role };
  }
}
