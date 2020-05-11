import { Controller, Get, Body, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() login: LoginDto, @Request() req: any) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  getProfile(@Request() req) {
    return req.user;
  }
}
