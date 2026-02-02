'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navigation = [
  {
    name: 'Shop Fruits',
    href: '/shop',
    children: [
      { name: 'All Japanese Fruits', href: '/shop' },
      { name: 'Melons', href: '/shop/japanese-melons' },
      { name: 'Strawberries', href: '/shop/japanese-strawberries' },
      { name: 'Persimmons', href: '/shop/japanese-persimmons' },
      { name: 'Pears', href: '/shop/japanese-pears' },
      { name: 'Oranges', href: '/shop/japanese-oranges' },
      { name: 'Artisanal Items', href: '/shop/artisanal-items' },
    ],
  },
  { name: 'Our Story', href: '/our-story' },
  {
    name: 'Fruit Blog',
    href: '/blog',
    children: [
      { name: 'All Posts', href: '/blog' },
      { name: 'Melons', href: '/blog/melons' },
      { name: 'Strawberries', href: '/blog/strawberries' },
    ],
  },
  {
    name: 'Support',
    href: '#',
    children: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-stone-200 overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8 overflow-hidden">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <Image
              src="/images/brand/shun-harvest-logo.jpg"
              alt="Shun Harvest 旬"
              width={200}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900 py-2"
              >
                {item.name}
                {item.children && <ChevronDown className="h-4 w-4" />}
              </Link>
              {item.children && activeDropdown === item.name && (
                <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side icons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Link href="/account" className="p-2 text-stone-700 hover:text-stone-900">
            <User className="h-5 w-5" />
          </Link>
          <button
            onClick={toggleCart}
            className="relative p-2 text-stone-700 hover:text-stone-900"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-700 text-white text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/images/brand/shun-harvest-logo.jpg"
                  alt="Shun Harvest 旬"
                  width={150}
                  height={40}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-stone-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-stone-200">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-base font-medium text-stone-900 hover:bg-stone-50"
                        onClick={() => !item.children && setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.children && (
                        <div className="ml-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-stone-600 hover:bg-stone-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  <Link
                    href="/account"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-stone-900 hover:bg-stone-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      toggleCart();
                    }}
                    className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-stone-900 hover:bg-stone-50"
                  >
                    Cart ({totalItems})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
