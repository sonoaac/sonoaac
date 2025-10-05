import React from "react";
import Head from "next/head";

export default function Agreement() {
  return (
    <>
      <Head>
        <title>Project Agreement - sonoaacservices</title>
        <meta name="description" content="Review and sign your project agreement." />
      </Head>
      
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Project Agreement</h1>
              <p style={{ color: '#666' }}>Review and confirm your project details</p>
            </div>
            
            <div className="rounded-lg p-8" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)' }}>
              <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--accent-color)' }}>Terms & Conditions</h2>
              
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Project Scope</h3>
                  <p style={{ color: '#666' }}>
                    This agreement covers the development of a professional website as specified in your quote. 
                    All features and specifications outlined in the project proposal are included.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Timeline</h3>
                  <p style={{ color: '#666' }}>
                    Project delivery timeline is 2-4 weeks from project start date. 
                    Any delays will be communicated promptly with revised timelines.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Payment Terms</h3>
                  <p style={{ color: '#666' }}>
                    Payment is split into two installments: 50% upfront to begin work, 
                    50% upon project completion and final approval.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Revisions</h3>
                  <p style={{ color: '#666' }}>
                    Up to 3 rounds of revisions are included in the project cost. 
                    Additional revisions may incur additional charges.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Support</h3>
                  <p style={{ color: '#666' }}>
                    One month of free maintenance and support is included with your project. 
                    Ongoing support packages are available separately.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="text-sm" style={{ color: '#666' }}>
                    <p>By signing this agreement, you agree to the terms and conditions outlined above.</p>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      className="px-6 py-3 border rounded-lg transition-colors"
                      style={{ 
                        borderColor: 'var(--border-color)', 
                        color: 'var(--text-color)',
                        backgroundColor: 'var(--bg-color)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                        e.currentTarget.style.color = 'var(--accent-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-color)';
                      }}
                    >
                      Back to Quote
                    </button>
                    <button 
                      className="btn"
                      onClick={() => {
                        alert('Agreement signed! We\'ll contact you within 24 hours to begin your project.');
                      }}
                    >
                      Sign & Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
