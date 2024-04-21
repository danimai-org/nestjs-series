import { Media, StorageType } from 'src/entities/media.entity';
import { MediaServiceContract, S3File } from './media.interface';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export class S3Service implements MediaServiceContract {
  storageType = StorageType.S3;
  logger = new Logger(S3Service.name);
  client: S3;

  constructor(
    private mediaRepository: Repository<Media>,
    private configService: ConfigService,
  ) {
    this.client = new S3({
      region: configService.get('storage.region'),
      credentials: {
        accessKeyId: configService.get('storage.accessKeyId'),
        secretAccessKey: configService.get('storage.secretAccessKey'),
      },
    });
  }

  create(file: S3File) {
    return this.mediaRepository.save({
      filename: file.key,
      url: file.location,
      mimetype: file.contentType,
      size: file.size,
      storage_type: this.storageType,
    });
  }

  async delete(media: Media) {
    try {
      await this.client.deleteObject({
        Bucket: this.configService.get('storage.bucket'),
        Key: media.filename,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
