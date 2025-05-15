import { Test, TestingModule } from '@nestjs/testing';
import { MailserviceController } from './mailservice.controller';

describe('MailserviceController', () => {
  let controller: MailserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailserviceController],
    }).compile();

    controller = module.get<MailserviceController>(MailserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
