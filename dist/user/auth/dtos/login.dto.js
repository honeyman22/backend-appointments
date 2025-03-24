"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = exports.loginUserSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.loginUserSchema = zod_1.z
    .object({
    email: zod_1.z
        .string({ required_error: 'Email is required' })
        .trim()
        .min(5, 'Email must be at least 5 characters long')
        .max(255, 'Email must be less than 255 characters')
        .email('Invalid email format')
        .transform((value) => value.toLowerCase()),
    password: zod_1.z
        .string({ required_error: 'Password is required' })
        .trim()
        .min(8, 'Password must be at least 8 characters long')
        .max(64, 'Password must be less than 64 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
})
    .strict();
class LoginUserDto extends (0, nestjs_zod_1.createZodDto)(exports.loginUserSchema) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=login.dto.js.map