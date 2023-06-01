import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationTokenDto } from './create-notification-token.dto';

export class UpdateNotificationTokenDto extends PartialType(CreateNotificationTokenDto) {}
