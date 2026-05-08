'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = {
  titulo: string;
  para: string;
  inclui: string[];
  entrega: string;
};

export default function ServicosPage() {
  const t = useTranslations('Services');
  const containerRef = useRef<HTMLDivElement>(null);

  const items = t.raw('items') as ServiceItem[];
  const servicos = items.map((s, i) => ({
    ...s,
    num: String(i + 1).padStart(2, '0'),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.servico-section').forEach((section: any) => {
        const num = section.querySelector('.bg-number');
        const content = section.querySelector('.content-wrap');

        gsap.to(num, {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.fromTo(content,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 mb-16 max-w-6xl">
         <h1 className="font-display text-5xl md:text-7xl text-accent mb-6">{t('heading')}</h1>
         <p className="text-muted max-w-xl text-lg">{t('subtitle')}</p>
      </div>

      {servicos.map((s) => (
        <section key={s.num} className="servico-section min-h-[80vh] md:min-h-screen flex items-center relative overflow-hidden border-t border-white/5 py-24">
          <div className="bg-number absolute top-[10%] right-[-5%] -z-10 font-display text-[35vw] text-white/[0.03] select-none leading-none">
            {s.num}
          </div>

          <div className="content-wrap container mx-auto px-6 max-w-6xl flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="flex-1">
               <span className="text-accent text-sm tracking-widest font-display mb-4 block">{t('serviceLabel')} {s.num}</span>
               <h2 className="font-display text-4xl md:text-6xl mb-8">{s.titulo}</h2>
               <div className="bg-white/5 p-6 md:p-8 rounded-lg mb-8 border border-white/10">
                 <h4 className="text-xs uppercase tracking-widest text-muted mb-4">{t('forWhom')}</h4>
                 <p className="text-sm leading-relaxed">{s.para}</p>
               </div>
               <Link href="/contato" className="inline-flex items-center text-xs uppercase tracking-widest text-white hover:text-accent transition-colors hoverable group">
                 {t('cta')} <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
               </Link>
            </div>

            <div className="flex-1 md:pt-16">
              <h4 className="text-xs uppercase tracking-widest text-muted mb-6">{t('includes')}</h4>
              <ul className="space-y-4 mb-12">
                {s.inclui.map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 border-b border-white/5 text-sm text-muted">
                    <span className="text-accent text-opacity-50">—</span> {item}
                  </li>
                ))}
              </ul>

              <h4 className="text-xs uppercase tracking-widest text-muted mb-4">{t('deliverables')}</h4>
              <p className="font-display text-xl text-cream">{s.entrega}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
