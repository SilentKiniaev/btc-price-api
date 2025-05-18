import { Test, TestingModule } from '@nestjs/testing';
import { BtcPriceService } from './btc-price.service';

describe('BtcPriceService', () => {
  let service: BtcPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BtcPriceService],
    }).compile();

    service = module.get<BtcPriceService>(BtcPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
