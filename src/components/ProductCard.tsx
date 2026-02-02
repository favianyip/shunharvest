'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const isOutOfStock = product.inventory === 0;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 fill-amber-500/50 text-amber-500" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-3.5 w-3.5 text-stone-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="group relative bg-white">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isOutOfStock ? 'opacity-50' : 'group-hover:scale-105'
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-amber-50">
                <span className="text-amber-700 text-6xl">🍓</span>
              </div>
            )}
          </div>
        </Link>
        
        {/* SOLD OUT Badge - Large overlay style like original */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-stone-900/80 text-white text-sm font-medium px-6 py-2 tracking-wider">
              SOLD OUT
            </div>
          </div>
        )}

        {/* NEW Badge */}
        {product.isNew && !isOutOfStock && (
          <div className="absolute top-3 left-3 bg-amber-700 text-white text-xs font-medium px-3 py-1">
            NEW
          </div>
        )}

        {/* Quick Add Button - only show if in stock */}
        {!isOutOfStock && (
          <button
            onClick={() => addItem(product)}
            className="absolute bottom-3 right-3 p-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-stone-100"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5 text-stone-700" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-stone-900 hover:text-amber-700 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 text-sm text-stone-600">{product.farmName}</p>
        <p className="text-sm text-stone-500">{product.location}</p>

        {/* Price */}
        <div className="mt-2">
          {product.salePrice ? (
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-stone-900">
                From ${product.salePrice.toFixed(0)}
              </span>
              <span className="text-sm text-stone-400 line-through">
                ${product.price.toFixed(0)}
              </span>
            </div>
          ) : (
            <span className="text-base font-medium text-stone-900">
              From ${product.price.toFixed(0)}
            </span>
          )}
        </div>

        {/* Order deadline or Currently unavailable */}
        <div className="mt-2">
          {isOutOfStock ? (
            <p className="text-xs text-stone-500">Currently unavailable</p>
          ) : product.orderDeadline ? (
            <p className="text-xs text-stone-600">
              Order deadline: {product.orderDeadline}
            </p>
          ) : null}
        </div>

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            {product.reviewCount && product.reviewCount > 0 && (
              <span className="text-xs text-stone-500 ml-1">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
