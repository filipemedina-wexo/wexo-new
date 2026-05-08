'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('Header');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="relative w-32 h-10 hoverable">
          <Image src="/logo.png" alt="Wexo" fill className="object-contain" priority sizes="(max-width: 768px) 100vw, 128px" />
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest text-muted hover:text-cream transition-colors duration-300">
          <Link href="/sobre" className="hover:text-accent transition-colors hoverable">{t('about')}</Link>
          <Link href="/servicos" className="hover:text-accent transition-colors hoverable">{t('services')}</Link>
          <Link href="/cases" className="hover:text-accent transition-colors hoverable">{t('cases')}</Link>
          <Link href="/contato" className="border border-white/10 hover:border-accent px-5 py-2 rounded-full hover:text-accent transition-all hoverable">{t('contact')}</Link>
          <LanguageSwitcher />
        </nav>

        <button
          className="md:hidden text-cream hoverable"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? t('close') : t('menu')}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-surface z-40 flex flex-col justify-center items-center h-screen space-y-8 text-2xl font-display">
           <Link href="/" onClick={() => setMobileMenuOpen(false)}>{t('home')}</Link>
           <Link href="/sobre" onClick={() => setMobileMenuOpen(false)}>{t('about')}</Link>
           <Link href="/servicos" onClick={() => setMobileMenuOpen(false)}>{t('services')}</Link>
           <Link href="/cases" onClick={() => setMobileMenuOpen(false)}>{t('cases')}</Link>
           <Link href="/contato" onClick={() => setMobileMenuOpen(false)}>{t('contact')}</Link>
           <LanguageSwitcher />
        </div>
      )}
    </header>
  );
}
