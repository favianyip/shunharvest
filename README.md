# Ikigai Fruits Clone

A clone of [ikigaifruits.com](https://ikigaifruits.com/) built with Next.js 14, Tailwind CSS, and Firebase.

## Features

- 🍓 **Product Catalog**: Browse premium Japanese fruits by category
- 🛒 **Shopping Cart**: Add items to cart with persistent storage
- 👤 **Admin Panel**: Manage products, categories, inventory, and pricing
- 🔐 **Authentication**: Secure admin login with JWT tokens
- 🔥 **Firebase Ready**: Configured for Firestore database
- 📱 **Responsive Design**: Works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account (optional, for production)

### Installation

1. Clone or navigate to the project:
   ```bash
   cd "C:\Users\favia\Downloads\download website\ikigai-fruits-clone"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

**Default credentials:**
- Username: `admin`
- Password: `admin123`

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── product/           # Product detail pages
│   ├── shop/              # Shop and category pages
│   └── ...
├── components/            # Reusable components
├── context/               # React context (Cart)
├── data/                  # Mock data
├── lib/                   # Firebase and utilities
│   └── firebase/
│       ├── auth.ts        # Admin authentication
│       ├── config.ts      # Firebase configuration
│       └── firestore.ts   # Database operations
└── types/                 # TypeScript types
```

## Firebase Setup (Optional)

For production use with real data:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

2. Enable Firestore Database

3. Create a `.env.local` file with your credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   JWT_SECRET=your_secret_key
   ```

4. Set up Firestore collections:
   - `products` - Product documents
   - `categories` - Category documents
   - `banners` - Homepage banners
   - `orders` - Customer orders

## Admin Features

### Products Management
- Add, edit, delete products
- Set SKU, pricing, and inventory
- Mark products as new or featured
- Filter by category or search

### Categories Management
- Create and edit categories
- Set display order
- Auto-generate slugs

### Inventory Tracking
- View low stock alerts
- Update inventory levels
- Track product availability

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: JWT with bcrypt
- **Icons**: Lucide React
- **Fonts**: Playfair Display, Inter

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Customization

### Adding Products

Products can be added via:
1. Admin panel at `/admin/products`
2. Directly editing `src/data/mockData.ts`
3. Firebase Firestore (when configured)

### Styling

The site uses Tailwind CSS with a warm amber/stone color palette. Customize in:
- `tailwind.config.ts` - Theme configuration
- `src/app/globals.css` - Global styles

## License

This is a clone project for educational purposes.

---

Built with ❤️ using Next.js and Firebase
