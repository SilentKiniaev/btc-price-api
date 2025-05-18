import { Controller, Get } from '@nestjs/common';
import { BtcPriceService } from './btc-price.service';

@Controller('btc-price')
export class BtcPriceController {
  constructor(private readonly btcPriceService: BtcPriceService) {}

  @Get()
  public async getPrice() {
    const price = await this.btcPriceService.getPrice();
    return {
      data: price,
    };
  }
}
