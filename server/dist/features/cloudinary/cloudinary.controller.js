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
exports.CloudinaryController = void 0;
const common_1 = require("@nestjs/common");
const response_builder_1 = require("../../share/builders/response.builder");
const cloudinary_service_1 = require("./cloudinary.service");
let CloudinaryController = class CloudinaryController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async getProfile(file) {
        try {
            return await this.cloudinaryService.uploadImage(file).catch(() => {
                throw new common_1.BadRequestException('Định dạng file không hợp lệ.');
            });
        }
        catch (err) {
            return (0, response_builder_1.responseBuilder)(null, common_1.HttpStatus.OK, err.message, '');
        }
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CloudinaryController.prototype, "getProfile", null);
CloudinaryController = __decorate([
    (0, common_1.Controller)('cloudinary'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], CloudinaryController);
exports.CloudinaryController = CloudinaryController;
//# sourceMappingURL=cloudinary.controller.js.map