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
exports.PeminjamanController = void 0;
const common_1 = require("@nestjs/common");
const peminjaman_service_1 = require("./peminjaman.service");
const create_peminjaman_dto_1 = require("./dto/create-peminjaman.dto");
const update_peminjaman_dto_1 = require("./dto/update-peminjaman.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorators_1 = require("../auth/roles.decorators");
let PeminjamanController = class PeminjamanController {
    peminjamanService;
    constructor(peminjamanService) {
        this.peminjamanService = peminjamanService;
    }
    create(dto, req) {
        return this.peminjamanService.create(dto, req.user);
    }
    kembalikan(id, req) {
        return this.peminjamanService.kembalikan(id, req.user);
    }
    findAll() {
        return this.peminjamanService.findAll();
    }
    findOne(id, req) {
        return this.peminjamanService.findOne(id, req.user);
    }
    update(id, dto) {
        return this.peminjamanService.update(id, dto);
    }
    remove(id) {
        return this.peminjamanService.remove(id);
    }
    getStatusBuku() {
        return this.peminjamanService.getStatusBuku();
    }
};
exports.PeminjamanController = PeminjamanController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS', 'SISWA'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_peminjaman_dto_1.CreatePeminjamanDto, Object]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/kembalikan'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS', 'SISWA'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "kembalikan", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS', 'SISWA'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_peminjaman_dto_1.UpdatePeminjamanDto]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('status-buku'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('ADMIN', 'PETUGAS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "getStatusBuku", null);
exports.PeminjamanController = PeminjamanController = __decorate([
    (0, common_1.Controller)('peminjaman'),
    __metadata("design:paramtypes", [peminjaman_service_1.PeminjamanService])
], PeminjamanController);
//# sourceMappingURL=peminjaman.controller.js.map