"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting seed...');
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
//# sourceMappingURL=seed.js.map