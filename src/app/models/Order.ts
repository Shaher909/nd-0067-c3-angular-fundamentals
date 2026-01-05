import { CartItem } from './CartItem';

export class Order {
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  address: string;
  creditCard: string;

  constructor() {
    this.items = [];
    this.totalAmount = 0;
    this.customerName = '';
    this.address = '';
    this.creditCard = '';
  }
}
