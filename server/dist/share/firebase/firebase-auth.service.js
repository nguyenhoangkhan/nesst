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
exports.FirebaseAuthService = void 0;
const firebase = require("firebase-admin");
const common_1 = require("@nestjs/common");
const firebase_const_1 = require("../constants/firebase.const");
let FirebaseAuthService = class FirebaseAuthService {
    constructor() {
        this.defaultApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebase_const_1.firebaseConfig),
        });
    }
    async validate(token) {
        const firebaseUser = await this.defaultApp
            .auth()
            .verifyIdToken(token, true)
            .catch((err) => {
            console.log(err);
            throw new common_1.UnauthorizedException(err.message);
        });
        if (!firebaseUser) {
            throw new common_1.UnauthorizedException();
        }
        return firebaseUser;
    }
};
FirebaseAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseAuthService);
exports.FirebaseAuthService = FirebaseAuthService;
//# sourceMappingURL=firebase-auth.service.js.map