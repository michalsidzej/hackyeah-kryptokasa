export interface PriceRecord {
  time: Date;
  price: number;
  provider: string;
}

export interface PriceProvider {
  getPrice(baseCurrency: string, quoteCurrency: string): Promise<PriceRecord>;
}
