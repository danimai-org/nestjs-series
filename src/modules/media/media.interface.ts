import { Media } from 'src/entities/media.entity';

export interface MediaServiceContract {
  create: (file: Express.Multer.File) => Promise<Media>;
  delete: (media: Media) => Promise<void>;
}

export interface S3File extends Express.Multer.File {
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: any;
  location: string;
  etag: string;
}
