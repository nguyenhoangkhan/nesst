import { RegisterUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): unknown;
    register(payload: RegisterUserDto): unknown;
    signInWithFirebaseGoogle(req: any): unknown;
}
