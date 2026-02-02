import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Category, Product, Order, Banner } from '@/types';

// Collection references
const categoriesRef = collection(db, 'categories');
const productsRef = collection(db, 'products');
const ordersRef = collection(db, 'orders');
const bannersRef = collection(db, 'banners');

// Helper to convert Firestore timestamps
const convertTimestamp = (data: Record<string, unknown>) => {
  const result = { ...data };
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Timestamp) {
      result[key] = (result[key] as Timestamp).toDate();
    }
  });
  return result;
};

// Categories
export async function getCategories(): Promise<Category[]> {
  const q = query(categoriesRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamp(doc.data()),
  })) as Category[];
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const docRef = doc(db, 'categories', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...convertTimestamp(snapshot.data()) } as Category;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const q = query(categoriesRef, where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...convertTimestamp(doc.data()) } as Category;
}

export async function addCategory(category: Omit<Category, 'id'>): Promise<string> {
  const docRef = await addDoc(categoriesRef, {
    ...category,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await updateDoc(docRef, data);
}

export async function deleteCategory(id: string): Promise<void> {
  const docRef = doc(db, 'categories', id);
  await deleteDoc(docRef);
}

// Products
export async function getProducts(constraints?: QueryConstraint[]): Promise<Product[]> {
  const q = constraints
    ? query(productsRef, ...constraints)
    : query(productsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamp(doc.data()),
  })) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, 'products', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...convertTimestamp(snapshot.data()) } as Product;
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  const q = query(productsRef, where('sku', '==', sku));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...convertTimestamp(doc.data()) } as Product;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const q = query(productsRef, where('categoryId', '==', categoryId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamp(doc.data()),
  })) as Product[];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(productsRef, where('isFeatured', '==', true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamp(doc.data()),
  })) as Product[];
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<string> {
  const docRef = await addDoc(productsRef, {
    ...product,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
}

// Orders
export async function getOrders(): Promise<Order[]> {
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamp(doc.data()),
  })) as Order[];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const docRef = doc(db, 'orders', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...convertTimestamp(snapshot.data()) } as Order;
}

export async function createOrder(order: Omit<Order, 'id'>): Promise<string> {
  const docRef = await addDoc(ordersRef, {
    ...order,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function updateOrder(id: string, data: Partial<Order>): Promise<void> {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date(),
  });
}

// Banners
export async function getBanners(): Promise<Banner[]> {
  const q = query(bannersRef, where('isActive', '==', true), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Banner[];
}

export async function getAllBanners(): Promise<Banner[]> {
  const q = query(bannersRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Banner[];
}

export async function addBanner(banner: Omit<Banner, 'id'>): Promise<string> {
  const docRef = await addDoc(bannersRef, banner);
  return docRef.id;
}

export async function updateBanner(id: string, data: Partial<Banner>): Promise<void> {
  const docRef = doc(db, 'banners', id);
  await updateDoc(docRef, data);
}

export async function deleteBanner(id: string): Promise<void> {
  const docRef = doc(db, 'banners', id);
  await deleteDoc(docRef);
}
