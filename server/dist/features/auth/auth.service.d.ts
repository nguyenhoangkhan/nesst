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
            expiresIn: any;
            accessToken: any;
        };
    }>;
    validateUser({ email, password }: {
        email: any;
        password: any;
    }): Promise<any>;
    private _createToken;
    private findByLogin;
    loginWithFirebaseGoogle(token: string): Promise<{
        accessToken: {
            expiresIn: any;
            accessToken: any;
        };
        errorMessage?: undefined;
    } | {
        errorMessage: string;
        accessToken?: undefined;
    }>;
    handleProcessLoginGoogle(email: string, options: DecodedIdToken): Promise<{
        accessToken: {
            expiresIn: any;
            accessToken: any;
        };
        errorMessage?: undefined;
    } | {
        errorMessage: string;
        accessToken?: undefined;
    }>;
    decodedIdToken(token: string): any;
}
