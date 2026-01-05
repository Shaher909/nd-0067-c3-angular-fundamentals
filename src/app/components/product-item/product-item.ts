import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product!: Product;
  quantity: number = 1;
  addedToCart: boolean = false;

  constructor(private cartService: CartService) {}

  addToCart(product: Product, quantity: number): void {
    if (quantity > 0) {
      this.cartService.addToCart(product, quantity);
      this.addedToCart = true;
      setTimeout(() => {
        this.addedToCart = false;
      }, 2000);
    }
  }

  onQuantityChange(event: any): void {
    const value = parseInt(event.target.value);
    if (value > 0) {
      this.quantity = value;
    } else {
      this.quantity = 1;
    }
  }
}
