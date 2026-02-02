'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag } from 'lucide-react';
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
          <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-3 w-3 fill-amber-500/50 text-amber-500" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-3 w-3 text-stone-200" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-full">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-700 ${
                  isOutOfStock ? 'opacity-50 grayscale' : 'group-hover:scale-105'
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100">
                <span className="text-amber-700/30 text-6xl font-serif">旬</span>
              </div>
            )}
          </div>
        </Link>
        
        {/* SOLD OUT Badge - Elegant overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
            <div className="bg-white/90 text-stone-900 text-xs font-medium px-6 py-2.5 tracking-widest uppercase">
              Sold Out
            </div>
          </div>
        )}

        {/* NEW Badge - Premium style */}
        {product.isNew && !isOutOfStock && (
          <div className="absolute top-4 left-4">
            <span className="bg-amber-700 text-white text-[10px] font-medium px-3 py-1.5 tracking-wider uppercase">
              New Arrival
            </span>
          </div>
        )}

        {/* Quick Add Button - Elegant */}
        {!isOutOfStock && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-700 hover:text-white transform translate-y-2 group-hover:translate-y-0"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-stone-900 hover:text-amber-700 transition-colors leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
          <span>{product.farmName}</span>
          {product.location && (
            <>
              <span className="w-1 h-1 rounded-full bg-stone-300"></span>
              <span>{product.location}</span>
            </>
          )}
        </div>

        {/* Price */}
        <div className="mt-3">
          {product.salePrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-stone-900">
                ${product.salePrice.toFixed(0)}
              </span>
              <span className="text-sm text-stone-400 line-through">
                ${product.price.toFixed(0)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-stone-900">
              From ${product.price.toFixed(0)}
            </span>
          )}
        </div>

        {/* Order deadline */}
        {!isOutOfStock && product.orderDeadline && (
          <p className="mt-2 text-xs text-amber-700 font-medium">
            Order by {product.orderDeadline}
          </p>
        )}

        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            {product.reviewCount && product.reviewCount > 0 && (
              <span className="text-xs text-stone-400">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
