'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Ordering',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Simply browse our collection, add your desired items to the cart, and proceed to checkout. You can create an account for faster checkout in the future, or check out as a guest.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secured with SSL encryption.',
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Due to the perishable nature of our products, orders can only be modified or cancelled within 24 hours of placement. Please contact us immediately if you need to make changes.',
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        question: 'Where do you ship to?',
        answer: 'We currently ship to all 50 US states. International shipping is available to select countries. Please check our shipping page for the full list of destinations.',
      },
      {
        question: 'How long does shipping take?',
        answer: 'Domestic orders typically arrive within 2-3 business days via express shipping. We use temperature-controlled packaging to ensure freshness. Delivery times may vary during peak seasons.',
      },
      {
        question: 'How are the fruits packaged?',
        answer: 'Each fruit is carefully wrapped and cushioned to prevent damage. We use insulated boxes with ice packs to maintain optimal temperature during transit.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        question: 'Why are Japanese fruits so expensive?',
        answer: 'Japanese fruits are cultivated using meticulous techniques that prioritize quality over quantity. Farmers often spend years perfecting their craft, and each fruit receives individual attention. The result is an eating experience unlike any other.',
      },
      {
        question: 'How should I store my fruits?',
        answer: 'Storage varies by fruit type. Melons should be kept at room temperature until ripe, then refrigerated. Strawberries should be refrigerated immediately. Each order includes specific storage instructions.',
      },
      {
        question: 'Are your fruits organic?',
        answer: 'Many of our partner farms use organic or low-pesticide growing methods. Specific certifications vary by farm. Please check individual product pages for details.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'Due to the perishable nature of our products, we cannot accept returns. However, if your order arrives damaged or spoiled, please contact us within 24 hours with photos for a full refund.',
      },
      {
        question: 'My order arrived damaged. What should I do?',
        answer: 'We\'re sorry to hear that. Please take photos of the damaged items and packaging, then contact us within 24 hours. We\'ll process a replacement or refund immediately.',
      },
      {
        question: 'How long do refunds take to process?',
        answer: 'Refunds are processed within 3-5 business days and will be credited to your original payment method. It may take an additional 5-10 business days to appear on your statement.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="font-serif text-2xl text-stone-900 mb-6">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.questions.map((faq, faqIndex) => {
                const id = `${categoryIndex}-${faqIndex}`;
                const isOpen = openItems.includes(id);
                return (
                  <div
                    key={faqIndex}
                    className="border border-stone-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(id)}
                      className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-medium text-stone-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-stone-500 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <p className="text-stone-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="mt-16 text-center p-8 bg-amber-50 rounded-lg">
          <h3 className="font-serif text-xl text-stone-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-stone-600 mb-4">
            Can&apos;t find the answer you&apos;re looking for? Our team is happy to help.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-amber-700 text-white font-medium rounded-lg hover:bg-amber-800 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
