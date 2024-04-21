import { Media, StorageType } from 'src/entities/media.entity';
import { MediaServiceContract } from './media.interface';
import { Repository } from 'typeorm';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { Logger } from '@nestjs/common';

export class LocalService implements MediaServiceContract {
  storageType = StorageType.LOCAL;
  logger = new Logger(LocalService.name);

  constructor(private mediaRepository: Repository<Media>) {}

  create(file: Express.Multer.File) {
    return this.mediaRepository.save({
      filename: file.filename,
      url: `/${file.destination}/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
      storage_type: this.storageType,
    });
  }

  async delete(media: Media) {
    try {
      fs.unlinkSync(path.join(process.cwd(), media.url.replace('/v1', '')));
      await this.mediaRepository.delete(media.id);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
