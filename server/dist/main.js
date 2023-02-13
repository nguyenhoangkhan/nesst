"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const firebase_const_1 = require("./share/constants/firebase.const");
const admin = require("firebase-admin");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: firebase_const_1.firebaseAdminConfig.project_id,
            privateKey: firebase_const_1.firebaseAdminConfig.private_key,
            clientEmail: firebase_const_1.firebaseAdminConfig.client_email,
        }),
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map