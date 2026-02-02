// Fix product categoryIds to use actual Firebase document IDs
// Run with: node scripts/fix-category-ids.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDrGE1EtOEvGkSO-wlnp1Ym6PmO6nk0oc",
  authDomain: "shun-harvest.firebaseapp.com",
  projectId: "shun-harvest",
  storageBucket: "shun-harvest.firebasestorage.app",
  messagingSenderId: "927295061533",
  appId: "1:927295061533:web:387b9d15e302d2269550f4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Map of old categoryId (slug-like) to category slug for matching
const categorySlugMap = {
  'strawberries': 'japanese-strawberries',
  'melons': 'japanese-melons',
  'persimmons': 'japanese-persimmons',
  'pears': 'japanese-pears',
  'oranges': 'japanese-oranges',
  'artisanal': 'artisanal-items',
  'artisanal-items': 'artisanal-items',
};

async function fixCategoryIds() {
  console.log('Fetching categories...');
  
  // Get all categories
  const categoriesSnapshot = await getDocs(collection(db, 'categories'));
  const categories = {};
  categoriesSnapshot.forEach(doc => {
    const data = doc.data();
    categories[data.slug] = doc.id;
    console.log(`  Category: ${data.name} (slug: ${data.slug}) -> ID: ${doc.id}`);
  });
  
  console.log('\nFetching products...');
  
  // Get all products
  const productsSnapshot = await getDocs(collection(db, 'products'));
  let updated = 0;
  let skipped = 0;
  
  for (const productDoc of productsSnapshot.docs) {
    const product = productDoc.data();
    const oldCategoryId = product.categoryId;
    
    // Check if categoryId needs fixing
    if (!oldCategoryId) {
      console.log(`  ${product.name}: No categoryId, skipping`);
      skipped++;
      continue;
    }
    
    // Check if already a valid Firebase ID (exists in categories values)
    const validIds = Object.values(categories);
    if (validIds.includes(oldCategoryId)) {
      console.log(`  ${product.name}: Already has valid categoryId`);
      skipped++;
      continue;
    }
    
    // Map old categoryId to slug
    const slug = categorySlugMap[oldCategoryId] || oldCategoryId;
    const newCategoryId = categories[slug];
    
    if (newCategoryId) {
      console.log(`  ${product.name}: ${oldCategoryId} -> ${newCategoryId}`);
      await updateDoc(doc(db, 'products', productDoc.id), {
        categoryId: newCategoryId
      });
      updated++;
    } else {
      console.log(`  ${product.name}: Could not find category for "${oldCategoryId}"`);
      skipped++;
    }
  }
  
  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
}

fixCategoryIds().catch(console.error);
