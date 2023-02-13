import { RegisterUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<any>;
    register(payload: RegisterUserDto): Promise<any>;
    signInWithFirebaseGoogle(req: any): Promise<{
        accessToken: {
            expiresIn: string;
            accessToken: string;
        };
        errorMessage?: undefined;
    } | {
        errorMessage: string;
        accessToken?: undefined;
    }>;
}
