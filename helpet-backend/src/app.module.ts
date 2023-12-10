import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PetsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //ignoreEnvFile: process.env.NODE_ENV === 'production'
      //envFilePath: '.env.production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true

      }),
      inject: [ConfigService]
    })

    ,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
