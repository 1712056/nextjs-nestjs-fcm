import { Injectable } from '@nestjs/common';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from './dto/update-push-notification.dto';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { PushNotification } from './entities/push-notification.entity';
import { Repository } from 'typeorm';
import { NotificationToken } from 'src/notification-token/entities/notification-token.entity';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'fb-push-notification.json'),
  ),
});
@Injectable()
export class PushNotificationService {
  constructor(
    @InjectRepository(PushNotification)
    private readonly pushNotificationRepo: Repository<PushNotification>,
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepo: Repository<NotificationToken>,
  ) {}

  acceptPushNotification = async (
    user: any,
    notificationDto: CreatePushNotificationDto,
  ): Promise<NotificationToken> => {
    await this.notificationTokenRepo.update(
      { user: { id: user.id } },
      { status: 'INACTIVE' },
    );
    const notification_token = await this.notificationTokenRepo.save({
      user: user,
      device_type: notificationDto.device_type,
      notification_token: notificationDto.notification_token,
      status: 'ACTIVE',
    });
    return notification_token;
  };

  disablePushNotification = async (
    user: any,
    update_dto: UpdatePushNotificationDto,
  ): Promise<void> => {
    try {
      await this.notificationTokenRepo.update(
        {
          user: { id: user.id },
          device_type: update_dto.device_type,
        },
        {
          status: 'INACTIVE',
        },
      );
    } catch (error) {
      return error;
    }
  };

  getNotifications = async (): Promise<PushNotification[]> => {
    return this.pushNotificationRepo.find();
  };

  sendPush = async (user: any, title: string, body: string): Promise<void> => {
    try {
      const notification_token = await this.notificationTokenRepo.findOne({
        where: { user: { id: user.id }, status: 'ACTIVE' },
      });

      if (notification_token) {
        await this.pushNotificationRepo.save({
          notification_token: notification_token,
          title,
          body,
          created_by: user.username,
          status: 'ACTIVE',
        });
      }

      await firebase
        .messaging()
        .send({
          data: { title, body },
          notification: { title, body },
          token: notification_token.notification_token,
          android: { priority: 'high' },
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      return error;
    }
  };
}
