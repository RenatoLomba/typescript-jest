import { Messaging } from './Messaging';

const createSut = () => {
  return new Messaging();
};

describe('Messaging', () => {
  describe('Send message', () => {
    afterEach(() => jest.clearAllMocks());

    it('should return undefined', () => {
      const sut = createSut();

      expect(sut.sendMessage('teste')).toBeUndefined();
    });

    it('should call console.log once', () => {
      const sut = createSut();
      const consoleSpy = jest.spyOn(console, 'log');
      sut.sendMessage('teste');
      expect(consoleSpy).toHaveBeenCalledTimes(1);
    });

    it('should call console.log with "Your order was received."', () => {
      const sut = createSut();
      const consoleSpy = jest.spyOn(console, 'log');
      sut.sendMessage('Your order was received.');
      expect(consoleSpy).toHaveBeenCalledWith('Your order was received.');
    });
  });
});
