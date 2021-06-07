import { Discount } from './Discount';
import { CartItem } from './protocols/CartItem';
import { ShoppingCart } from './ShoppingCart';

const createSut = (discount = 0) => {
  const discountMock = createDiscountMock(discount);
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createSutWithProducts = (discount = 0) => {
  const { sut, discountMock } = createSut(discount);
  sut.addItem(createCartItemMock('T-Shirt', 59.9));
  sut.addItem(createCartItemMock('Cloak', 104.5));
  return { sut, discountMock };
};

const createDiscountMock = (discount = 0) => {
  class DiscountMock extends Discount {
    protected readonly discount = discount;
  }
  return new DiscountMock();
};

const createCartItemMock = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    // eslint-disable-next-line prettier/prettier
    constructor(public name: string, public price: number) { }
  }
  return new CartItemMock(name, price);
};

describe('ShoppingCart', () => {
  afterEach(() => jest.clearAllMocks());

  it('should be an empty cart when initialized', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should be able to add 2 cart items in the shopping cart', () => {
    const { sut } = createSutWithProducts();
    expect(sut.items).toHaveLength(2);
  });

  it('should be able to remove an item from the cart', () => {
    const { sut } = createSutWithProducts();
    sut.removeItem(0);
    expect(sut.items).toHaveLength(1);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts(0.5);
    expect(sut.total()).toBe(164.4);
    expect(sut.totalWithDiscount()).toBe(82.2);
  });

  it('should be able to clear the cart', () => {
    const { sut } = createSutWithProducts();
    sut.clear();
    expect(sut.items).toHaveLength(0);
  });

  it('should call discount.calculateDiscount when totalWithDiscount is called once', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculateDiscount');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculateDiscount with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discountMockSpy = jest.spyOn(discountMock, 'calculateDiscount');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
