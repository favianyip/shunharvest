import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin } from 'lucide-react';

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
    <footer className="bg-stone-50 overflow-hidden">
      {/* CTA Section - More elegant */}
      <div className="border-b border-stone-200 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Questions?</h3>
              <p className="text-stone-500 mb-6 font-light">Find answers to common questions about our products and shipping.</p>
              <Link
                href="/faq"
                className="inline-block px-8 py-3 border border-stone-900 text-sm font-medium text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 tracking-wide"
              >
                View FAQ
              </Link>
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Get in Touch</h3>
              <p className="text-stone-500 mb-6 font-light">Our team is here to help with any inquiries you may have.</p>
              <Link
                href="/contact"
                className="inline-block px-8 py-3 bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-all duration-300 tracking-wide"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo & Info */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link href="/">
              <Image
                src="/images/brand/shun-harvest-logo.jpg"
                alt="Shun Harvest 旬"
                width={160}
                height={45}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-stone-500 font-light leading-relaxed">
              Premium Japanese fruits, delivered fresh from farm to your door.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/shunharvest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-amber-700 hover:text-white transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@shunharvest.com"
                className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-amber-700 hover:text-white transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Fruits */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-5">
              Shop Fruits
            </h4>
            <ul className="space-y-3">
              {footerNavigation.shopFruits.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-stone-500 hover:text-amber-700 transition-colors font-light">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-5">
              Our Story
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/our-story" className="text-sm text-stone-500 hover:text-amber-700 transition-colors font-light">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Fruit Blog */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-5">
              Fruit Blog
            </h4>
            <ul className="space-y-3">
              {footerNavigation.fruitBlog.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-stone-500 hover:text-amber-700 transition-colors font-light">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-stone-500 hover:text-amber-700 transition-colors font-light">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-4">
                Newsletter
              </h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-4 py-2.5 bg-white border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent rounded transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 rounded"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-400 font-light">
            © {new Date().getFullYear()} Shun Harvest (旬). All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors font-light"
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
