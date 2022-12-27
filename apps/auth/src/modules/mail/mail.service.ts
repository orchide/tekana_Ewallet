import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpException } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendMail(
    email: string,
    content: string,
    subject: string,
    templateName: string,
  ) {
    try {
      const results = await this.mailerService.sendMail({
        from: this.configService.get('IREBERO_SUPPORT'),
        to: email,
        subject,
        template: `${path.join(
          process.env.PWD,
          'src/templates',
        )}/${templateName}`,
        context: {
          name: content,
        },
      });

      console.log(results);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
