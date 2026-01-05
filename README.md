# MyStore - Angular E-Commerce Application

An Angular e-commerce application that allows users to view products, add them to a shopping cart, and complete the checkout process.

## Project Description

MyStore is a single-page application (SPA) built with Angular that demonstrates:

- Component hierarchy and communication
- Routing and navigation
- HTTP requests and data fetching
- Form validation
- Service-based state management
- Parent-child component data passing

## Features

- **Product List**: Browse available products with images, names, and prices
- **Product Details**: View detailed information about individual products
- **Shopping Cart**: Add/remove items, update quantities, and view total price
- **Checkout**: Complete purchase with validated customer information
- **Order Confirmation**: Success page after checkout completion

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Setup Steps

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   ng serve
   ```

   Port used: 3000

## Routing

The application uses the following routes:

- `/` - Redirects to `/products`
- `/products` - Product list page
- `/products/:id` - Product detail page
- `/cart` - Shopping cart and checkout page
- `/confirmation` - Order confirmation page

## Data Flow

### Parent to Child Communication

- Uses `@Input()` decorator to pass data from parent to child components
- Example: ProductList passes product data to ProductItem components

### Child to Parent Communication

- Uses `@Output()` decorator with EventEmitter
- Example: ProductItem emits events when adding items to cart

### Service-Based Communication

- CartService manages shared cart state across components
- Uses RxJS BehaviorSubject for reactive state management
- ProductService fetches product data from JSON file

## Form Validation

The checkout form includes the following validations:

- **Customer Name**: Minimum 3 characters required
- **Address**: Minimum 5 characters required
- **Credit Card**: Exactly 16 characters required

## Models

### Product

```typescript
{
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
}
```

### CartItem

```typescript
{
  product: Product;
  quantity: number;
}
```

### Order

```typescript
{
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  address: string;
  creditCard: string;
}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
