import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      // optional: log query kalau lagi debug
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // Kalau kamu tambah method custom seperti findAll/findOne, letakkan di sini
  // Contoh (hapus kalau tidak perlu):
  // async findAllBooks() {
  //   return this.book.findMany();
  // }

  // async findOneBook(id: number) {
  //   return this.book.findUnique({ where: { id } });
  // }
}