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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorators_1 = require("../auth/roles.decorators");
const swagger_1 = require("@nestjs/swagger");
let BookController = class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    create(dto) {
        return this.bookService.create(dto);
    }
    findAll() {
        return this.bookService.findAll();
    }
    findOne(id) {
        return this.bookService.findOne(+id);
    }
    update(id, dto) {
        return this.bookService.update(+id, dto);
    }
    replace(id, dto) {
        return this.bookService.update(+id, dto);
    }
    remove(id) {
        return this.bookService.remove(+id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Menambahkan buku baru (ADMIN only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS', 'SISWA'),
    (0, swagger_1.ApiOperation)({ summary: 'Menampilkan semua daftar buku' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS', 'SISWA'),
    (0, swagger_1.ApiOperation)({ summary: 'Melihat detail buku berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS'),
    (0, swagger_1.ApiOperation)({ summary: 'Update sebagian data buku (ADMIN & PETUGAS)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS'),
    (0, swagger_1.ApiOperation)({ summary: 'Ganti seluruh data buku (ADMIN & PETUGAS)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "replace", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorators_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Menghapus buku (ADMIN only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "remove", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map