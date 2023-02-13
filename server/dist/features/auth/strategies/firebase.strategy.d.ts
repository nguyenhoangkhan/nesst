import { AuthService } from '../auth.service';
declare const FirebaseStrategy_base: any;
export declare class FirebaseStrategy extends FirebaseStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(token: string): unknown;
}
export {};
