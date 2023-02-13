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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const bcrypt_1 = require("../../share/utils/bcrypt");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(email) {
        const accessToken = this._createToken(email);
        return {
            accessToken,
        };
    }
    async register(payload) {
        const { email, password } = payload;
        const user = await this.userService.findOne(email);
        if (user) {
            throw new exceptions_1.BadRequestException('Tài khoản đã tồn tại');
        }
        const hashedPassword = await (0, bcrypt_1.hashPassword)(password);
        const doc = await this.userService.createOne(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
        const accessToken = this._createToken(doc.email);
        return {
            accessToken,
        };
    }
    async validateUser({ email, password }) {
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new exceptions_1.BadRequestException('Tài khoản không tồn tại');
        }
        if (!(0, bcrypt_1.isCorrectPassword)(password, user.password)) {
            throw new exceptions_1.BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
        }
        return user;
    }
    _createToken(email) {
        const accessToken = this.jwtService.sign({ email }, { secret: process.env.SECRET_KEY });
        return {
            expiresIn: process.env.EXPIRES_IN,
            accessToken,
        };
    }
    async findByLogin({ email, password }) {
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new exceptions_1.BadRequestException('Tài khoản không tồn tại');
        }
        if (!(0, bcrypt_1.isCorrectPassword)(password, user.password)) {
            throw new exceptions_1.BadRequestException('Tài khoản hoặc mật khẩu không chính xác');
        }
        return user;
    }
    async loginWithFirebaseGoogle(token) {
        const decode = this.decodedIdToken(token);
        return this.handleProcessLoginGoogle(decode.email, decode);
    }
    async handleProcessLoginGoogle(email, options) {
        const isExitsAccount = await this.userService.findOne(email);
        if (isExitsAccount._id) {
            const payload = {
                username: isExitsAccount.email,
                sub: isExitsAccount._id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        const createUserObject = await this.userService.createWithGoogle(options);
        try {
            if (createUserObject === undefined || createUserObject === null)
                throw new exceptions_1.BadRequestException('Register Login Google with error');
            const payload = {
                username: createUserObject.email,
                sub: createUserObject._id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            throw error;
        }
    }
    decodedIdToken(token) {
        try {
            const decode = this.jwtService.decode(token);
            if (typeof decode === 'string')
                throw new exceptions_1.UnauthorizedException('Token invalid');
            return decode;
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map