import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrandModule } from '~/app/brand/brand.module';

import configuration from '~/config/configuration';
import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    DatabaseModule,
    BrandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
