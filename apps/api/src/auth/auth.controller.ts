import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodResponse } from "nestjs-zod";

// DTO
import { CreateAuthDto, UserResponseDto } from "./dto/create-auth.dto";
import { LoginAuthDto, LoginResponseDto } from "./dto/login-auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ZodResponse({ type: UserResponseDto })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @Post("login")
  @ZodResponse({ type: LoginResponseDto })
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.loginUser(loginDto);
  }
}
