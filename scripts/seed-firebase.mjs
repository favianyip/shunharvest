// Firebase Seed Script for Shun Harvest
// Run with: node scripts/seed-firebase.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDrGE1EtOEvGkSO-wlnp1Ym6PmO6nk0oc",
  authDomain: "shun-harvest.firebaseapp.com",
  projectId: "shun-harvest",
  storageBucket: "shun-harvest.firebasestorage.app",
  messagingSenderId: "927295061533",
  appId: "1:927295061533:web:387b9d15e302d2269550f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Categories data
const categories = [
  {
    name: 'Melons',
    slug: 'japanese-melons',
    description: 'Premium Japanese melons including Yubari, Crown, and more',
    image: '/images/categories/melons.jpg',
    order: 1,
  },
  {
    name: 'Strawberries',
    slug: 'japanese-strawberries',
    description: 'Exquisite Japanese strawberry varieties',
    image: '/images/categories/strawberries.jpg',
    order: 2,
  },
  {
    name: 'Persimmons',
    slug: 'japanese-persimmons',
    description: 'Sweet and flavorful Japanese persimmons',
    image: '/images/categories/persimmons.jpg',
    order: 3,
  },
  {
    name: 'Pears',
    slug: 'japanese-pears',
    description: 'Crisp and juicy Japanese pears',
    image: '/images/categories/pears.jpg',
    order: 4,
  },
  {
    name: 'Oranges',
    slug: 'japanese-oranges',
    description: 'Sweet Japanese citrus fruits',
    image: '/images/categories/oranges.jpg',
    order: 5,
  },
  {
    name: 'Artisanal Items',
    slug: 'artisanal-items',
    description: 'Premium preserves, purees, and more',
    image: '/images/categories/artisanal.jpg',
    order: 6,
  },
];

// Products data
const products = [
  {
    name: 'Amaou (Ulu Berry)',
    sku: 'STR-AMAOU-001',
    description: "Amaou strawberries are one of Japan's most prestigious varieties, known for their perfect balance of sweetness and acidity. Grown exclusively in Fukuoka Prefecture, each berry is carefully cultivated to achieve the ideal size, color, and flavor.",
    price: 138.00,
    images: ['/images/products/amaou.jpg', '/images/products/amaou-yukibotan.jpg'],
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
    name: 'Amaou + Yukibotan',
    sku: 'STR-COMBO-001',
    description: "A luxurious combination of Amaou and Yukibotan strawberries. Experience two of Japan's finest strawberry varieties in one premium gift box.",
    price: 138.00,
    images: ['/images/products/amaou-yukibotan.jpg'],
    categoryId: 'strawberries',
    farmName: 'Uluu Farm',
    location: 'Fukuoka Prefecture',
    inventory: 30,
    isNew: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 7,
    orderDeadline: '02/08/2026',
    deliveryDate: '2/20/2026',
  },
  {
    name: 'Ichigosan',
    sku: 'STR-ICHI-001',
    description: 'Ichigosan is a premium strawberry variety from Saga Prefecture. Known for its elongated shape and exceptional sweetness, each berry is a testament to Japanese agricultural excellence.',
    price: 119.00,
    images: ['/images/products/ichigosan.jpg', '/images/products/kotoka.jpg'],
    categoryId: 'strawberries',
    farmName: 'Hirakawa Farm',
    location: 'Saga Prefecture',
    inventory: 45,
    isNew: false,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 4,
    orderDeadline: '02/08/2026',
    deliveryDate: '2/20/2026',
  },
  {
    name: 'Yubari King Melon',
    sku: 'MEL-YUBARI-001',
    description: "The legendary Yubari King Melon from Hokkaido. Known as one of the world's most expensive fruits, each melon is perfectly round with a smooth rind and exceptionally sweet orange flesh.",
    price: 289.00,
    images: ['/images/products/yubari.jpg', '/images/products/crown.jpg'],
    categoryId: 'melons',
    farmName: 'Yubari Farms',
    location: 'Hokkaido',
    inventory: 10,
    isNew: false,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 43,
    orderDeadline: '05/15/2026',
    deliveryDate: '6/01/2026',
  },
  {
    name: 'Crown Melon',
    sku: 'MEL-CROWN-001',
    description: "The Crown Melon from Shizuoka is considered the pinnacle of melon cultivation. Each vine produces only one melon, allowing it to receive all the plant's nutrients for maximum sweetness.",
    price: 249.00,
    images: ['/images/products/crown.jpg'],
    categoryId: 'melons',
    farmName: 'Shizuoka Melon Farm',
    location: 'Shizuoka Prefecture',
    inventory: 15,
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 28,
    orderDeadline: '05/15/2026',
    deliveryDate: '6/01/2026',
  },
  {
    name: 'Fuyu Persimmon',
    sku: 'PER-FUYU-001',
    description: 'Sweet Fuyu persimmons that can be enjoyed while still firm. These non-astringent persimmons have a honey-like sweetness and crisp texture.',
    price: 79.00,
    images: ['/images/products/fuyu.jpg'],
    categoryId: 'persimmons',
    farmName: 'Nara Farms',
    location: 'Nara Prefecture',
    inventory: 60,
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 15,
    orderDeadline: '10/15/2026',
    deliveryDate: '11/01/2026',
  },
  {
    name: 'Nijisseiki Nashi Pear',
    sku: 'PEA-NASHI-001',
    description: 'The Nijisseiki (20th Century) pear is crisp, juicy, and refreshingly sweet. A beloved variety in Japan, perfect for enjoying fresh.',
    price: 89.00,
    images: ['/images/products/nashi.jpg'],
    categoryId: 'pears',
    farmName: 'Tottori Orchards',
    location: 'Tottori Prefecture',
    inventory: 40,
    isNew: false,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 9,
    orderDeadline: '09/01/2026',
    deliveryDate: '9/15/2026',
  },
  {
    name: 'Dekopon',
    sku: 'ORA-DEKOPON-001',
    description: 'Dekopon is a seedless and sweet mandarin orange, recognizable by its distinctive topknot. Each fruit is tested for sugar content to ensure exceptional sweetness.',
    price: 99.00,
    images: ['/images/products/dekopon.jpg'],
    categoryId: 'oranges',
    farmName: 'Kumamoto Citrus',
    location: 'Kumamoto Prefecture',
    inventory: 35,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 22,
    orderDeadline: '01/15/2026',
    deliveryDate: '2/01/2026',
  },
  {
    name: 'Premium Strawberry Preserve',
    sku: 'ART-PRES-001',
    description: 'Made from premium Japanese strawberries, this preserve captures the essence of fresh fruit. Perfect for toast, pastries, or enjoying straight from the jar.',
    price: 45.00,
    images: ['/images/products/preserve.webp'],
    categoryId: 'artisanal',
    farmName: 'Shun Kitchen',
    location: 'Tokyo',
    inventory: 100,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 31,
  },
  {
    name: 'Crown Melon Puree',
    sku: 'ART-PURE-001',
    description: 'Pure Crown Melon puree made from premium Shizuoka melons. Perfect for cocktails, desserts, or as a luxurious topping.',
    price: 55.00,
    images: ['/images/products/puree.webp'],
    categoryId: 'artisanal',
    farmName: 'Shun Kitchen',
    location: 'Tokyo',
    inventory: 75,
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 18,
  },
  {
    name: 'Kotoka',
    sku: 'STR-KOTO-001',
    description: 'Kotoka strawberries from Nara Prefecture are known for their exceptional sweetness and aroma. A limited variety highly sought after by fruit enthusiasts.',
    price: 148.00,
    images: ['/images/products/kotoka.jpg'],
    categoryId: 'strawberries',
    farmName: 'Nara Berry Farm',
    location: 'Nara Prefecture',
    inventory: 0, // Sold out
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 23,
  },
  {
    name: 'Benihoppe',
    sku: 'STR-BENI-001',
    description: 'Benihoppe strawberries from Shizuoka are prized for their beautiful red color and perfectly balanced flavor profile.',
    price: 128.00,
    images: ['/images/products/ichigosan.jpg'],
    categoryId: 'strawberries',
    farmName: 'Shizuoka Berry Garden',
    location: 'Shizuoka Prefecture',
    inventory: 25,
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 11,
    orderDeadline: '02/08/2026',
    deliveryDate: '2/20/2026',
  },
];

// Banners data - using existing images in /public/images/banners/
const banners = [
  {
    title: 'Premium Japanese Fruits',
    subtitle: 'Fresh from Japan',
    description: 'Experience the finest seasonal fruits, delivered to your door.',
    image: '/images/banners/slide1.jpg',
    link: '/shop',
    linkText: 'Shop Now',
    order: 1,
    isActive: true,
  },
  {
    title: 'Curated by Fruit Connoisseurs',
    description: 'Enjoy our selection of cream of the crop fruits from Japan.',
    image: '/images/banners/slide2.jpg',
    link: '/shop',
    linkText: 'SHOP NOW',
    order: 2,
    isActive: true,
  },
  {
    title: 'Crafted by Fruit Artisans',
    description: 'Every fruit is made with meticulous care and intense passion.',
    image: '/images/banners/slide3.jpg',
    order: 3,
    isActive: true,
  },
  {
    title: 'Melon that melts in your mouth',
    description: 'A fruit tasting experience like never before.',
    image: '/images/banners/slide4.jpg',
    link: '/shop/japanese-melons',
    linkText: 'EXPLORE MELONS',
    order: 4,
    isActive: true,
  },
  {
    title: 'NEW Premium Preserves & Purees',
    subtitle: "START SPREADIN' THE NEWS",
    description: 'Add gourmet Japanese fruits to anything.',
    image: '/images/banners/preserves.jpg',
    link: '/shop/artisanal-items',
    linkText: 'SHOP NOW',
    order: 5,
    isActive: true,
  },
];

async function clearCollection(collectionName) {
  console.log(`  Clearing ${collectionName}...`);
  const snapshot = await getDocs(collection(db, collectionName));
  for (const doc of snapshot.docs) {
    await deleteDoc(doc.ref);
  }
  console.log(`  ✓ Cleared ${snapshot.size} documents`);
}

async function seedCollection(collectionName, data) {
  console.log(`  Seeding ${collectionName}...`);
  const ref = collection(db, collectionName);
  let count = 0;
  for (const item of data) {
    await addDoc(ref, {
      ...item,
      createdAt: new Date(),
    });
    count++;
  }
  console.log(`  ✓ Added ${count} documents`);
}

async function main() {
  console.log('\n🌱 Shun Harvest Firebase Seeder\n');
  console.log('================================\n');

  try {
    // Clear existing data
    console.log('📦 Clearing existing data...');
    await clearCollection('categories');
    await clearCollection('products');
    await clearCollection('banners');
    console.log('');

    // Seed new data
    console.log('🚀 Seeding new data...');
    await seedCollection('categories', categories);
    await seedCollection('products', products);
    await seedCollection('banners', banners);
    console.log('');

    console.log('✅ Database seeded successfully!\n');
    console.log('Summary:');
    console.log(`  - ${categories.length} categories`);
    console.log(`  - ${products.length} products`);
    console.log(`  - ${banners.length} banners`);
    console.log('\n🎉 Done! Refresh shunharvest.com to see the changes.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();
