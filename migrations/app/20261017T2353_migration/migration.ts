#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2c4f14e1e84c52e4d22ff1c15ed877187c94e432ad34b07fc8d28e861a194cf6/contract';
import endContract from '../../snapshots/2c4f14e1e84c52e4d22ff1c15ed877187c94e432ad34b07fc8d28e861a194cf6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'brands',
        columns: [
          col('createdAt', 'date', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/date-temporal@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'product_skus',
        columns: [
          col('amount', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('atributtes', 'json', { notNull: true, codecRef: { codecId: 'pg/json@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('price', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('productId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('skuId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'products',
        columns: [
          col('brandId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'date', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/date-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'product_skus',
        index: 'product_skus_productId_idx_5858600a',
        columns: ['productId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'products',
        index: 'products_brandId_idx_02e95397',
        columns: ['brandId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'product_skus',
        foreignKey: {
          name: 'product_skus_productId_fkey',
          columns: ['productId'],
          references: { schema: 'public', table: 'products', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'products',
        foreignKey: {
          name: 'products_brandId_fkey',
          columns: ['brandId'],
          references: { schema: 'public', table: 'brands', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
