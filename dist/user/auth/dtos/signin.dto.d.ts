import { z } from 'zod';
export declare const signinUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
}, "strict", z.ZodTypeAny, {
    email?: string;
    name?: string;
    password?: string;
}, {
    email?: string;
    name?: string;
    password?: string;
}>;
declare const SigninUserDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
    name?: string;
    password?: string;
}, z.ZodObjectDef<{
    name: z.ZodString;
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
}, "strict", z.ZodTypeAny>, {
    email?: string;
    name?: string;
    password?: string;
}>;
export declare class SigninUserDto extends SigninUserDto_base {
}
export {};
