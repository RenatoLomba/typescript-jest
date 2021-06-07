import { Discount } from './Discount';
import { CartItem } from './protocols/CartItem';
import { ShoppingCartProtocol } from './protocols/ShoppingCartProtocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: CartItem[] = [];
  private readonly _discount: Discount;

  constructor(discount: Discount) {
    this._discount = discount;
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  total(): number {
    const sum = this._items.reduce((sum, next) => sum + next.price, 0);
    return Number(sum.toFixed(2));
  }

  totalWithDiscount(): number {
    return this._discount.calculateDiscount(this.total());
  }

  clear(): void {
    this._items.length = 0;
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}
