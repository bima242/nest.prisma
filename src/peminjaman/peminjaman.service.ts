import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePeminjamanDto, user: any) {
    // Tentukan studentId yang digunakan
    // Jika SISWA, wajib menggunakan studentId dari token (akun mereka sendiri)
    // Jika ADMIN/PETUGAS, bisa input studentId manapun
    let finalStudentId: number;
    
    if (user.role === 'SISWA') {
      // Siswa hanya bisa meminjam untuk dirinya sendiri
      if (!user.studentId) {
        throw new ForbiddenException('Akun siswa ini belum terhubung dengan data siswa. Hubungi admin.');
      }
      finalStudentId = user.studentId;
    } else {
      // ADMIN/PETUGAS wajib input studentId
      if (!dto.studentId) {
        throw new BadRequestException('studentId wajib diisi untuk admin/petugas');
      }
      finalStudentId = dto.studentId;
    }

    // 1. Cek buku ada atau tidak
    const buku = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });
    if (!buku) {
      throw new NotFoundException(`Buku dengan ID ${dto.bookId} tidak ditemukan`);
    }

    // 2. Cek student ada atau tidak
    const student = await this.prisma.student.findUnique({
      where: { id: finalStudentId },
    });
    if (!student) {
      throw new NotFoundException(`Student dengan ID ${finalStudentId} tidak ditemukan`);
    }

    // 3. Cek apakah buku sedang dipinjam (belum dikembalikan)
    const sedangDipinjam = await this.prisma.peminjaman.findFirst({
      where: {
        bookId: dto.bookId,
        tanggalKembali: null,
      },
    });
    if (sedangDipinjam) {
      throw new BadRequestException(`Buku "${buku.title}" sedang dipinjam oleh student lain`);
    }

    // 4. Siapkan data (convert string tanggal ke Date midnight)
    const data: any = {
      bookId: dto.bookId,
      studentId: finalStudentId,
    };

    if (dto.tanggalPinjam) {
      data.tanggalPinjam = new Date(dto.tanggalPinjam + 'T00:00:00.000Z');
    }

    if (dto.tanggalKembali) {
      data.tanggalKembali = new Date(dto.tanggalKembali + 'T00:00:00.000Z');
    }

    // 5. Create dan include nama buku + nama student
    return this.prisma.peminjaman.create({
      data,
      include: {
        buku: { select: { title: true } },
        student: { select: { name: true } },
      },
    });
  }

  findAll() {
    return this.prisma.peminjaman.findMany({
      include: {
        buku: { select: { title: true } },
        student: { select: { name: true } },
      },
    });
  }

  async findOne(id: number, user: any) {
    const peminjaman = await this.prisma.peminjaman.findUnique({
      where: { id },
      include: {
        buku: { select: { title: true } },
        student: { select: { name: true, id: true } },
      },
    });
    if (!peminjaman) {
      throw new NotFoundException(`Peminjaman dengan ID ${id} tidak ditemukan`);
    }

    // Validasi: SISWA hanya bisa melihat peminjaman miliknya sendiri
    // Gunakan studentId dari token untuk perbandingan
    if (user.role === 'SISWA' && peminjaman.student.id !== user.studentId) {
      throw new ForbiddenException('Anda hanya bisa melihat peminjaman Anda sendiri');
    }

    return peminjaman;
  }

  async update(id: number, dto: UpdatePeminjamanDto) {
    // Cek peminjaman ada
    await this.findOne(id, { role: 'ADMIN', userId: 0 }); // akan throw kalau tidak ada

    const data: any = { ...dto };

    if (dto.tanggalPinjam !== undefined) {
      data.tanggalPinjam = new Date(dto.tanggalPinjam + 'T00:00:00.000Z');
    }

    if (dto.tanggalKembali !== undefined) {
      data.tanggalKembali = new Date(dto.tanggalKembali + 'T00:00:00.000Z');
    }

    return this.prisma.peminjaman.update({
      where: { id },
      data,
      include: {
        buku: { select: { title: true } },
        student: { select: { name: true } },
      },
    });
  }

  async remove(id: number) {
    // Cek dulu ada
    await this.findOne(id, { role: 'ADMIN', userId: 0 });
    return this.prisma.peminjaman.delete({ where: { id } });
  }

  async kembalikan(id: number, user: any) {
    const peminjaman = await this.prisma.peminjaman.findUnique({
      where: { id },
      include: {
        buku: { select: { title: true } },
        student: { select: { name: true, id: true } },
      },
    });

    if (!peminjaman) {
      throw new NotFoundException(`Peminjaman dengan ID ${id} tidak ditemukan`);
    }

    // Validasi: SISWA hanya bisa mengembalikan buku miliknya sendiri
    // Gunakan studentId dari token untuk perbandingan
    if (user.role === 'SISWA' && peminjaman.student.id !== user.studentId) {
      throw new ForbiddenException('Anda hanya bisa mengembalikan buku yang Anda pinjam');
    }

    const hariIni = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Ubah logika supaya tidak lempar 400, tapi kasih response 200 dengan pesan berbeda
    if (peminjaman.tanggalKembali) {
      return {
        message: `Buku telah dikembalikan pada ${peminjaman.tanggalKembali}`,
        peminjaman,
        sudahDikembalikan: true
      };
    }

    // Jika belum dikembalikan, lakukan update
    const updated = await this.prisma.peminjaman.update({
      where: { id },
      data: { tanggalKembali: hariIni },
      include: {
        buku: { select: { title: true } },
        student: { select: { name: true } },
      },
    });

    return {
      message: 'Buku berhasil dikembalikan',
      peminjaman: updated,
      sudahDikembalikan: false
    };
  }

  // ======================================================================
  // Tambahan baru: Cek status semua buku (tersedia / sedang dipinjam / sudah dikembalikan)
  // ======================================================================
  async getStatusBuku() {
    // Ambil semua buku
    const semuaBuku = await this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    // Ambil peminjaman aktif (belum dikembalikan)
    const peminjamanAktif = await this.prisma.peminjaman.findMany({
      where: {
        tanggalKembali: null,
      },
      select: {
        bookId: true,
        tanggalPinjam: true,
        student: {
          select: {
            name: true,
          },
        },
      },
    });

    // Buat status per buku
    const statusList = semuaBuku.map((buku) => {
      const dipinjam = peminjamanAktif.find((p) => p.bookId === buku.id);

      if (dipinjam) {
        return {
          bookId: buku.id,
          title: buku.title,
          status: 'Sedang Dipinjam',
          dipinjamOleh: dipinjam.student.name,
          tanggalPinjam: dipinjam.tanggalPinjam.toISOString().split('T')[0],
        };
      }

      return {
        bookId: buku.id,
        title: buku.title,
        status: 'Tersedia',
        dipinjamOleh: null,
        tanggalPinjam: null,
      };
    });

    return statusList;
  }
}
