import { MessagingProtocol } from '../services/protocols/MessagingProtocol';
import { PersistencyProtocol } from '../services/protocols/PersistencyProtocol';
import { CartStatus } from './protocols/CartStatus';
import { CustomerOrder } from './protocols/CustomerProtocol';
import { ShoppingCartProtocol } from './protocols/ShoppingCartProtocol';

export class Order {
  private _orderStatus: CartStatus = 'open';
  private readonly shoppingCart: ShoppingCartProtocol;
  private readonly messaging: MessagingProtocol;
  private readonly persist: PersistencyProtocol;
  private readonly customer: CustomerOrder;

  constructor(
    cart: ShoppingCartProtocol,
    messaging: MessagingProtocol,
    persist: PersistencyProtocol,
    customer: CustomerOrder,
  ) {
    this.shoppingCart = cart;
    this.messaging = messaging;
    this.persist = persist;
    this.customer = customer;
  }

  get orderStatus(): Readonly<CartStatus> {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.shoppingCart.isEmpty()) {
      console.log('Empty cart');
      return;
    }

    this._orderStatus = 'closed';

    this.messaging.sendMessage(
      `Your order totaling $${this.shoppingCart.totalWithDiscount()} was received.`,
    );

    this.persist.saveOrder();
    this.shoppingCart.clear();

    console.log(
      `Cliete: ${this.customer.getName()}; \nNº Identificação: ${this.customer.getIDN()}`,
    );
  }
}
