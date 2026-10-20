import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

import { PaginationDto } from '~/utils/pagination.dto';

@ApiSchema({ description: 'Create brand DTO' })
export class CreateBrandDto {
  @IsString()
  @Length(1, 255)
  @ApiProperty({
    minLength: 1,
    maxLength: 255,
    type: 'string',
    example: 'Nike',
    description: 'The name of the brand',
  })
  name: string;
}

@ApiSchema({ description: 'Update brand DTO' })
export class UpdateBrandDto {
  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    maxLength: 255,
    type: 'string',
    required: false,
    example: 'Nike',
    description: 'The name of the brand',
  })
  name: string;
}

@ApiSchema({ description: 'Search brand DTO' })
export class SearchBrandDto extends PaginationDto {
  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiProperty({
    minLength: 1,
    maxLength: 255,
    required: false,
    type: 'string',
    example: 'Nike',
    description: 'The name of the brand to search for',
  })
  name: string;
}

@ApiSchema({ description: 'Brand DTO' })
export class BrandDto {
  @ApiProperty({ type: 'string', example: '1', description: 'The ID of the brand' })
  id: string;

  @ApiProperty({ type: 'string', example: 'Nike', description: 'The name of the brand' })
  name: string;

  @ApiProperty({
    type: 'string',
    example: '2023-01-01',
    description: 'The date the brand was created',
  })
  createdAt: string;
}
