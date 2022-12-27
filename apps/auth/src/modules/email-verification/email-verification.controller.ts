import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { CreateEmailVerificationDto } from './dto/create-email-verification.dto';
import { UpdateEmailVerificationDto } from './dto/update-email-verification.dto';

@Controller('auth/verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Get(':token')
  create(
    @Body() createEmailVerificationDto: CreateEmailVerificationDto,
    @Param('token') token: string,
  ) {
    return this.emailVerificationService.verifyEmail(token);
  }

  @Post('resend')
  async retry(@Body() body: any) {
    await this.emailVerificationService.sendVerificationLink(body.email);

    return {
      data: 'Verification email sent successfully',
    };
  }
}
