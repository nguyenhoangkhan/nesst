"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./features/auth/auth.controller");
const auth_module_1 = require("./features/auth/auth.module");
const user_controller_1 = require("./features/user/user.controller");
const user_module_1 = require("./features/user/user.module");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("./features/cloudinary/cloudinary");
const cloudinary_service_1 = require("./features/cloudinary/cloudinary.service");
const cloudinary_module_1 = require("./features/cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL),
            auth_module_1.AuthModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, user_controller_1.UserController],
        providers: [app_service_1.AppService, cloudinary_1.Cloudinary, cloudinary_service_1.CloudinaryService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map