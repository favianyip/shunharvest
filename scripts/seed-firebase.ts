// Run this script to seed Firebase with initial data
// Usage: npx ts-node scripts/seed-firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDrGE1EtOEvGkSO-wlnp1Ym6PmO6nk0oc",
  authDomain: "shun-harvest.firebaseapp.com",
  projectId: "shun-harvest",
  storageBucket: "shun-harvest.firebasestorage.app",
  messagingSenderId: "927295061533",
  appId: "1:927295061533:web:387b9d15e302d2269550f4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = [
  {
    id: 'melons',
    name: 'Melons',
    slug: 'japanese-melons',
    description: 'Premium Japanese melons including Yubari, Crown, and more',
    image: '/images/categories/melons.jpg',
    order: 1,
  },
  {
    id: 'strawberries',
    name: 'Strawberries',
    slug: 'japanese-strawberries',
    description: 'Exquisite Japanese strawberry varieties',
    image: '/images/categories/strawberries.jpg',
    order: 2,
  },
  {
    id: 'persimmons',
    name: 'Persimmons',
    slug: 'japanese-persimmons',
    description: 'Sweet and flavorful Japanese persimmons',
    image: '/images/categories/persimmons.jpg',
    order: 3,
  },
  {
    id: 'pears',
    name: 'Pears',
    slug: 'japanese-pears',
    description: 'Crisp and juicy Japanese pears',
    image: '/images/categories/pears.jpg',
    order: 4,
  },
  {
    id: 'oranges',
    name: 'Oranges',
    slug: 'japanese-oranges',
    description: 'Sweet Japanese citrus fruits',
    image: '/images/categories/oranges.jpg',
    order: 5,
  },
  {
    id: 'artisanal',
    name: 'Artisanal Items',
    slug: 'artisanal-items',
    description: 'Premium preserves, purees, and more',
    image: '/images/categories/artisanal.jpg',
    order: 6,
  },
];

const products = [
  {
    name: 'Amaou (Ulu Berry)',
    sku: 'STR-AMAOU-001',
    description: 'Amaou strawberries are one of Japan\'s most prestigious varieties, known for their perfect balance of sweetness and acidity. Grown exclusively in Fukuoka Prefecture.',
    price: 138.00,
    images: ['/images/products/amaou.jpg'],
    categoryId: 'strawberries',
    farmName: 'Uluu Farm',
    location: 'Fukuoka Prefecture',
    inventory: 50,
    isNew: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 12,
    orderDeadline: '02/08/2026',
    deliveryDate: '2/20/2026',
  },
  {
    name: 'Ichigosan',
    sku: 'STR-ICHIGO-001',
    description: 'Ichigosan is a premium strawberry variety from Saga Prefecture, celebrated for its elegant sweetness and beautiful appearance.',
    price: 119.00,
    images: ['/images/products/ichigosan.jpg'],
    categoryId: 'strawberries',
    farmName: 'Hirakawa Farm',
    location: 'Saga Prefecture',
    inventory: 40,
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 4,
    orderDeadline: '02/08/2026',
    deliveryDate: '2/20/2026',
  },
  {
    name: 'Yubari King Melon',
    sku: 'MEL-YUBARI-001',
    description: 'The legendary Yubari King Melon from Hokkaido - one of the world\'s most expensive and sought-after fruits.',
    price: 298.00,
    images: ['/images/products/yubari.jpg'],
    categoryId: 'melons',
    farmName: 'Yubari Farm',
    location: 'Hokkaido',
    inventory: 15,
    isNew: false,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 8,
    orderDeadline: '02/15/2026',
    deliveryDate: '2/25/2026',
  },
  {
    name: 'Crown Melon',
    sku: 'MEL-CROWN-001',
    description: 'Premium Crown Melon from Shizuoka Prefecture, known for its perfect spherical shape and exquisite sweetness.',
    price: 188.00,
    images: ['/images/products/crown-melon.jpg'],
    categoryId: 'melons',
    farmName: 'Shizuoka Melon Farm',
    location: 'Shizuoka Prefecture',
    inventory: 25,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 15,
    orderDeadline: '02/15/2026',
    deliveryDate: '2/25/2026',
  },
  {
    name: 'Fuyu Persimmon',
    sku: 'PER-FUYU-001',
    description: 'Sweet Fuyu persimmons from Nara Prefecture, perfect for eating fresh.',
    price: 68.00,
    images: ['/images/products/persimmon.jpg'],
    categoryId: 'persimmons',
    farmName: 'Nara Fruit Farm',
    location: 'Nara Prefecture',
    inventory: 60,
    isNew: false,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 22,
    orderDeadline: '02/10/2026',
    deliveryDate: '2/18/2026',
  },
  {
    name: 'Nijisseiki Pear',
    sku: 'PEA-NIJI-001',
    description: 'Crisp and refreshing Nijisseiki pears from Tottori Prefecture.',
    price: 78.00,
    images: ['/images/products/pear.jpg'],
    categoryId: 'pears',
    farmName: 'Tottori Orchard',
    location: 'Tottori Prefecture',
    inventory: 45,
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 18,
    orderDeadline: '02/12/2026',
    deliveryDate: '2/22/2026',
  },
];

const banners = [
  {
    title: 'Premium Japanese Fruits',
    subtitle: 'Fresh from Japan',
    description: 'Experience the finest seasonal fruits, delivered to your door.',
    image: '/images/banners/hero-strawberry.jpg',
    link: '/shop',
    linkText: 'Shop Now',
    order: 1,
    isActive: true,
  },
  {
    title: 'Melon Season',
    subtitle: 'Limited Time',
    description: 'Discover our exclusive selection of Japanese melons.',
    image: '/images/banners/hero-melon.jpg',
    link: '/shop/japanese-melons',
    linkText: 'Explore Melons',
    order: 2,
    isActive: true,
  },
];

async function seedData() {
  console.log('Seeding Firebase with initial data...\n');

  // Seed categories
  console.log('Adding categories...');
  for (const category of categories) {
    await addDoc(collection(db, 'categories'), {
      ...category,
      createdAt: new Date(),
    });
    console.log(`  ✓ ${category.name}`);
  }

  // Seed products
  console.log('\nAdding products...');
  for (const product of products) {
    await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date(),
    });
    console.log(`  ✓ ${product.name}`);
  }

  // Seed banners
  console.log('\nAdding banners...');
  for (const banner of banners) {
    await addDoc(collection(db, 'banners'), banner);
    console.log(`  ✓ ${banner.title}`);
  }

  console.log('\n✅ Seeding complete!');
  process.exit(0);
}

seedData().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
