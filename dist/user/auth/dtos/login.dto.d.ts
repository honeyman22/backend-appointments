import { z } from 'zod';
export declare const loginUserSchema: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email?: string;
    password?: string;
}, {
    email?: string;
    password?: string;
}>;
declare const LoginUserDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
    password?: string;
}, z.ZodObjectDef<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
}, "strict", z.ZodTypeAny>, {
    email?: string;
    password?: string;
}>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
