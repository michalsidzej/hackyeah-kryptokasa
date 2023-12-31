export interface ValueRecord {
  name: string;
  url: string;
  price: number;
  date: Date;
}

export interface PriceProvider {
  getPrice(baseCurrency: string, quoteCurrency: string): Promise<ValueRecord>;
}
