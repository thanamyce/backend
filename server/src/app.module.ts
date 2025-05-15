import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailserviceModule } from './mailservice/mailservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbURI') || 'mongodb://localhost:27017/mydb',
      }),
      inject: [ConfigService],
    }),
    UserModule,
    MailserviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
