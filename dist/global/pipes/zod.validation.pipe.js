"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const nestjs_zod_1 = require("nestjs-zod");
exports.CustomZodValidationPipe = (0, nestjs_zod_1.createZodValidationPipe)({
    createValidationException: (error) => new common_1.BadRequestException({
        success: false,
        message: error.issues[0].message,
        errors: error.issues,
    }),
});
//# sourceMappingURL=zod.validation.pipe.js.map