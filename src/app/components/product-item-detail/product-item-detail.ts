import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  standalone: false,
  templateUrl: './product-item-detail.html',
  styleUrl: './product-item-detail.css',
})
export class ProductItemDetail {
  product: Product | undefined;
  quantity: number = 1;
  addedToCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe((products) => {
      this.product = products.find((p) => p.id === id);
      this.cdr.detectChanges();
    });
  }

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
