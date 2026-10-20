import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';

import { CreateBrandDto, SearchBrandDto, UpdateBrandDto } from '~/app/brand/brand.dto';
import { BrandService } from '~/app/brand/brand.service';
import { ByIdDto } from '~/utils/by-id.dto';
import { ExceptionSchema } from '~/utils/exception.schema';
import { PaginationDto } from '~/utils/pagination.dto';

@Controller('brand')
@ApiInternalServerErrorResponse({
  schema: { $ref: '#/components/schemas/ExceptionSchema' },
  description: 'Internal server error',
})
@ApiBadRequestResponse({
  description: 'The brand ID is invalid or the request body is invalid',
  schema: { $ref: '#/components/schemas/ExceptionSchema' },
})
@ApiNotFoundResponse({
  description: 'The brand with the given ID was not found',
  schema: { $ref: '#/components/schemas/ExceptionSchema' },
})
@ApiTags("Brand")
@ApiExtraModels(PaginationDto, SearchBrandDto, ExceptionSchema)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  @ApiCreatedResponse({
    description: 'The brand has been successfully created',
  })
  async create(@Body() body: CreateBrandDto, @Res() res: Response) {
    const data = await this.brandService.create(body);

    res.status(HttpStatus.CREATED).json(data);
  }

  @Delete('delete/:id')
  @ApiOkResponse({
    description: 'The brand has been successfully deleted',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'The ID of the brand to delete' })
  async delete(@Param() params: ByIdDto, @Res() res: Response) {
    await this.brandService.delete(params.id);

    res.status(HttpStatus.OK).send();
  }

  @Get('paginated')
  @ApiOkResponse({
    description: 'The brands have been successfully retrieved',
  })
  async paginated(@Query() query: SearchBrandDto, @Res() res: Response) {
    const data = await this.brandService.paginate(query);

    res.status(HttpStatus.OK).json(data);
  }

  @Patch('update/:id')
  @ApiOkResponse({
    description: 'The brand has been successfully updated',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'The ID of the brand to update' })
  async update(@Body() body: UpdateBrandDto, @Param() params: ByIdDto, @Res() res: Response) {
    const data = await this.brandService.update(params.id, body);

    res.status(HttpStatus.OK).json(data);
  }
}
