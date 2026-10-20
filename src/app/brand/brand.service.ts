import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBrandDto, SearchBrandDto, UpdateBrandDto } from '~/app/brand/brand.dto';
import { DatabaseService } from '~/database/database.service';

@Injectable()
export class BrandService {
  constructor(private readonly database: DatabaseService) {}

  async create(payload: CreateBrandDto) {
    return this.database.db.orm.public.Brand.create(payload);
  }

  async delete(id: string): Promise<void> {
    const data = await this.database.db.orm.public.Brand.where({ id }).delete();
    if (data) return data;

    throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, payload: UpdateBrandDto) {
    const data = await this.database.db.orm.public.Brand.where({ id }).update(payload);

    if (data) return data;

    throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
  }

  async paginate({ page, limit, name }: SearchBrandDto) {
    const query = this.database.db.orm.public.Brand.where((p) =>
      name ? p.name.ilike(`%${name}%`) : undefined,
    ).orderBy((p) => p.createdAt.desc());
    const { total } = await query.aggregate((p) => ({ total: p.count() }));
    const items = await query
      .limit(limit)
      .offset((page - 1) * limit)
      .all();

    const pages = Math.ceil(total / limit) || 1;

    return {
      items,
      page,
      total,
      pages,
    };
  }
}
