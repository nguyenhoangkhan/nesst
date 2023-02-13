"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary_const_1 = require("../../share/constants/cloudinary.const");
exports.CloudinaryProvider = {
    provide: cloudinary_const_1.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'dh5674gvh',
            api_key: '475181825851155',
            api_secret: 'sZE3C3KreNc6XjFgdlQXpwS9MgA',
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map