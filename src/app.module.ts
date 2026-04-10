import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Tambahkan ini [cite: 135]
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { BookModule } from './book/book.module';
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Konfigurasi Environment Variable [cite: 138-144]
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    StudentsModule,
    BookModule,
    PeminjamanModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}