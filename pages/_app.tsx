import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect } from 'react';
import Header from '../src-nextjs/components/Header';
import Footer from '../src-nextjs/components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || 'dark';
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch {}
  }, []);

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
