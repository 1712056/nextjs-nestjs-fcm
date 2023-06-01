import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTokenService } from './notification-token.service';

describe('NotificationTokenService', () => {
  let service: NotificationTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationTokenService],
    }).compile();

    service = module.get<NotificationTokenService>(NotificationTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
