// Update category images with high-quality Unsplash images
// Run with: node scripts/update-category-images.mjs

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

// High-quality category images from Unsplash (royalty-free)
const categoryImages = {
  'japanese-melons': 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&q=80', // Melon
  'japanese-strawberries': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80', // Strawberries
  'japanese-persimmons': 'https://images.unsplash.com/photo-1604526241235-628bd56038a8?w=800&q=80', // Persimmons
  'japanese-pears': 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=800&q=80', // Pears
  'japanese-oranges': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80', // Oranges/Citrus
  'artisanal-items': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80', // Jams/Preserves
};

async function updateCategoryImages() {
  console.log('Updating category images...\n');
  
  const categoriesSnapshot = await getDocs(collection(db, 'categories'));
  let updated = 0;
  
  for (const categoryDoc of categoriesSnapshot.docs) {
    const category = categoryDoc.data();
    const newImage = categoryImages[category.slug];
    
    if (newImage) {
      console.log(`  ${category.name}: Updating image...`);
      await updateDoc(doc(db, 'categories', categoryDoc.id), {
        image: newImage
      });
      updated++;
    } else {
      console.log(`  ${category.name}: No image mapping found for slug "${category.slug}"`);
    }
  }
  
  console.log(`\nDone! Updated ${updated} categories.`);
}

updateCategoryImages().catch(console.error);
