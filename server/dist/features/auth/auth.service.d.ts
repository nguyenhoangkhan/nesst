import { RegisterUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DecodedIdToken } from './interfaces/google.interface';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    login(email: string): Promise<any>;
    register(payload: RegisterUserDto): Promise<{
        accessToken: {
            expiresIn: string;
            accessToken: string;
        };
    }>;
    validateUser({ email, password }: {
        email: any;
        password: any;
    }): Promise<any>;
    private _createToken;
    private findByLogin;
    loginWithFirebaseGoogle(token: string): Promise<{
        access_token: string;
    }>;
    handleProcessLoginGoogle(email: string, options: DecodedIdToken): Promise<{
        access_token: string;
    }>;
    decodedIdToken(token: string): {
        [key: string]: any;
    };
}
