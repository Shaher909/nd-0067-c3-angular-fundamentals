import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/CartItem';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  customerName: string = '';
  address: string = '';
  creditCard: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, event: any): void {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
      this.totalPrice = this.cartService.getTotalPrice();
    }
  }

  submitOrder(): void {
    if (this.customerName.trim().length < 3) {
      alert('Please enter a valid name.\nMinimum 3 characters required.\nExample: John Doe');
      return;
    }

    if (this.address.trim().length < 5) {
      alert(
        'Please enter a valid address.\nMinimum 5 characters required.\nExample: 123 Main St, City, State 12345'
      );
      return;
    }

    if (this.creditCard.trim().length !== 16) {
      alert(
        'Please enter a valid credit card number.\nExactly 16 digits required.\nExample: 1234567890123456'
      );
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const order = new Order();
    order.items = this.cartItems;
    order.totalAmount = this.totalPrice;
    order.customerName = this.customerName;
    order.address = this.address;
    order.creditCard = this.creditCard;

    this.cartService.clearCart();

    this.router.navigate(['/confirmation'], {
      state: { order: order },
    });
  }
}
