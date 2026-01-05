import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }

  getProduct(id: number): Observable<Product> {
    return new Observable((observer) => {
      this.getProducts().subscribe((products) => {
        const product = products.find((p) => p.id === id);
        if (product) {
          observer.next(product);
        }
        observer.complete();
      });
    });
  }
}
