import { Strategy } from 'passport-firebase-jwt';
import { AuthService } from 'src/features/auth/auth.service';
declare const FirebaseAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class FirebaseAuthStrategy extends FirebaseAuthStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(token: string): Promise<string>;
}
export {};
