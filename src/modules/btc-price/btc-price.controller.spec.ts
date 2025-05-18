import { Test, TestingModule } from '@nestjs/testing';
import { BtcPriceController } from './btc-price.controller';

describe('BtcPriceController', () => {
  let controller: BtcPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BtcPriceController],
    }).compile();

    controller = module.get<BtcPriceController>(BtcPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
