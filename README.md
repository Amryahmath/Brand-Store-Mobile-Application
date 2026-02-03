# FashionHub E-Commerce App

A production-quality, mobile-responsive e-commerce application built with Next.js 15, React 19, TypeScript 5.9, and Tailwind CSS 4.

## 🎯 Features

- **Onboarding Flow**: Welcome screen with smooth transitions
- **Product Catalog**: Browse products with category filtering (All, Men, Women, Kids, Other)
- **Product Details**: View product images, select size and color variants
- **Shopping Cart**: Add items, view cart with item images, remove items
- **Checkout Flow**: Complete orders with editable delivery address and payment method selection
- **Responsive Design**: Mobile-first UI with modern design
- **TypeScript**: Fully typed for type safety
- **API Routes**: RESTful API built with Next.js API Routes

## 🚀 Tech Stack

- **Frontend**: React 19, Next.js 15.5, TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Backend**: Next.js API Routes (in-memory storage)
- **Images**: Next.js Image optimization

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git**

## 🛠️ Installation & Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Brand-Store-Mobile-Application.git
cd Brand-Store-Mobile-Application
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```env
# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Session Secret (generate a random string for production)
SESSION_SECRET=your-secret-key-change-in-production
```

**Environment Variables Explained:**
- `NEXT_PUBLIC_APP_URL`: The base URL for your application (for API calls)
- `SESSION_SECRET`: Secret key for session management (change in production)

### 4. Seed the database

The application comes with **pre-seeded data** in `lib/data.ts`. No additional seeding is required!

The app includes:
- **5 products** with images, multiple colors, and sizes
- Product categories (Men, Women, Kids)
- Pricing and inventory data

**Data is stored in-memory** and will reset when the server restarts. For production, you would integrate a real database.

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 6. Open in your browser

Visit [http://localhost:3000](http://localhost:3000) to see the app in action!

**Navigation Flow:**
1. `/` or `/onboarding` - Welcome screen with "Sign In" and "Sign Up" buttons
2. `/explore` - Product catalog with category filters
3. `/products/[id]` - Product details page
4. `/cart` - Shopping cart
5. `/checkout` - Checkout and payment

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

### Complete Test Flow:

1. **Welcome Screen**: Visit `http://localhost:3000`
   - See the onboarding screen with product image
   - Click "Sign In" or "Sign Up" to continue

2. **Browse Products**: You'll be redirected to `/explore`
   - View product grid with images
   - Filter by categories (All, Men, Women, Kids, Other)
   - See product names and prices

3. **View Product Details**: Click any product
   - See full product image
   - View product description
   - Choose color variants (see image change)
   - Select size (S, M, L, XL, XXL)
   - View price at bottom

4. **Add to Cart**: Click "Add To Cart"
   - Automatically redirected to cart page
   - See item with larger product image
   - View selected size and color
   - See quantity and price

5. **Manage Cart**: On `/cart` page
   - Click heart icon to favorite (visual feedback)
   - Click trash icon to remove items
   - View total summary (items, delivery, total payment)
   - Click "Checkout Now"

6. **Checkout**: On `/checkout` page
   - View/edit delivery address (click "Change")
   - Select payment method (Visa, Mastercard, Amex, PayPal, Apple Pay)
   - See real payment logos
   - Review order summary
   - Click "Pay Now"

7. **Order Success**: 
   - Order confirmation alert appears
   - Cart is cleared
   - Redirected to home page

### 📦 Seed Data Details

The application includes **5 pre-configured products** in `lib/data.ts`:

| Product Name | Price | Category | Colors Available | Sizes |
|-------------|-------|----------|------------------|-------|
| Premium Tagerine Shirt | $257.85 | Men | Cream, Navy, Olive | S-XXL |
| Tagerine Shirt | $240.32 | Men | White, Blue | S-XL |
| Leather Court | $325.36 | Women | Pink, Black | S-XL |
| Leather Tagerine Court | $257.85 | Women | Brown, Tan | S-XL |
| Tagerine Shirt | $126.47 | Men | Gray, Navy | S-XL |

**To modify seed data:**
1. Open `lib/data.ts`
2. Edit the `products` array
3. Add/remove/modify product objects
4. Save and restart the dev server

**Product data structure:**
```typescript
{
  id: string,
  name: string,
  description: string,
  price: number,
  category: 'men' | 'women' | 'kids' | 'other',
  images: string[],  // Unsplash image URLs
  sizes: string[],
  colors: { name: string, value: string, image?: string }[],
  stock: number
}
```

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
