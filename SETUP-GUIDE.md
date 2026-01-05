# Setup Guide & Steps

## Project setup

1- use old NgModules structure instead of standalone components

```
ng new my-app --no-standalone
```

2- Generate needed components
3- Fetch data based on `ngOnInit()` from `data.json` file located in `src/assets` folder for the product listing & detail pagies
-- use directives `Directives` like `*ngFor` to display the data iteratively
-- Use data passing strategies:
--- Parent to Child: Use `@Input()` decorator to pass data from parent components to child components.
--- Child to Parent: Use `@Output()` decorator and EventEmitter to send data from child
--- see samples at `./CODE-Samples.md`

4- Create navigation
5- create routing

## Components heirarchy

- NavBarComponent
- ProductListComponent
  - ProductItemComponent
- ShoppingCartComponent
  - CartItemComponent
- ProductDetailsComponent
- CheckoutComponent
- OrderConfirmationComponent

## Data collection (forms)

- use the example provided in `./CODE-Samples.md`

## Models

- Product
  - id: number
  - name: string
  - description: string
  - price: number
  - imageUrl: string
- CartItem
  - product: Product
  - quantity: number
- Order
  - items: CartItem[]
  - totalAmount: number

## Data

- The product data is provided in the `data.json` file located in the `src/assets` folder.
- The cart should be managed using a dedicated Angular service to allow sharing of cart data between components.

## Routing

Use Angular Router to set up navigation between the following routes:

- `/products`: ProductListComponent
- `/products/:id`: ProductDetailsComponent
- `/cart`: ShoppingCartComponent
- `/checkout`: CheckoutComponent
- `/order-confirmation`: OrderConfirmationComponent
