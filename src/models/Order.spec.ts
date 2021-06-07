import { CartItem } from './protocols/CartItem';
import { ShoppingCartProtocol } from './protocols/ShoppingCartProtocol';
import { MessagingProtocol } from '../services/protocols/MessagingProtocol';
import { PersistencyProtocol } from '../services/protocols/PersistencyProtocol';
import { CustomerOrder } from './protocols/CustomerProtocol';
import { Order } from './Order';

class ShoppingCartMock implements ShoppingCartProtocol {
  private readonly _items: CartItem[] = [];

  get items(): readonly CartItem[] {
    return [...this._items];
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.slice(index, 1);
  }

  total(): number {
    return 2000;
  }

  totalWithDiscount(): number {
    return 1000;
  }

  public isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    this._items.length = 0;
  }
}

class MessagingMock implements MessagingProtocol {
  sendMessage(msg: string): void {
    console.log(msg);
  }
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {
    console.log('Saved');
  }
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return 'Teste';
  }
  getIDN(): string {
    return 'Teste';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  );

  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
  };
};

describe('Order', () => {
  afterEach(() => jest.clearAllMocks());

  it('should not be able to checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should be able to checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    shoppingCartMock.addItem({ name: 'teste', price: 50 });
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should be able to send an email to the client', () => {
    const { sut, messagingMock, shoppingCartMock } = createSut();
    shoppingCartMock.addItem({ name: 'teste', price: 50 });
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should be able to save the order', () => {
    const { sut, persistencyMock, shoppingCartMock } = createSut();
    shoppingCartMock.addItem({ name: 'teste', price: 50 });
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should be able to clear the cart', () => {
    const { sut, shoppingCartMock } = createSut();
    shoppingCartMock.addItem({ name: 'teste', price: 50 });
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
