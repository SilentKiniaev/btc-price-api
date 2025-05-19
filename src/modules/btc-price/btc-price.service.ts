import {
  Injectable,
  Logger,
  Inject,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { IConfig } from '../../config/configuration';
import { BTC_MID_PRICE_KEY } from './consts';
import { SchedulerService } from '../scheduler/scheduler.service';

interface IBookTicker {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

@Injectable()
export class BtcPriceService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BtcPriceService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly schedulerService: SchedulerService,
  ) {}

  async onApplicationBootstrap() {
    const btcConfig = this.configService.get<IConfig['btc']>(
      'btc',
    ) as IConfig['btc'];
    await this.setMidPrice();
    this.schedulerService.addCronJob(
      BTC_MID_PRICE_KEY,
      `*/${btcConfig.priceUdateFrequency} * * * * *`,
      this.setMidPrice,
      this,
    );
  }

  async getPrice() {
    const price = await this.cacheManager.get<number>(BTC_MID_PRICE_KEY);
    return price;
  }

  async setMidPrice() {
    try {
      const midPrice = await this.calculateMidPrice();
      await this.cacheManager.set(BTC_MID_PRICE_KEY, midPrice);
      this.logger.debug(`New BTC price: ${midPrice}`);
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  async calculateMidPrice() {
    const price = await this.fetchcCurrentPrice();
    const mappedBid = +price.bidPrice * (1 - 0.0001);
    const mappedAsk = +price.askPrice * (1 + 0.0001);
    const midPrice = (mappedBid + mappedAsk) / 2;
    return midPrice;
  }

  async fetchcCurrentPrice() {
    const binanceConfig = this.configService.get<IConfig['binanceApi']>(
      'binanceApi',
    ) as IConfig['binanceApi'];
    const { data } = await firstValueFrom(
      this.httpService
        .get<IBookTicker>(
          `${binanceConfig.origin}/api/v3/ticker/bookTicker?symbol=BTCUSDT`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.message);
            throw error;
          }),
        ),
    );
    return data;
  }
}
