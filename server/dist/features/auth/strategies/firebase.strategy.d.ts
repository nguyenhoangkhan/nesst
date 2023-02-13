import { Strategy } from 'passport-firebase-jwt';
import { AuthService } from '../auth.service';
declare const FirebaseStrategy_base: new (...args: any[]) => Strategy;
export declare class FirebaseStrategy extends FirebaseStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(token: string): Promise<string>;
}
export {};
