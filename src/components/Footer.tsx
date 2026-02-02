import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';

const footerNavigation = {
  shopFruits: [
    { name: 'Melons', href: '/shop/japanese-melons' },
    { name: 'Strawberries', href: '/shop/japanese-strawberries' },
    { name: 'Persimmons', href: '/shop/japanese-persimmons' },
    { name: 'Pears', href: '/shop/japanese-pears' },
    { name: 'Oranges', href: '/shop/japanese-oranges' },
    { name: 'Artisanal Items', href: '/shop/artisanal-items' },
  ],
  fruitBlog: [
    { name: 'Melons', href: '/blog/melons' },
    { name: 'Strawberries', href: '/blog/strawberries' },
    { name: 'Persimmons', href: '/blog/persimmons' },
    { name: 'Pears', href: '/blog/pears' },
    { name: 'Artisanal Items', href: '/blog/artisanal' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-100">
      {/* CTA Section */}
      <div className="border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-stone-900">FAQ</h3>
              <p className="mt-2 text-sm text-stone-600">Frequently asked questions.</p>
              <Link
                href="/faq"
                className="mt-4 inline-block px-6 py-2 border border-stone-900 text-sm font-medium text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
              >
                FAQ
              </Link>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-medium text-stone-900">Contact Us</h3>
              <p className="mt-2 text-sm text-stone-600">We&apos;re happy to assist you.</p>
              <Link
                href="/contact"
                className="mt-4 inline-block px-6 py-2 border border-stone-900 text-sm font-medium text-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src="/images/brand/shun-harvest-logo.jpg"
                alt="Shun Harvest 旬"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Shop Fruits */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
              Shop Fruits
            </h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.shopFruits.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-stone-600 hover:text-stone-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
              Our Story
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/our-story" className="text-sm text-stone-600 hover:text-stone-900">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Fruit Blog */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
              Fruit Blog
            </h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.fruitBlog.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-stone-600 hover:text-stone-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
              Support
            </h4>
            <ul className="mt-4 space-y-2">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-stone-600 hover:text-stone-900">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
                Newsletter
              </h4>
              <form className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 px-3 py-2 border border-stone-300 text-sm focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white text-sm hover:bg-stone-800 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-4 flex gap-4">
                <a
                  href="https://www.instagram.com/shunharvest?igsh=anA3M3EzbncxM2hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-900"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-600">© 2026 Shun Harvest (旬). All rights reserved.</p>
          <div className="flex gap-4">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-stone-600 hover:text-stone-900"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
