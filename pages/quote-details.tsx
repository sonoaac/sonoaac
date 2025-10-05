import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface BusinessType {
  id: string;
  name: string;
  icon: string;
  recommendedServices: string[];
  recommendedComplexity: string;
  recommendedPages: number;
}

interface WebsiteFeatures {
  pages: number;
  complexity: string;
  coreFeatures: string[];
  additionalOptions: string[];
  designPreference: string;
  customDesignDescription?: string;
}

interface QuoteData {
  businessType: BusinessType;
  websiteFeatures: WebsiteFeatures;
}

export default function QuoteDetails() {
  const router = useRouter();
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: ''
  });

  useEffect(() => {
    const storedData = localStorage.getItem('quoteData');
    if (storedData) {
      setQuoteData(JSON.parse(storedData));
    } else {
      router.push('/quote');
    }
  }, [router]);

  const calculatePricing = () => {
    if (!quoteData) return { basePrice: 0, totalPrice: 0, breakdown: [] };

    const { websiteFeatures } = quoteData;
    let basePrice = 0;
    const breakdown = [];

    // Base pricing by complexity
    const complexityPricing = {
      basic: 300,
      advanced: 600,
      'full-stack': 1000
    };

    basePrice = complexityPricing[websiteFeatures.complexity as keyof typeof complexityPricing] || 300;
    breakdown.push({
      item: `${websiteFeatures.complexity.charAt(0).toUpperCase() + websiteFeatures.complexity.slice(1)} Website Build`,
      price: basePrice
    });

    // Page pricing
    const pagePrice = websiteFeatures.pages > 1 ? (websiteFeatures.pages - 1) * 50 : 0;
    if (pagePrice > 0) {
      breakdown.push({
        item: `Additional Pages (${websiteFeatures.pages - 1} pages)`,
        price: pagePrice
      });
    }

    // Core features pricing
    const coreFeaturePricing = {
      'location': 50,
      'gallery': 75,
      'blog': 100,
      'testimonials': 50,
      'newsletter': 75
    };

    websiteFeatures.coreFeatures.forEach(feature => {
      if (coreFeaturePricing[feature as keyof typeof coreFeaturePricing]) {
        const price = coreFeaturePricing[feature as keyof typeof coreFeaturePricing];
        breakdown.push({
          item: `${feature.charAt(0).toUpperCase() + feature.slice(1).replace('-', ' ')} Feature`,
          price: price
        });
      }
    });

    // Additional options pricing
    const additionalPricing = {
      'seo': 200,
      'branding': 300,
      'ecommerce': 500,
      'maintenance': 150,
      'hosting': 100,
      'domain': 50,
      'multilang': 200,
      'cms': 400
    };

    websiteFeatures.additionalOptions.forEach(option => {
      if (additionalPricing[option as keyof typeof additionalPricing]) {
        const price = additionalPricing[option as keyof typeof additionalPricing];
        breakdown.push({
          item: `${option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}`,
          price: price
        });
      }
    });

    const totalPrice = basePrice + pagePrice + 
      websiteFeatures.coreFeatures.reduce((sum, feature) => 
        sum + (coreFeaturePricing[feature as keyof typeof coreFeaturePricing] || 0), 0) +
      websiteFeatures.additionalOptions.reduce((sum, option) => 
        sum + (additionalPricing[option as keyof typeof additionalPricing] || 0), 0);

    return { basePrice, totalPrice, breakdown };
  };

  const { totalPrice, breakdown } = calculatePricing();

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    const fullQuoteData = {
      ...quoteData,
      contactInfo,
      pricing: { totalPrice, breakdown }
    };
    
    console.log('Quote submitted:', fullQuoteData);
    
    // For now, we'll just show an alert
    alert(`Quote submitted! Total: $${totalPrice}. We'll contact you at ${contactInfo.email} within 24 hours.`);
  };

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p>Loading quote details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Quote Details - sonoaacservices</title>
        <meta name="description" content="Review your personalized quote and project details." />
      </Head>
      
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>Your Personalized Quote</h1>
              <p style={{ color: 'var(--text-color)' }}>Review your project details and pricing breakdown</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Summary */}
              <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>Project Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Business Type</h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{quoteData.businessType.icon}</span>
                      <span>{quoteData.businessType.name}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Website Details</h3>
                    <div className="space-y-2" style={{ color: 'var(--text-color)' }}>
                      <p>• Pages: {quoteData.websiteFeatures.pages}</p>
                      <p>• Complexity: {quoteData.websiteFeatures.complexity.charAt(0).toUpperCase() + quoteData.websiteFeatures.complexity.slice(1)}</p>
                      <p>• Design: {quoteData.websiteFeatures.designPreference.charAt(0).toUpperCase() + quoteData.websiteFeatures.designPreference.slice(1)}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Core Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {quoteData.websiteFeatures.coreFeatures.map((feature) => (
                        <span key={feature} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                          {feature.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {quoteData.websiteFeatures.additionalOptions.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Additional Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {quoteData.websiteFeatures.additionalOptions.map((option) => (
                          <span key={option} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                            {option.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>Pricing Breakdown</h2>
                
                <div className="space-y-3">
                  {breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-color)' }}>{item.item}</span>
                      <span className="font-semibold" style={{ color: 'var(--text-color)' }}>${item.price}</span>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center py-4 mt-4" style={{ borderTop: '2px solid var(--border-color)' }}>
                    <span className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>Total</span>
                    <span className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>${totalPrice}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-color)' }}>✅ What's Included</h3>
                  <ul className="text-sm space-y-1" style={{ color: 'var(--text-color)' }}>
                    <li>• Custom design tailored to your brand</li>
                    <li>• Mobile & SEO optimization</li>
                    <li>• Fast-loading pages</li>
                    <li>• 1 month free maintenance</li>
                    <li>• Domain & hosting setup</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mt-12 rounded-lg p-6" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-color)' }}>Get Your Quote</h2>
              
              <form onSubmit={handleSubmitQuote} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 rounded-lg focus:outline-none"
                      style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 rounded-lg focus:outline-none"
                      style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 rounded-lg focus:outline-none"
                      style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input
                      type="text"
                      value={contactInfo.businessName}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full p-3 rounded-lg focus:outline-none"
                      style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <textarea
                    value={contactInfo.message}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full p-3 rounded-lg focus:outline-none"
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                    placeholder="Tell us more about your project, timeline, or any specific requirements..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-sm" style={{ color: 'var(--text-color)' }}>
                    <p>📞 Call us: <a href="tel:+18624052498" className="hover:opacity-80" style={{ color: 'var(--text-color)' }}>(862) 405-2498</a></p>
                    <p>✉️ Email: <a href="mailto:contact@sonoaacservices.com" className="hover:opacity-80" style={{ color: 'var(--text-color)' }}>contact@sonoaacservices.com</a></p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => router.push('/quote')}
                      className="px-6 py-3 rounded-lg transition-colors"
                      style={{ border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
                    >
                      Back to Quote
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 font-semibold rounded-lg transition-colors"
                      style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
                    >
                      Submit Quote Request
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Agreement Preview */}
            <div className="mt-8 rounded-lg p-6" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-color)' }}>Project Agreement Preview</h3>
              <div className="text-sm space-y-2" style={{ color: 'var(--text-color)' }}>
                <p>• <strong>Timeline:</strong> 2-4 weeks for completion</p>
                <p>• <strong>Payment:</strong> 50% upfront, 50% upon completion</p>
                <p>• <strong>Revisions:</strong> Up to 3 rounds of revisions included</p>
                <p>• <strong>Support:</strong> 1 month free maintenance included</p>
                <p>• <strong>Ownership:</strong> Full website ownership transferred upon final payment</p>
                <p>• <strong>Hosting:</strong> First year hosting included (renewal: $100/year)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}