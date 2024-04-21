import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { Media } from 'src/entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
