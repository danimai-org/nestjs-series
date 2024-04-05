import { Column, Entity, OneToMany } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base';
import { Token } from './user_token.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ example: 'Danimai' })
  @Column({ type: 'varchar', length: 50 })
  first_name: string;

  @ApiProperty({ example: 'Mandal' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  last_name: string;

  @ApiProperty({ example: 'example@danimai.com' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ example: 'Password@123' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @ApiHideProperty()
  @Column({ type: 'timestamp with time zone', nullable: true })
  email_verified_at: Date;

  @ApiHideProperty()
  @Column({ type: 'boolean', default: false })
  is_active: boolean;

  @ApiHideProperty()
  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];
}
