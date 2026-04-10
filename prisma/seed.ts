import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type Role = 'ADMIN' | 'PETUGAS' | 'SISWA';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Admin user (can do everything)
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Created admin user: ${admin.username} (role: ${admin.role})`);

  // Create Petugas user (can modify book and peminjaman)
  const petugasPassword = await bcrypt.hash('petugas123', 10);
  const petugas = await prisma.user.upsert({
    where: { username: 'petugas' },
    update: {},
    create: {
      username: 'petugas',
      password: petugasPassword,
      role: 'PETUGAS',
    },
  });
  console.log(`✅ Created petugas user: ${petugas.username} (role: ${petugas.role})`);
  
  // Create Siswa user (can only borrow books)
  const siswaPassword = await bcrypt.hash('siswa123', 10);
  const siswa = await prisma.user.upsert({
    where: { username: 'siswa' },
    update: {},
    create: {
      username: 'siswa',
      password: siswaPassword,
      role: 'SISWA',
    },
  });
  console.log(`✅ Created siswa user: ${siswa.username} (role: ${siswa.role})`);

  // Also create some sample students for peminjaman
  const student1 = await prisma.student.upsert({
    where: { nis: '12345' },
    update: {},
    create: {
      nis: '12345',
      name: 'Budi Santoso',
      email: 'budi@siswa.com',
      kelas: 'XII-A',
      jurusan: 'IPA',
    },
  });
  console.log(`✅ Created sample student: ${student1.name}`);

  const student2 = await prisma.student.upsert({
    where: { nis: '12346' },
    update: {},
    create: {
      nis: '12346',
      name: 'Ani Wijaya',
      email: 'ani@siswa.com',
      kelas: 'XI-B',
      jurusan: 'IPS',
    },
  });
  console.log(`✅ Created sample student: ${student2.name}`);

  // Also create some sample books
  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Pemrograman TypeScript',
      author: 'John Doe',
      publisher: 'Erlangga',
      year: 2023,
    },
  });
  console.log(`✅ Created sample book: ${book1.title}`);

  const book2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Belajar NestJS',
      author: 'Jane Smith',
      publisher: 'Elex Media',   
      year: 2024,
    },
  });
  console.log(`✅ Created sample book: ${book2.title}`);

  console.log('🌱 Seed completed!');
  console.log('');
  console.log('📝 Login credentials:');
  console.log('   ADMIN:  username: admin, password: admin123');
  console.log('   PETUGAS: username: petugas, password: petugas123');
  console.log('   SISWA:  username: siswa, password: siswa123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

