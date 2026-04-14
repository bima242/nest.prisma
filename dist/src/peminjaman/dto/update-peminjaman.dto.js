"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePeminjamanDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_peminjaman_dto_1 = require("./create-peminjaman.dto");
class UpdatePeminjamanDto extends (0, mapped_types_1.PartialType)(create_peminjaman_dto_1.CreatePeminjamanDto) {
}
exports.UpdatePeminjamanDto = UpdatePeminjamanDto;
//# sourceMappingURL=update-peminjaman.dto.js.map