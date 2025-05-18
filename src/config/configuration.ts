export interface IConfig {
  app: {
    port: number;
  };
  btc: {
    priceUdateFrequency: number;
  };
  binanceApi: {
    origin: string;
  };
}

export default (): IConfig => ({
  app: {
    port: +(process.env?.APP_PORT ?? 3000),
  },
  btc: {
    priceUdateFrequency: +(process.env?.PRICE_UPDATE_FREQUENCY ?? 10),
  },
  binanceApi: {
    origin: process.env.BINANCE_API_ORIGIN ?? '',
  },
});
