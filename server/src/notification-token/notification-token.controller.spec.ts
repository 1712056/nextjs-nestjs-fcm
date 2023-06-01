import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTokenController } from './notification-token.controller';
import { NotificationTokenService } from './notification-token.service';

describe('NotificationTokenController', () => {
  let controller: NotificationTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationTokenController],
      providers: [NotificationTokenService],
    }).compile();

    controller = module.get<NotificationTokenController>(NotificationTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
