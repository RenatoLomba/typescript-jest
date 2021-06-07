import { Product } from './Product';

const createSut = (name: string, price: number) => {
  return new Product(name, price);
};

describe('Product', () => {
  it('should be an object with { name: "T-Shirt", price: 59.9 }', () => {
    const sut = createSut('T-Shirt', 59.9);
    expect(sut).toHaveProperty('name', 'T-Shirt');
    expect(sut).toHaveProperty('price', 59.9);
  });
});
