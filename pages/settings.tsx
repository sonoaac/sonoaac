import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
      document.body.setAttribute('data-theme', stored);
    }
  }, []);

  const applyTheme = (next: 'light' | 'dark') => {
    setTheme(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next);
      document.body.setAttribute('data-theme', next);
    }
  };

  return (
    <>
      <Head>
        <title>Settings - Theme</title>
      </Head>
      <div className="min-h-screen section">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <div className="p-6 border rounded-lg" style={{ borderColor: 'var(--border-color)' }}>
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="theme-light"
                  name="theme"
                  checked={theme === 'light'}
                  onChange={() => applyTheme('light')}
                />
                <label htmlFor="theme-light">Light</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="theme-dark"
                  name="theme"
                  checked={theme === 'dark'}
                  onChange={() => applyTheme('dark')}
                />
                <label htmlFor="theme-dark">Dark</label>
              </div>
              <span className="opacity-80">Current: {theme}</span>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)' }}>
                <div className="h-3 w-full mb-3" style={{ background: 'rgba(255, 192, 203, 0.9)' }}></div>
                <div className="h-2 w-2/3 mb-2" style={{ background: 'var(--border-color)' }}></div>
                <div className="h-2 w-1/2" style={{ background: 'var(--border-color)' }}></div>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)' }}>
                <div className="h-3 w-full mb-3" style={{ background: 'var(--border-color)' }}></div>
                <div className="h-2 w-2/3 mb-2" style={{ background: 'var(--border-color)' }}></div>
                <div className="h-2 w-1/2" style={{ background: 'var(--border-color)' }}></div>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--light-bg)', border: '1px solid var(--border-color)' }}>
                <div className="h-3 w-full mb-3" style={{ background: 'var(--border-color)' }}></div>
                <div className="h-2 w-2/3 mb-2" style={{ background: 'var(--border-color)' }}></div>
                <div className="h-2 w-1/2" style={{ background: 'var(--border-color)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


