import { User } from '../entities/user.entity';
declare const LoginDto_base: import("@nestjs/mapped-types").MappedType<Partial<User>>;
export declare class LoginDto extends LoginDto_base {
    email: string;
}
export {};
