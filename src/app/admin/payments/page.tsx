'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CreditCard, QrCode, Save, Upload, Check, X, Loader2 } from 'lucide-react';
import { PaymentSettings } from '@/types';

const defaultSettings: PaymentSettings = {
  stripeEnabled: true,
  stripePublishableKey: '',
  stripeSecretKey: '',
  paynowEnabled: true,
  paynowUEN: '',
  paynowName: '',
  paynowQRImage: '',
  paynowEmail: 'orders@shunharvest.com',
};

export default function PaymentsPage() {
  const [settings, setSettings] = useState<PaymentSettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load settings from localStorage (in production, load from Firebase)
    const saved = localStorage.getItem('shun-payment-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        if (parsed.paynowQRImage) {
          setQrPreview(parsed.paynowQRImage);
        }
      } catch (e) {
        console.error('Failed to load payment settings:', e);
      }
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage (in production, save to Firebase)
      localStorage.setItem('shun-payment-settings', JSON.stringify(settings));
      
      // Also update .env.local values would require server-side action
      // For now, just save to localStorage
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setQrPreview(base64);
        setSettings(prev => ({ ...prev, paynowQRImage: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Settings</h1>
            <p className="text-gray-600 mt-1">Configure your payment gateways</p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-5 h-5" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saveSuccess ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        <div className="space-y-8">
          {/* Stripe Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Stripe</h2>
                <p className="text-sm text-gray-500">Accept credit/debit card payments</p>
              </div>
              <div className="ml-auto">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.stripeEnabled}
                    onChange={(e) => setSettings(prev => ({ ...prev, stripeEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>
            </div>

            {settings.stripeEnabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publishable Key
                  </label>
                  <input
                    type="text"
                    value={settings.stripePublishableKey || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
                    placeholder="pk_live_..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Find this in your Stripe Dashboard → Developers → API keys</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    value={settings.stripeSecretKey || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                    placeholder="sk_live_..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Keep this secret! Never expose in client-side code.</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Webhook Setup</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Add this webhook URL in your Stripe Dashboard:
                  </p>
                  <code className="block bg-blue-100 px-3 py-2 rounded text-sm text-blue-900">
                    https://your-domain.com/api/webhook/stripe
                  </code>
                </div>
              </div>
            )}
          </div>

          {/* PayNow Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <QrCode className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">PayNow</h2>
                <p className="text-sm text-gray-500">Accept payments via Singapore PayNow</p>
              </div>
              <div className="ml-auto">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.paynowEnabled}
                    onChange={(e) => setSettings(prev => ({ ...prev, paynowEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>
            </div>

            {settings.paynowEnabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business UEN
                    </label>
                    <input
                      type="text"
                      value={settings.paynowUEN || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, paynowUEN: e.target.value }))}
                      placeholder="123456789A"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={settings.paynowName || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, paynowName: e.target.value }))}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Confirmation Email
                  </label>
                  <input
                    type="email"
                    value={settings.paynowEmail || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, paynowEmail: e.target.value }))}
                    placeholder="orders@yourdomain.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Customers will send payment confirmation to this email</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PayNow QR Code
                  </label>
                  <div className="flex items-start gap-6">
                    <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                      {qrPreview ? (
                        <Image
                          src={qrPreview}
                          alt="PayNow QR"
                          width={180}
                          height={180}
                          className="object-contain"
                        />
                      ) : (
                        <div className="text-center text-gray-400">
                          <QrCode className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">No QR uploaded</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleQRUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Upload QR Code
                      </button>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload your PayNow QR code image. Recommended: PNG or JPG, 300x300px minimum.
                      </p>
                      {qrPreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setQrPreview(null);
                            setSettings(prev => ({ ...prev, paynowQRImage: '' }));
                          }}
                          className="flex items-center gap-1 text-red-600 text-sm mt-2 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                          Remove QR
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">How PayNow Works</h4>
                  <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                    <li>Customer scans your QR code during checkout</li>
                    <li>Customer makes payment through their banking app</li>
                    <li>Customer emails payment screenshot to your confirmation email</li>
                    <li>You manually verify and process the order</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Environment Variables</h3>
            <p className="text-sm text-gray-600 mb-4">
              For production, add these to your <code className="bg-gray-200 px-1 rounded">.env.local</code> file:
            </p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site URL (for Stripe redirects)
NEXT_PUBLIC_SITE_URL=https://your-domain.com`}
            </pre>
          </div>
        </div>
      </div>
  );
}
