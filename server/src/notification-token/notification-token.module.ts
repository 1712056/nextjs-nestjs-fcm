import { Module } from '@nestjs/common';
import { NotificationTokenService } from './notification-token.service';
import { NotificationTokenController } from './notification-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationToken } from './entities/notification-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationToken])],
  controllers: [NotificationTokenController],
  providers: [NotificationTokenService],
})
export class NotificationTokenModule {}
