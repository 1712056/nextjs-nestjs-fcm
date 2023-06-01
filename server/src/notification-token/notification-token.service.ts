import { Injectable } from '@nestjs/common';
import { CreateNotificationTokenDto } from './dto/create-notification-token.dto';
import { UpdateNotificationTokenDto } from './dto/update-notification-token.dto';

@Injectable()
export class NotificationTokenService {
  create(createNotificationTokenDto: CreateNotificationTokenDto) {
    return 'This action adds a new notificationToken';
  }

  findAll() {
    return `This action returns all notificationToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationToken`;
  }

  update(id: number, updateNotificationTokenDto: UpdateNotificationTokenDto) {
    return `This action updates a #${id} notificationToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationToken`;
  }
}
