import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailData } from 'src/modules/mail/mail.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  createJwtToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      timestamp: Date.now(),
    });
  }

  async userRegisterEmail(
    mailData: MailData<{
      hash: string;
    }>,
  ) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Thank You For Registration, Verify Your Account.',
      text: `${this.configService.get(
        'app.frontendDomain',
      )}/auth/verify?token=${mailData.data.hash}`,
      template: 'auth/registration',
      context: {
        url: `${this.configService.get(
          'app.frontendDomain',
        )}/auth/verify?token=${mailData.data.hash}`,
        app_name: this.configService.get('app.name'),
        title: 'Thank You For Registration, Verify Your Account.',
        actionTitle: 'Verify Your Account',
      },
    });
  }

  async forgotPasswordEmail(
    mailData: MailData<{
      hash: string;
    }>,
  ) {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Here is your Link for Reset Password.',
      text: `${this.configService.get(
        'app.frontendDomain',
      )}/auth/reset-password?token=${mailData.data.hash}`,
      template: 'auth/registration',
      context: {
        url: `${this.configService.get(
          'app.frontendDomain',
        )}/auth/reset-password?token=${mailData.data.hash}`,
        app_name: this.configService.get('app.name'),
        title: 'Here is your Link for Reset Password.',
        actionTitle: 'Reset Password',
      },
    });
  }
}
