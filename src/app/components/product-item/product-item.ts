import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product!: Product;
  @Output() productAddedToCart = new EventEmitter<{ product: Product; quantity: number }>();
  quantity: number = 1;
  addedToCart: boolean = false;

  constructor() {}

  addToCart(product: Product, quantity: number): void {
    if (quantity > 0) {
      this.productAddedToCart.emit({ product, quantity });
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
