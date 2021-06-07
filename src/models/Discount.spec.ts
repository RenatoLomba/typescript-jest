import {
  Discount,
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './Discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    const sut = createSut(NoDiscount);

    expect(sut.calculateDiscount(50.99)).toBe(50.99);
  });

  it('should apply 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);

    expect(sut.calculateDiscount(150.5)).toBe(75.25);
  });

  it('should apply 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount);

    expect(sut.calculateDiscount(150)).toBe(135);
  });
});
