import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { Token } from 'src/entities/user_token.entity';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UserService, TokenService],
  exports: [UserService, TokenService],
})
export class UserModule {}
