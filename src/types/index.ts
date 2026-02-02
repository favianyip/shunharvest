export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  categoryId: string;
  farmName: string;
  location: string;
  inventory: number;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  reviewCount?: number;
  orderDeadline?: string;
  deliveryDate?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  link?: string;
  linkText?: string;
  order: number;
  isActive: boolean;
}

export interface PaymentSettings {
  stripeEnabled: boolean;
  stripePublishableKey?: string;
  stripeSecretKey?: string;
  paynowEnabled: boolean;
  paynowUEN?: string;
  paynowName?: string;
  paynowQRImage?: string;
  paynowEmail?: string;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  method: 'stripe' | 'paynow';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  stripeSessionId?: string;
  paynowReference?: string;
  customerEmail: string;
  createdAt: Date;
  updatedAt?: Date;
}
