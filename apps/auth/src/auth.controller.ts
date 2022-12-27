import { IsEmailActivatedGuard } from '@app/common/core/guards/is-email-activated.guard';
import { EmailVerificationService } from './modules/email-verification/email-verification.service';
import { DoesUserExist } from '@app/common';
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './core/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly emailVerification: EmailVerificationService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<any> {
    const userData: any = await this.authService.create(user);

    // await this.emailVerification.sendVerificationLink(user.email);

    return userData;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Request() req) {
    console.log(req.user.id);
    return await this.authService.me(req);
  }
}
