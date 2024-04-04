import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoads } from '../config';

const modules = [];

export const global_modules = [
  ConfigModule.forRoot({
    load: configLoads,
    isGlobal: true,
    envFilePath: ['.env'],
  }),
];

@Module({
  imports: [...global_modules, ...modules],
})
export class AppModule {}
