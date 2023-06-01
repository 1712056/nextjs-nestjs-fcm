import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationTokenService } from './notification-token.service';
import { CreateNotificationTokenDto } from './dto/create-notification-token.dto';
import { UpdateNotificationTokenDto } from './dto/update-notification-token.dto';

@Controller('notification-token')
export class NotificationTokenController {
  constructor(private readonly notificationTokenService: NotificationTokenService) {}

  @Post()
  create(@Body() createNotificationTokenDto: CreateNotificationTokenDto) {
    return this.notificationTokenService.create(createNotificationTokenDto);
  }

  @Get()
  findAll() {
    return this.notificationTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationTokenDto: UpdateNotificationTokenDto) {
    return this.notificationTokenService.update(+id, updateNotificationTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTokenService.remove(+id);
  }
}
