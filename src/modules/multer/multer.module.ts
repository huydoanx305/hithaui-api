import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { DEFAULT_DEST } from '@common/constants/multer.constant';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: DEFAULT_DEST,
      }),
    }),
  ],
})
export class MulterConfigModule {}
