'use client';

import Link from 'next/link';
import { Package, Globe, Truck, Handshake, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'Bulk Orders',
    description: 'Large quantity orders for restaurants, hotels, and retail businesses. Competitive pricing with volume discounts.',
    href: '/wholesaler/bulk-orders',
    features: ['Minimum order: 50kg', 'Weekly delivery schedules', 'Custom packaging available'],
  },
  {
    icon: Globe,
    title: 'Export Overseas',
    description: 'International shipping and export services. We handle customs, documentation, and cold chain logistics.',
    href: '/wholesaler/export',
    features: ['Global shipping network', 'Export documentation', 'Temperature-controlled transport'],
  },
  {
    icon: Truck,
    title: 'Strawberry Export',
    description: 'Specialized export program for premium Japanese strawberries. Air-freight direct from farms.',
    href: '/wholesaler/strawberries',
    features: ['Premium varieties', 'Same-week harvest shipping', 'Gift-grade quality'],
  },
  {
    icon: Handshake,
    title: 'Partnership Inquiry',
    description: 'Become an authorized distributor or establish a long-term supply agreement with Shun Harvest.',
    href: '/wholesaler/partnership',
    features: ['Exclusive territories', 'Marketing support', 'Priority allocation'],
  },
];

export default function WholesalerPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-500 text-sm uppercase tracking-[0.2em] mb-4 font-medium">For Business</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Wholesale & Export
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Partner with Shun Harvest for premium Japanese fruits. Bulk orders, international export, 
            and custom solutions for your business needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0 border border-amber-200 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-7 w-7 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 font-light mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm text-stone-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-2 text-amber-700 font-medium text-sm group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-28 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">
            Ready to Partner?
          </h2>
          <p className="text-lg text-stone-600 font-light mb-10">
            Contact our wholesale team for pricing, availability, and custom solutions tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-700/25"
            >
              Contact Sales Team
            </Link>
            <a
              href="mailto:wholesale@shunharvest.com"
              className="px-8 py-4 bg-stone-100 text-stone-900 font-medium rounded-lg hover:bg-stone-200 transition-all duration-300"
            >
              wholesale@shunharvest.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
