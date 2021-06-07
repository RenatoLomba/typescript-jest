import { Persistency } from './Persistency';

describe('Persistency', () => {
  describe('Save order', () => {
    afterEach(() => jest.clearAllMocks());

    it('should return undefined', () => {
      const sut = new Persistency();

      expect(sut.saveOrder()).toBeUndefined();
    });

    it('should call console.log once', () => {
      const sut = new Persistency();
      const consoleSpy = jest.spyOn(console, 'log');
      sut.saveOrder();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.log with "Order saved!!!"', () => {
      const sut = new Persistency();
      const consoleSpy = jest.spyOn(console, 'log');
      sut.saveOrder();
      expect(consoleSpy).toHaveBeenCalledWith('Order saved!!!');
    });
  });
});
