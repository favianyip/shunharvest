'use client';

import { Package, FolderTree, DollarSign, TrendingUp } from 'lucide-react';
import { products, categories } from '@/data/mockData';
import Link from 'next/link';

export default function AdminDashboard() {
  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);
  const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;

  const stats = [
    {
      name: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products',
    },
    {
      name: 'Categories',
      value: totalCategories,
      icon: FolderTree,
      color: 'bg-green-500',
      href: '/admin/categories',
    },
    {
      name: 'Total Inventory',
      value: totalInventory,
      icon: TrendingUp,
      color: 'bg-purple-500',
      href: '/admin/products',
    },
    {
      name: 'Avg. Price',
      value: `$${averagePrice.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-amber-500',
      href: '/admin/products',
    },
  ];

  const lowStockProducts = products
    .filter(p => p.inventory < 20)
    .sort((a, b) => a.inventory - b.inventory)
    .slice(0, 5);

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-500">{stat.name}</p>
                <p className="text-2xl font-semibold text-stone-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-stone-200">
            <h2 className="font-semibold text-stone-900">Low Stock Alert</h2>
          </div>
          <div className="p-6">
            {lowStockProducts.length > 0 ? (
              <ul className="space-y-4">
                {lowStockProducts.map((product) => (
                  <li key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-stone-900">{product.name}</p>
                      <p className="text-sm text-stone-500">SKU: {product.sku}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.inventory < 10 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.inventory} left
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-stone-500 text-center py-4">All products are well stocked!</p>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-stone-200">
            <h2 className="font-semibold text-stone-900">Recent Products</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              {recentProducts.map((product) => (
                <li key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-stone-900">{product.name}</p>
                    <p className="text-sm text-stone-500">{product.farmName}</p>
                  </div>
                  <span className="text-stone-900 font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="font-semibold text-stone-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/categories/new"
            className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
          >
            Add Category
          </Link>
        </div>
      </div>
    </div>
  );
}
