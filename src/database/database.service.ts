import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { db } from '~/database';

@Injectable()
export class DatabaseService implements OnModuleInit {
  readonly db = db;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const DATABASE_URL = this.config.get<string>('DATABASE_URL');

    await this.db.connect({ url: DATABASE_URL });
  }
}
