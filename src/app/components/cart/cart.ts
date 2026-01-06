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
  removeMessage: string = '';
  nameError: string = '';
  addressError: string = '';
  creditCardError: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.removeMessage = 'Product removed successfully';
    setTimeout(() => {
      this.removeMessage = '';
    }, 3000);
  }

  updateQuantity(productId: number, event: any): void {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
      this.totalPrice = this.cartService.getTotalPrice();
    }
  }

  validateName(): void {
    if (this.customerName.trim().length === 0) {
      this.nameError = '';
    } else if (this.customerName.trim().length < 3) {
      this.nameError = 'Name must be at least 3 characters long';
    } else {
      this.nameError = '';
    }
  }

  validateAddress(): void {
    if (this.address.trim().length === 0) {
      this.addressError = '';
    } else if (this.address.trim().length < 5) {
      this.addressError = 'Address must be at least 5 characters long';
    } else {
      this.addressError = '';
    }
  }

  validateCreditCard(): void {
    if (this.creditCard.trim().length === 0) {
      this.creditCardError = '';
    } else if (!/^[0-9]*$/.test(this.creditCard)) {
      this.creditCardError = 'Credit card must contain only numbers';
    } else if (this.creditCard.trim().length !== 16) {
      this.creditCardError = 'Credit card must be exactly 16 digits';
    } else {
      this.creditCardError = '';
    }
  }

  submitOrder(): void {
    // Trigger validation on all fields
    this.validateName();
    this.validateAddress();
    this.validateCreditCard();

    // Check for any errors
    if (this.nameError || this.addressError || this.creditCardError) {
      alert('Please fix all validation errors before submitting');
      return;
    }

    if (this.customerName.trim().length < 3) {
      this.nameError = 'Name must be at least 3 characters long';
      return;
    }

    if (this.address.trim().length < 5) {
      this.addressError = 'Address must be at least 5 characters long';
      return;
    }

    if (this.creditCard.trim().length !== 16) {
      this.creditCardError = 'Credit card must be exactly 16 digits';
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
