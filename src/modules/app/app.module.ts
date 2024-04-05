import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoads } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfigFactory } from '../database/typeorm.factory';

const modules = [];

export const global_modules = [
  ConfigModule.forRoot({
    load: configLoads,
    isGlobal: true,
    envFilePath: ['.env'],
  }),
  TypeOrmModule.forRootAsync({
    useClass: TypeORMConfigFactory,
  }),
];

@Module({
  imports: [...global_modules, ...modules],
})
export class AppModule {}
