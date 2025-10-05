import React, { useState } from "react";
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

export default function Quote() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | null>(null);
  const [websiteFeatures, setWebsiteFeatures] = useState<WebsiteFeatures>({
    pages: 1,
    complexity: "basic",
    coreFeatures: [],
    additionalOptions: [],
    designPreference: "modern"
  });

  const businessTypes: BusinessType[] = [
    {
      id: "hair-salon",
      name: "Hair Salon / Barber Shop",
      icon: "💇‍♀️",
      recommendedServices: ["appointment-booking", "gallery", "services", "testimonials"],
      recommendedComplexity: "advanced",
      recommendedPages: 4
    },
    {
      id: "beauty-spa",
      name: "Beauty & Spa / Braiding Studio",
      icon: "💅",
      recommendedServices: ["appointment-booking", "gallery", "services", "testimonials"],
      recommendedComplexity: "advanced",
      recommendedPages: 4
    },
    {
      id: "restaurant",
      name: "Restaurant / Café / Food Delivery",
      icon: "🍽️",
      recommendedServices: ["menu", "online-ordering", "location", "gallery"],
      recommendedComplexity: "full-stack",
      recommendedPages: 5
    },
    {
      id: "clothing-brand",
      name: "Clothing Brand / Boutique",
      icon: "👗",
      recommendedServices: ["ecommerce", "product-showcase", "gallery", "size-guide"],
      recommendedComplexity: "full-stack",
      recommendedPages: 6
    },
    {
      id: "mini-market",
      name: "Mini Market / Grocery / Local Store",
      icon: "🏪",
      recommendedServices: ["ecommerce", "inventory", "location", "hours"],
      recommendedComplexity: "full-stack",
      recommendedPages: 5
    },
    {
      id: "real-estate",
      name: "Real Estate / Property Agency",
      icon: "🏠",
      recommendedServices: ["property-listings", "contact-forms", "location", "testimonials"],
      recommendedComplexity: "advanced",
      recommendedPages: 6
    },
    {
      id: "tech-shop",
      name: "Tech Shop / Electronics / Repair Service",
      icon: "🔧",
      recommendedServices: ["services", "appointment-booking", "testimonials", "location"],
      recommendedComplexity: "advanced",
      recommendedPages: 4
    },
    {
      id: "personal-portfolio",
      name: "Personal Portfolio / Freelancer / Creator",
      icon: "👤",
      recommendedServices: ["portfolio", "contact-forms", "testimonials", "blog"],
      recommendedComplexity: "advanced",
      recommendedPages: 3
    },
    {
      id: "service-business",
      name: "Service Business (Plumber, Electrician, Cleaner, etc.)",
      icon: "🛠️",
      recommendedServices: ["services", "appointment-booking", "testimonials", "location"],
      recommendedComplexity: "advanced",
      recommendedPages: 4
    },
    {
      id: "event-planner",
      name: "Event Planner / Photographer / Videographer",
      icon: "📸",
      recommendedServices: ["portfolio", "gallery", "contact-forms", "testimonials"],
      recommendedComplexity: "advanced",
      recommendedPages: 5
    },
    {
      id: "fitness",
      name: "Fitness / Gym / Health Coach",
      icon: "💪",
      recommendedServices: ["class-schedule", "appointment-booking", "testimonials", "gallery"],
      recommendedComplexity: "advanced",
      recommendedPages: 4
    },
    {
      id: "nonprofit",
      name: "Nonprofit / Community Organization",
      icon: "🤝",
      recommendedServices: ["donation-forms", "events", "testimonials", "blog"],
      recommendedComplexity: "advanced",
      recommendedPages: 5
    },
    {
      id: "blog-media",
      name: "Blog / News / Media Platform",
      icon: "📰",
      recommendedServices: ["blog", "newsletter", "social-media", "contact-forms"],
      recommendedComplexity: "full-stack",
      recommendedPages: 4
    },
    {
      id: "education",
      name: "Online Course / Education / Coaching",
      icon: "🎓",
      recommendedServices: ["course-catalog", "student-portal", "payment", "testimonials"],
      recommendedComplexity: "full-stack",
      recommendedPages: 6
    },
    {
      id: "custom",
      name: "Custom Business (I'll choose manually)",
      icon: "⚙️",
      recommendedServices: [],
      recommendedComplexity: "basic",
      recommendedPages: 3
    }
  ];

  const coreFeatures = [
    { id: "responsive", name: "Responsive design (mobile/tablet/desktop)", default: true },
    { id: "navigation", name: "Navigation menu (header + footer)", default: true },
    { id: "contact-forms", name: "Contact / Booking form", default: true },
    { id: "about-services", name: "About & Services section", default: true },
    { id: "location", name: "Location / Map integration", default: false },
    { id: "gallery", name: "Gallery or Product showcase", default: false },
    { id: "blog", name: "Blog / News section", default: false },
    { id: "testimonials", name: "Client testimonials", default: false },
    { id: "social-media", name: "Social media links", default: true },
    { id: "newsletter", name: "Newsletter signup", default: false }
  ];

  const additionalOptions = [
    { id: "seo", name: "SEO optimization" },
    { id: "branding", name: "Branding & UI Design" },
    { id: "ecommerce", name: "E-commerce setup (cart, checkout, product pages)" },
    { id: "maintenance", name: "Maintenance & Support" },
    { id: "hosting", name: "Hosting & Deployment setup" },
    { id: "domain", name: "Custom domain connection" },
    { id: "multilang", name: "Multi-language support" },
    { id: "cms", name: "CMS (Content Management System)" }
  ];

  const designPreferences = [
    { id: "modern", name: "Modern & Minimalist" },
    { id: "creative", name: "Creative & Bold" },
    { id: "corporate", name: "Corporate / Professional" },
    { id: "custom", name: "Custom (Describe style)" }
  ];

  const handleBusinessTypeSelect = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    
    // Auto-select recommended features
    const recommendedFeatures = businessType.recommendedServices;
    const autoSelectedCoreFeatures = coreFeatures
      .filter(feature => recommendedFeatures.includes(feature.id) || feature.default)
      .map(feature => feature.id);
    
    setWebsiteFeatures(prev => ({
      ...prev,
      pages: businessType.recommendedPages,
      complexity: businessType.recommendedComplexity,
      coreFeatures: autoSelectedCoreFeatures
    }));
    
    setCurrentStep(2);
  };

  const toggleCoreFeature = (featureId: string) => {
    setWebsiteFeatures(prev => ({
      ...prev,
      coreFeatures: prev.coreFeatures.includes(featureId)
        ? prev.coreFeatures.filter(id => id !== featureId)
        : [...prev.coreFeatures, featureId]
    }));
  };

  const toggleAdditionalOption = (optionId: string) => {
    setWebsiteFeatures(prev => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter(id => id !== optionId)
        : [...prev.additionalOptions, optionId]
    }));
  };

  const handleContinueToQuote = () => {
    // Store the quote data and navigate to quote details
    const quoteData = {
      businessType: selectedBusinessType,
      websiteFeatures: websiteFeatures
    };
    
    // You can store this in localStorage or pass as query params
    localStorage.setItem('quoteData', JSON.stringify(quoteData));
    router.push('/quote-details');
  };

  const getRecommendationText = () => {
    if (!selectedBusinessType) return "";
    
    const complexityText = {
      basic: "HTML, CSS, JavaScript",
      advanced: "React + TypeScript",
      "full-stack": "Next.js + API"
    };
    
    return `Based on your ${selectedBusinessType.name.toLowerCase()} business, we recommend a ${complexityText[websiteFeatures.complexity as keyof typeof complexityText]} build with ${websiteFeatures.pages} pages and ${websiteFeatures.additionalOptions.length > 0 ? 'additional features' : 'core features'} for optimal performance.`;
  };

  return (
    <>
      <Head>
        <title>Get a Quote - sonoaacservices</title>
        <meta name="description" content="Get a personalized quote for your website project. Professional web design for small businesses." />
      </Head>
      
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <div className="container mx-auto px-6 py-12">
          {/* Progress/Step Tabs */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 border rounded-lg p-1" style={{ borderColor: 'var(--border-color)' }}>
              <button
                onClick={() => setCurrentStep(1)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${currentStep === 1 ? 'bg-[var(--accent-color)] text-white' : ''}`}
                style={currentStep === 1 ? {} : { color: 'var(--text-color)' }}
              >
                Step 1: Business Type
              </button>
              <button
                onClick={() => selectedBusinessType && setCurrentStep(2)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${currentStep === 2 ? 'bg-[var(--accent-color)] text-white' : ''}`}
                style={currentStep === 2 ? {} : { color: 'var(--text-color)' }}
                disabled={!selectedBusinessType}
              >
                Step 2: Features
              </button>
            </div>
          </div>

          {currentStep === 1 && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">What type of business do you run?</h1>
              <p className="mb-8" style={{ color: '#666' }}>Select your business type to get personalized recommendations</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {businessTypes.map((business) => (
                  <button
                    key={business.id}
                    onClick={() => handleBusinessTypeSelect(business)}
                    className="p-3 border rounded-md transition-all text-left"
                    style={{ 
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--bg-color)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-color)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 105, 180, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.backgroundColor = 'var(--bg-color)';
                    }}
                  >
                    {/* Icon removed for cleaner professional look */}
                    <h3 
                      className="font-semibold text-base transition-colors"
                      style={{ color: 'var(--text-color)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--accent-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-color)';
                      }}
                    >
                      {business.name}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && selectedBusinessType && (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-pink-500 hover:opacity-80"
                >
                  ← Back
                </button>
                <h1 className="text-2xl font-bold">Website Features & Build Details</h1>
                <div></div>
              </div>

              {/* Number of Pages */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">1. Number of Pages</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setWebsiteFeatures(prev => ({ ...prev, pages: num }))}
                      className={`p-3 border rounded-md transition-all ${
                        websiteFeatures.pages === num
                          ? 'border-pink-500 bg-pink-500/10'
                          : ''
                      }`}
                      style={{ borderColor: websiteFeatures.pages === num ? 'var(--accent-color)' : 'var(--border-color)' }}
                    >
                      {num === 1 ? 'Single Page' : `${num} Pages`}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      const customPages = prompt('Enter number of pages (max 20):');
                      if (customPages && !isNaN(Number(customPages)) && Number(customPages) <= 20) {
                        setWebsiteFeatures(prev => ({ ...prev, pages: Number(customPages) }));
                      }
                    }}
                    className={`p-3 border rounded-md transition-all ${
                      websiteFeatures.pages > 5
                        ? 'border-pink-500 bg-pink-500/10'
                        : ''
                    }`}
                    style={{ borderColor: websiteFeatures.pages > 5 ? 'var(--accent-color)' : 'var(--border-color)' }}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Website Complexity */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">2. Website Complexity / Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'basic', name: 'Basic (HTML, CSS, JavaScript)', desc: 'Clean, simple, static website' },
                    { id: 'advanced', name: 'Advanced (React + TypeScript)', desc: 'Dynamic components, better performance' },
                    { id: 'full-stack', name: 'Full Stack (Next.js + API)', desc: 'Scalable, connected to backend' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setWebsiteFeatures(prev => ({ ...prev, complexity: type.id }))}
                      className={`p-4 border rounded-md transition-all text-left ${
                        websiteFeatures.complexity === type.id
                          ? 'border-pink-500 bg-pink-500/10'
                          : ''
                      }`}
                      style={{ borderColor: websiteFeatures.complexity === type.id ? 'var(--accent-color)' : 'var(--border-color)' }}
                    >
                      <h3 className="font-semibold mb-1 text-base">{type.name}</h3>
                      <p className="text-sm" style={{ color: '#666' }}>{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Features */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">3. Core Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {coreFeatures.map((feature) => (
                    <label key={feature.id} className="flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <input
                        type="checkbox"
                        checked={websiteFeatures.coreFeatures.includes(feature.id)}
                        onChange={() => toggleCoreFeature(feature.id)}
                      />
                      <span>{feature.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">4. Additional Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {additionalOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-colors"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <input
                        type="checkbox"
                        checked={websiteFeatures.additionalOptions.includes(option.id)}
                        onChange={() => toggleAdditionalOption(option.id)}
                      />
                      <span>{option.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Design Preference */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">5. Design Preference</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {designPreferences.map((pref) => (
          <button
                      key={pref.id}
                      onClick={() => setWebsiteFeatures(prev => ({ ...prev, designPreference: pref.id }))}
                      className={`p-3 border rounded-md transition-all ${
                        websiteFeatures.designPreference === pref.id
                          ? 'border-pink-500 bg-pink-500/10'
                          : ''
                      }`}
                      style={{ borderColor: websiteFeatures.designPreference === pref.id ? 'var(--accent-color)' : 'var(--border-color)' }}
                    >
                      {pref.name}
          </button>
        ))}
      </div>

                {websiteFeatures.designPreference === 'custom' && (
                  <div className="mt-3">
                    <textarea
                      placeholder="Describe your preferred design style..."
                      value={websiteFeatures.customDesignDescription || ''}
                      onChange={(e) => setWebsiteFeatures(prev => ({ ...prev, customDesignDescription: e.target.value }))}
                      className="w-full p-3 border rounded-md"
                      style={{ backgroundColor: 'var(--light-bg)', borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* Recommendation Summary */}
              <div className="mb-6 p-4 rounded-md" style={{ backgroundColor: 'rgba(255, 105, 180, 0.08)', border: '1px solid rgba(255, 105, 180, 0.3)' }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent-color)' }}>Recommendation</h3>
                <p style={{ color: '#333' }}>{getRecommendationText()}</p>
                <button
                  onClick={() => {
                    const recommendedFeatures = selectedBusinessType.recommendedServices;
                    const autoSelectedCoreFeatures = coreFeatures
                      .filter(feature => recommendedFeatures.includes(feature.id) || feature.default)
                      .map(feature => feature.id);
                    
                    setWebsiteFeatures(prev => ({
                      ...prev,
                      pages: selectedBusinessType.recommendedPages,
                      complexity: selectedBusinessType.recommendedComplexity,
                      coreFeatures: autoSelectedCoreFeatures
                    }));
                  }}
                  className="mt-3 px-4 py-2 rounded-md text-sm"
                  style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
                >
                  Accept Recommendation
                </button>
              </div>

              {/* Continue Button */}
              <div className="text-left">
                <button
                  onClick={handleContinueToQuote}
                  className="px-6 py-3 rounded-md font-semibold"
                  style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
                >
                  Continue to Quote →
                </button>
              </div>
            </div>
          )}
        </div>
    </div>
    </>
  );
}
