import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    return "This action adds a new auth";
    // const user = await this.prisma.user.create({
    //   data: {
    //     email: createAuthDto.email,
    //     password: createAuthDto.password,
    //   },
    // });
  }

  async login(loginDto: LoginAuthDto) {
    return "This action logs in an auth";
  }
}
