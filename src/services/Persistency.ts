import { PersistencyProtocol } from './protocols/PersistencyProtocol';

export class Persistency implements PersistencyProtocol {
  saveOrder(): void {
    console.log('Order saved!!!');
  }
}
