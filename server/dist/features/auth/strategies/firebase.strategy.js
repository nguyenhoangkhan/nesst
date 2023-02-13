"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_firebase_jwt_1 = require("passport-firebase-jwt");
const auth_service_1 = require("../auth.service");
let FirebaseStrategy = class FirebaseStrategy extends (0, passport_1.PassportStrategy)(passport_firebase_jwt_1.Strategy, 'firebase-jwt') {
    constructor(authService) {
        super({
            jwtFromRequest: passport_firebase_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.authService = authService;
    }
    async validate(token) {
        try {
            const invalidToken = this.authService.decodedIdToken(token);
            if (invalidToken.email_verified === false) {
                throw new common_1.UnauthorizedException('You must verified Email');
            }
            return token;
        }
        catch (error) {
            throw error;
        }
    }
};
FirebaseStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], FirebaseStrategy);
exports.FirebaseStrategy = FirebaseStrategy;
//# sourceMappingURL=firebase.strategy.js.map