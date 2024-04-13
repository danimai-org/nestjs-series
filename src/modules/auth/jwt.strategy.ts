import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
      ignoreExpiration: false,
    });
  }

  public async validate(payload: JwtPayload) {
    try {
      const user = await this.userRepository.findOneByOrFail({
        id: payload.id,
      });

      if (!user.email_verified_at) {
        throw new UnauthorizedException('Please verify your email.');
      }

      if (!user.is_active) {
        throw new ForbiddenException('Your account is not active.');
      }
      return user;
    } catch {
      throw new UnauthorizedException('User is not authorized.');
    }
  }
}
