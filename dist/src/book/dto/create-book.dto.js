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
exports.CreateBookDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateBookDto {
    title;
    author;
    publisher;
    year;
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Laskar Pelangi', description: 'Judul buku' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Judul buku wajib diisi' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Andrea Hirata', description: 'Penulis buku' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Penulis wajib diisi' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bentang Pustaka', description: 'Penerbit buku' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Penerbit wajib diisi' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "publisher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2005, description: 'Tahun terbit' }),
    (0, class_validator_1.IsInt)({ message: 'Tahun harus berupa angka' }),
    (0, class_validator_1.Min)(1900, { message: 'Tahun minimal 1900' }),
    (0, class_validator_1.Max)(2100, { message: 'Tahun maksimal 2100' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "year", void 0);
//# sourceMappingURL=create-book.dto.js.map