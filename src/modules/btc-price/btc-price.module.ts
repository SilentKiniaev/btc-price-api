import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { BtcPriceService } from './btc-price.service';
import { BtcPriceController } from './btc-price.controller';
import { SchedulerModule } from '../scheduler/scheduler.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      // maxRedirects: 5,
    }),
    CacheModule.register(),
    SchedulerModule,
  ],
  providers: [BtcPriceService],
  exports: [BtcPriceService],
  controllers: [BtcPriceController],
})
export class BtcPriceModule {}
