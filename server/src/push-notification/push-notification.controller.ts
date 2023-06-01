import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';

@Controller('push-notification')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Put()
  sendPush(@Body() data: any): Promise<any> {
    return this.pushNotificationService.sendPush(
      { id: data.id, username: data.username },
      data.title,
      data.body,
    );
  }
}
