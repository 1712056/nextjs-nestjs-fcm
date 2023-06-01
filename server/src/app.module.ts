import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { NotificationTokenModule } from './notification-token/notification-token.module';

@Module({
  imports: [
    PushNotificationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESDB_HOST,
      port: parseInt(process.env.POSTGRESDB_PORT),
      username: process.env.POSTGRESDB_USERNAME,
      password: `${process.env.POSTGRESDB_PASSWORD}`,
      database: process.env.POSTGRESDB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    NotificationTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
