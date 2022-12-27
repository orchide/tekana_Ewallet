import { Inject, Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { where } from 'sequelize/types';

import VerificationTokenPayload from '@app/common/core/interfaces/interface.verification';
import { User } from '@app/common/database/Models/model.user';

import { MailService } from '../mail/mail.service';
import { CreateEmailVerificationDto } from './dto/create-email-verification.dto';
import { UpdateEmailVerificationDto } from './dto/update-email-verification.dto';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: MailService,
  ) {}

  async verifyEmail(token: string) {
    const data: any = this.jwtService.decode(token);

    console.log(data);

    if (!data) throw new HttpException('Invalid verification link', 401);

    if (Date.now() >= data.exp * 1000) {
      throw new HttpException(
        'Expired verification link please try again',
        401,
      );
    }

    const user: any = await User.findOne(data.email);

    if (user.dataValues.isEmailVerified === true)
      throw new HttpException('email is already verified', 400);

    if (user) {
      await User.update(
        {
          isEmailVerified: true,
        },
        {
          where: {
            email: data.email,
          },
        },
      );

      return {
        success: 'Email validation successful !',
      };
    } else {
      throw new HttpException('No resource found', 401);
    }
  }

  async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      expiresIn: '5m',
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    await this.emailService.sendMail(
      email,
      text,
      'verification email',
      'confirmations',
    );
  }

  // async resendVerificationEmail(email: string) {

  // }

  findAll() {
    return `This action returns all emailVerification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailVerification`;
  }

  update(id: number, updateEmailVerificationDto: UpdateEmailVerificationDto) {
    return `This action updates a #${id} emailVerification`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailVerification`;
  }
}
