import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { firebaseAdminConfig } from './share/constants/firebase.const';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseAdminConfig.project_id,
      privateKey: firebaseAdminConfig.private_key,
      clientEmail: firebaseAdminConfig.client_email,
    }),
  });

  await app.listen(3000);
}
bootstrap();
