'use client';

import Link from 'next/link';
import { Globe, Check, ArrowLeft } from 'lucide-react';

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/wholesaler" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Wholesaler
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <Globe className="h-8 w-8 text-amber-500" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white">Export Overseas</h1>
          </div>
          <p className="text-xl text-stone-300 max-w-2xl font-light">
            International shipping and export services for premium Japanese fruits worldwide.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-stone-100">
            <h2 className="font-serif text-2xl text-stone-900 mb-6">Export Services</h2>
            <ul className="space-y-4 mb-8">
              {[
                'Global shipping network covering Asia, Europe, Americas, and Middle East',
                'Full export documentation and customs clearance',
                'Temperature-controlled air freight logistics',
                'Phytosanitary certificates and compliance',
                'Real-time shipment tracking',
                'Door-to-door delivery available',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-stone-600">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-600 transition-all"
            >
              Inquire About Export
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
