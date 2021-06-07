import { Messaging } from './services/Messaging';
import { Order } from './models/Order';
import { Persistency } from './services/Persistency';
import { Product } from './models/Product';
import { ShoppingCart } from './models/ShoppingCart';
import { NoDiscount } from './models/Discount';
import { IndividualCustomer } from './models/Customer';

const noDiscount = new NoDiscount();

const shoppingCart = new ShoppingCart(noDiscount);

const messaging = new Messaging();
const persist = new Persistency();

const customer1 = new IndividualCustomer('Renato', 'Lomba', '507.282.038-63');

const order = new Order(shoppingCart, messaging, persist, customer1);

shoppingCart.addItem(new Product('T-Shirt', 49.9));
shoppingCart.addItem(new Product('Pants', 89.5));
shoppingCart.addItem(new Product('Hat', 15.49));

console.log(shoppingCart.totalWithDiscount());

order.checkout();

console.log(`This order is ${order.orderStatus}.`);
