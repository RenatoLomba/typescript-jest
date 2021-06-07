export abstract class Discount {
  protected abstract readonly discount: number;

  calculateDiscount(price: number): number {
    const total = price - price * this.discount;
    return Number(total.toFixed(2));
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount = 0.5;
}

export class TenPercentDiscount extends Discount {
  protected readonly discount = 0.1;
}

export class NoDiscount extends Discount {
  protected readonly discount = 0;
}
