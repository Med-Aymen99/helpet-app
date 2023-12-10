import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';


//const environment = process.env.NODE_ENV || 'development';
// const environment = 'production'
// const envFilePath = `.env.${environment}`;
// dotenv.config({ path: envFilePath });
//dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({origin: true});
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );  
  const port = configService.get<number>('APP_PORT') || 3001;

  await app.listen(port);
}
bootstrap();
