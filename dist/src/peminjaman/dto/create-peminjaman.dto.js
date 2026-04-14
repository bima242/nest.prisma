"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePeminjamanDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePeminjamanDto {
    bookId;
    studentId;
    tanggalPinjam;
    tanggalKembali;
}
exports.CreatePeminjamanDto = CreatePeminjamanDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePeminjamanDto.prototype, "bookId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePeminjamanDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Tanggal pinjam harus dalam format YYYY-MM-DD atau ISO lengkap' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePeminjamanDto.prototype, "tanggalPinjam", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Tanggal kembali harus dalam format YYYY-MM-DD atau ISO lengkap' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePeminjamanDto.prototype, "tanggalKembali", void 0);
//# sourceMappingURL=create-peminjaman.dto.js.map