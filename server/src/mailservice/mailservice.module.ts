import { Module } from '@nestjs/common';
import { MailserviceService } from './mailservice.service';
import { MailserviceController } from './mailservice.controller';

@Module({
  providers: [MailserviceService],
  controllers: [MailserviceController]
})
export class MailserviceModule {}
