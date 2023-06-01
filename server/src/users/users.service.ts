import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PushNotificationService } from 'src/push-notification/push-notification.service';
import { CreatePushNotificationDto } from 'src/push-notification/dto/create-push-notification.dto';
import { UpdatePushNotificationDto } from 'src/push-notification/dto/update-push-notification.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly notificationService: PushNotificationService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepo.save(user);
  }

  updateProfile = async (userId: number, updateDto: any): Promise<any> => {
    try {
      const user = await this.userRepo.findOne({
        where: { id: userId },
      });

      if (user) {
        const updatedUser = {
          ...user,
          username: updateDto.username,
          email: updateDto.email,
        };

        const savedUser = await this.userRepo.save(updatedUser);
        if (savedUser) {
          await this.notificationService
            .sendPush(
              savedUser,
              'Profile Update',
              'Your Profile have been updated successfully',
            )
            .catch((error: any) => {
              console.log('Error sending push notification', error);
            });
        }
        return savedUser;
      }
    } catch (error) {
      return error;
    }
  };

  enablePush = async (
    userId: number,
    updateDto: CreatePushNotificationDto,
  ): Promise<any> => {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (user) {
      return await this.notificationService.acceptPushNotification(
        user,
        updateDto,
      );
    }
  };

  disablePush = async (
    user_id: number,
    update_dto: UpdatePushNotificationDto,
  ): Promise<any> => {
    const user = await this.userRepo.findOne({
      where: { id: user_id },
    });
    return await this.notificationService.disablePushNotification(
      user,
      update_dto,
    );
  };

  getPushNotifications = async (): Promise<any> => {
    return await this.notificationService.getNotifications();
  };
}
