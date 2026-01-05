import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('Products loaded:', res);
        this.products = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
}
