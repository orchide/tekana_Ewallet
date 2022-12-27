import { MailService } from './../mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';

@Module({
  controllers: [EmailVerificationController],
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [EmailVerificationService, MailService],
  exports: [EmailVerificationService, EmailVerificationModule],
})
export class EmailVerificationModule {}
