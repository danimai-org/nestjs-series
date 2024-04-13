import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './services/email.service';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.secret'),
        signOptions: { expiresIn: configService.get('auth.expires') },
      }),
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, AuthService],
})
export class AuthModule {}
