import { UserService } from 'src/features/user/user.service';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate({ email }: {
        email: any;
    }): unknown;
}
export {};
