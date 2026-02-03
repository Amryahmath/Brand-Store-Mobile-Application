# FashionHub E-Commerce App

A production-quality, mobile-responsive e-commerce product details flow built with Next.js 15, React 19, TypeScript 5.9, and Tailwind CSS 4.

## 🎯 Features

- **Product Catalog**: Browse products with category filtering
- **Product Details**: View product images, select size and color variants
- **Shopping Cart**: Add items, view cart, remove items
- **Checkout Flow**: Complete orders with delivery address and payment method selection
- **Responsive Design**: Mobile-first UI matching Figma designs
- **TypeScript**: Fully typed for type safety
- **API Routes**: RESTful API built with Next.js API Routes

## 🚀 Tech Stack

- **Frontend**: React 19, Next.js 15.1, TypeScript 5.9
- **Styling**: Tailwind CSS 4.1, CSS Grid, Flexbox
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Backend**: Next.js API Routes (in-memory storage)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn package manager
- Git

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fashion-hub-ecommerce
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file and update it if needed:

```bash
cp .env.example .env
```

The `.env` file contains:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=your-secret-key-change-in-production
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🗂️ Project Structure

```
fashion-hub-ecommerce/
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts          # GET /api/products
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET /api/products/:id
│   │   ├── cart/
│   │   │   └── route.ts          # GET, POST, DELETE /api/cart
│   │   └── orders/
│   │       └── route.ts          # POST, GET /api/orders
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx          # Product details page
│   ├── cart/
│   │   └── page.tsx              # Shopping cart page
│   ├── checkout/
│   │   └── page.tsx              # Checkout page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (product catalog)
│   └── globals.css               # Global styles
├── lib/
│   ├── data.ts                   # Product seed data
│   └── store.ts                  # In-memory storage
├── types/
│   └── index.ts                  # TypeScript type definitions
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

## 🔌 API Endpoints

### Products

- **GET** `/api/products` - Get all products
  ```json
  Response: Product[]
  ```

- **GET** `/api/products/:id` - Get product by ID
  ```json
  Response: Product
  ```

### Cart

- **GET** `/api/cart` - Get current user's cart
  ```json
  Response: Cart
  ```

- **POST** `/api/cart` - Add item to cart
  ```json
  Body: {
    "productId": "string",
    "size": "string",
    "color": "string",
    "quantity": number
  }
  Response: Cart
  ```

- **DELETE** `/api/cart?itemId=:id` - Remove item from cart
  ```json
  Response: Cart
  ```

### Orders

- **POST** `/api/orders` - Create order from cart
  ```json
  Body: {
    "deliveryAddress": {
      "address": "string",
      "city": "string"
    },
    "paymentMethod": "string"
  }
  Response: {
    "success": true,
    "order": Order,
    "message": "Order created successfully"
  }
  ```

- **GET** `/api/orders` - Get user's orders
  ```json
  Response: Order[]
  ```

## 🎨 Key Features Implementation

### Product Details Page
- Dynamic routing with `/products/[id]`
- Image display with Next.js Image component
- Size selector (S, M, L, XL, XXL)
- Color swatches with visual feedback
- Add to cart functionality
- Responsive layout

### Shopping Cart
- Display cart items with product images
- Show size and color selections
- Remove items functionality
- Calculate subtotal, delivery fee, and total
- Empty cart state
- Proceed to checkout

### Checkout
- Display delivery address
- Payment method selection (Visa, Amex, Mastercard, PayPal, Apple Pay)
- Order summary
- Order creation with simulated payment
- Success feedback

### API Design
- RESTful API structure
- In-memory storage for cart and orders
- Seeded product data
- Mock authentication (test user)
- Proper error handling

## 🏗️ Build & Deployment

### Build for production

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `.next` folder.

### Start production server

```bash
npm start
# or
yarn start
```

### Deploy to Vercel

1. Push your code to GitHub

2. Import the project on [Vercel](https://vercel.com)

3. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_APP_URL`: Your production URL
   - `SESSION_SECRET`: A secure random string

4. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🧪 Testing the Application

### Test Flow:

1. **Browse Products**: Visit home page to see product catalog
2. **View Product**: Click on a product to see details
3. **Select Options**: Choose size (e.g., L) and color
4. **Add to Cart**: Click "Add To Cart" button
5. **View Cart**: Navigate to cart to see added items
6. **Checkout**: Click "Checkout Now"
7. **Complete Order**: Select payment method and click "Pay Now"
8. **Success**: Order is created and cart is cleared

### Seed Data:
The app comes with 5 pre-seeded products:
- Premium Tagerine Shirt ($257.85)
- Tagerine Shirt ($240.32)
- Leather Court ($325.36)
- Leather Tagerine Court ($257.85)
- Tagerine Shirt ($126.47)

## 📝 Design Decisions & Trade-offs

### Storage
- **Decision**: Used in-memory storage instead of database
- **Reason**: Faster development, meets project requirements
- **Trade-off**: Data resets on server restart
- **Production**: Would use PostgreSQL/MongoDB with Prisma ORM

### Authentication
- **Decision**: Mock authentication with test user
- **Reason**: Simplified implementation for demo
- **Trade-off**: No real user sessions
- **Production**: Would implement NextAuth.js or Clerk

### Images
- **Decision**: Used Unsplash URLs for product images
- **Reason**: Quick setup, professional quality
- **Trade-off**: External dependency
- **Production**: Would use Cloudinary or S3

### State Management
- **Decision**: Used React Hooks (useState, useEffect)
- **Reason**: Sufficient for this app's complexity
- **Trade-off**: API calls in multiple places
- **Production**: Would consider React Query or Zustand

### Mobile-First
- **Decision**: Focused on mobile responsive design
- **Reason**: Matches Figma designs, modern user behavior
- **Implementation**: Tailwind responsive classes, touch-friendly UI

## 🎥 Demo Video

A demo screencast (1-3 minutes) showing:
- Product page navigation
- Size and color selection
- Add to cart flow
- Cart management
- Checkout and order creation

[Link to demo video - to be added]

## 🤝 Contributing

This is a test project for intern evaluation. For production use, consider:
- Database integration
- Real authentication
- Payment gateway integration
- Unit and integration tests
- Error boundaries
- Loading states
- Accessibility improvements
- SEO optimization

## 📄 License

This project is for educational and evaluation purposes.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername]
- Email: your.email@example.com

---

**Note**: This project was built as part of an intern full-stack developer test. The focus was on demonstrating proficiency in React, Next.js, TypeScript, Tailwind CSS, and API development while matching the provided Figma designs.
