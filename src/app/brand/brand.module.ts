import { Module } from '@nestjs/common';

import { BrandController } from '~/app/brand/brand.controller';
import { BrandService } from '~/app/brand/brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [],
})
export class BrandModule {}
