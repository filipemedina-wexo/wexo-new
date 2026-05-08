'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTranslations, useLocale } from 'next-intl';
import { sendGAEvent } from '@next/third-parties/google';
import { useSearchParams } from 'next/navigation';

const WHATSAPP_URL = 'https://wa.me/555181610066';
const INSTAGRAM_URL = 'https://instagram.com/wexocreative';
// Usamos nossa API interna como proxy para evitar erros de CORS no n8n
const WEBHOOK_URL = '/api/contact';

export default function ContatoPage() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    mensagem: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contato-hero',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo('.channel-card',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.7 }
      );
      gsap.fromTo('.contato-form',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.0 }
      );
      gsap.fromTo('.contato-info',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const formatPhone = (value: string) => {
    if (locale !== 'pt') return value;
    
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 10) {
      // (00) 0000-0000
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 14);
    } else {
      // (00) 00000-0000
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, telefone: formatPhone(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Captura UTMs da URL
    const utms = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
    };

    const payload = {
      ...formData,
      ...utms,
      origem: 'Site Wexo',
      data: new Date().toLocaleString('pt-BR'),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        // GA4 Conversion Event
        sendGAEvent('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'contact_form_submission',
          value: 1
        });
        setFormData({ nome: '', empresa: '', email: '', telefone: '', mensagem: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setStatus('error');
    }
  };

  return (
    <div ref={containerRef} className="pt-28 pb-24 min-h-[90vh]">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* HERO */}
        <div className="text-center mb-14">
          <p className="contato-hero text-xs uppercase tracking-[0.25em] text-accent mb-5">
            {t('badge')}
          </p>
          <h1 className="contato-hero font-display text-5xl md:text-7xl mb-6 leading-tight">
            {t('heading1')} <em className="text-accent italic">{t('heading2')}</em>
          </h1>
          <p className="contato-hero text-muted text-lg max-w-lg mx-auto leading-relaxed">
            {t('body')}
          </p>
        </div>

        {/* CHANNEL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card group bg-brand-surface border border-white/8 rounded-2xl p-6 flex items-center gap-4 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 hoverable"
          >
            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
              💬
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold mb-0.5">WhatsApp</h3>
              <p className="text-xs text-muted">{t('whatsappSub')}</p>
            </div>
            <span className="text-accent text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card group bg-brand-surface border border-white/8 rounded-2xl p-6 flex items-center gap-4 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 hoverable"
          >
            <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
              📷
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold mb-0.5">Instagram</h3>
              <p className="text-xs text-muted">{t('instagramSub')}</p>
            </div>
            <span className="text-accent text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 max-w-xl mx-auto mb-8">
          <div className="flex-1 h-px bg-white/7" />
          <span className="text-xs uppercase tracking-[0.15em] text-muted/60 whitespace-nowrap">
            {t('divider')}
          </span>
          <div className="flex-1 h-px bg-white/7" />
        </div>

        {/* FORM */}
        <div className="contato-form bg-brand-surface border border-white/5 rounded-2xl p-8 md:p-10 max-w-xl mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-2">{t('nameLabel')}</label>
                <input
                  type="text"
                  className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-accent transition-colors"
                  placeholder={t('namePlaceholder')}
                  value={formData.nome}
                  onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-2">{t('companyLabel')}</label>
                <input
                  type="text"
                  className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-accent transition-colors"
                  placeholder={t('companyPlaceholder')}
                  value={formData.empresa}
                  onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-2">{t('emailLabel')}</label>
                <input
                  type="email"
                  className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-accent transition-colors"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-muted mb-2">{t('phoneLabel')}</label>
                <input
                  type="text"
                  className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-accent transition-colors"
                  placeholder={t('phonePlaceholder')}
                  value={formData.telefone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-muted mb-2">{t('messageLabel')}</label>
              <textarea
                className="w-full bg-brand-bg border border-dashed border-white/10 rounded-lg px-4 py-3 text-cream h-24 resize-none focus:outline-none focus:border-accent transition-colors placeholder:text-muted/40"
                placeholder={t('messagePlaceholder')}
                value={formData.mensagem}
                onChange={(e) => setFormData(prev => ({ ...prev, mensagem: e.target.value }))}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-accent text-white py-4 rounded-lg uppercase tracking-widest text-xs hover:bg-opacity-80 transition-colors hoverable disabled:opacity-50"
            >
              {status === 'sending' ? t('sending') : t('submit')}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-xs text-center mt-4">{t('successMessage')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center mt-4">{t('errorMessage')}</p>
            )}
          </form>
        </div>

        {/* BOTTOM INFO */}
        <div className="contato-info flex flex-col sm:flex-row justify-center gap-10 mt-14 pt-10 border-t border-white/5">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-2">{t('emailLabel')}</h4>
            <a href="mailto:contato@wexo.com.br" className="text-sm hover:text-accent transition-colors hoverable">
              contato@wexo.com.br
            </a>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-2">{t('locationLabel')}</h4>
            <p className="text-sm text-cream">{t('location')}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
