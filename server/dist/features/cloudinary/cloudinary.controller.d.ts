/// <reference types="multer" />
import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    getProfile(file: Express.Multer.File): Promise<any>;
}
