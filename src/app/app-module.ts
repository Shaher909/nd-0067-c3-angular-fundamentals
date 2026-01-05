import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './layout/header/header';
import { ProductList } from './components/product-list/product-list';
import { ProductItem } from './components/product-item/product-item';
import { ProductItemDetail } from './components/product-item-detail/product-item-detail';
import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';

@NgModule({
  declarations: [App, Header, ProductList, ProductItem, ProductItemDetail, Cart, Confirmation],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
