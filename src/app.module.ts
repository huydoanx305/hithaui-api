import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { MulterConfigModule } from '@/modules/multer/multer.module';
import appConfig, { configValidationSchema } from '@common/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: configValidationSchema,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    MulterConfigModule,
  ],
})
export class AppModule {}
