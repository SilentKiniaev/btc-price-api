import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BtcPriceModule } from './modules/btc-price/btc-price.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    NestScheduleModule.forRoot(),
    BtcPriceModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
