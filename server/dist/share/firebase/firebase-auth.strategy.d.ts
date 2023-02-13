import { AuthService } from 'src/features/auth/auth.service';
declare const FirebaseAuthStrategy_base: any;
export declare class FirebaseAuthStrategy extends FirebaseAuthStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(token: string): unknown;
}
export {};
