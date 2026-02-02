'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { products, categories } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Product not found</p>
          <Link href="/shop" className="text-amber-700 hover:text-amber-800">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />);
      } else {
        stars.push(<Star key={i} className="h-5 w-5 text-stone-300" />);
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-stone-900">Shop</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/shop/${category.slug}`} className="hover:text-stone-900">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-stone-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-stone-100">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl">🍓</span>
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-amber-700 text-white text-sm font-medium px-4 py-1 rounded-full">
                NEW
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900">
              {product.name}
            </h1>
            
            <div className="mt-2">
              <p className="text-lg text-stone-600">{product.farmName}</p>
              <p className="text-stone-500">from {product.location}</p>
            </div>

            {/* Rating */}
            {product.rating && product.reviewCount && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-stone-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-6">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-medium text-stone-900">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-stone-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-medium text-stone-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Order Deadline */}
            {product.orderDeadline && (
              <p className="mt-4 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-lg inline-block">
                Order by {product.orderDeadline} for delivery around {product.deliveryDate}
              </p>
            )}

            {/* Description */}
            <p className="mt-6 text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* SKU */}
            <p className="mt-4 text-sm text-stone-500">
              SKU: {product.sku}
            </p>

            {/* Inventory */}
            <p className="mt-2 text-sm text-stone-500">
              {product.inventory > 0 ? (
                <span className="text-green-600">In Stock ({product.inventory} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-stone-600 hover:text-stone-900"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-stone-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-stone-600 hover:text-stone-900"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-amber-700 text-white font-medium rounded hover:bg-amber-800 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Back Link */}
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <h2 className="font-serif text-2xl text-stone-900 mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
