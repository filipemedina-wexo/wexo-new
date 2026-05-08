'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

gsap.registerPlugin(ScrollTrigger);

export default function HomePageClient() {
  const t = useTranslations('Home');
  const containerRef = useRef<HTMLDivElement>(null);

  const ALL_LOGOS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
    82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94
  ];

  const [activeLogos, setActiveLogos] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24]);

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setActiveLogos(prev => {
        let unseenLogos = ALL_LOGOS.filter(id => !prev.includes(id));
        if (unseenLogos.length < 5) return prev;

        const cellsToReplace: number[] = [];
        while(cellsToReplace.length < 5) {
           const r = Math.floor(Math.random() * 20);
           if (!cellsToReplace.includes(r)) cellsToReplace.push(r);
        }

        const newLogos: number[] = [];
        for (let i = 0; i < 5; i++) {
           const rIndex = Math.floor(Math.random() * unseenLogos.length);
           newLogos.push(unseenLogos[rIndex]!);
           unseenLogos.splice(rIndex, 1);
        }

        cellsToReplace.forEach((cellIndex, idx) => {
          const wrapper = containerRef.current?.querySelector(`.client-logo-wrapper-${cellIndex}`);
          const target = wrapper?.querySelector(`.inner-flipper`);
          
          if (target) {
            gsap.to(target, {
              rotateX: 90,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                 setActiveLogos(current => {
                   const newArr = [...current];
                   newArr[cellIndex] = newLogos[idx]!;
                   return newArr;
                 });
                 
                 // Re-select target after state update to ensure we have the right DOM element
                 setTimeout(() => {
                   const nextTarget = containerRef.current?.querySelector(`.client-logo-wrapper-${cellIndex} .inner-flipper`);
                   if (nextTarget) {
                     gsap.to(nextTarget, {
                       rotateX: 0,
                       opacity: 1,
                       duration: 0.4,
                       ease: "back.out(1.5)",
                       delay: 0.05
                     });
                   }
                 }, 50);
              }
            });
          }
        });

        return prev;
      });
    }, 1200);

    return () => clearInterval(flipInterval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line',
        { y: '100%' },
        { y: '0%', duration: 1.2, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
      );
      gsap.fromTo('.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo('.hero-cta',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'expo.out', delay: 1 }
      );

      gsap.to('.manifesto-text', {
        scrollTrigger: {
          trigger: '.manifesto-section',
          start: 'top 60%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out'
      });

      gsap.fromTo('.stat-block',
        { scale: 0.9, opacity: 0, x: 50 },
        {
           scrollTrigger: {
             trigger: '.stat-block',
             start: 'top 80%'
           },
           scale: 1, opacity: 1, x: 0, duration: 1, ease: 'expo.out'
        }
      );

      const stats = document.querySelectorAll('.stat-num');
      stats.forEach(stat => {
        const val = parseFloat(stat.getAttribute('data-val') || '0');
        gsap.to(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
          },
          innerHTML: val,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power2.out',
          onUpdate: function() {
            if (stat.getAttribute('data-prefix')) {
              stat.innerHTML = (stat.getAttribute('data-prefix') ?? '') + Math.round(Number(stat.innerHTML));
            } else if (stat.getAttribute('data-suffix')) {
              stat.innerHTML = Math.round(Number(stat.innerHTML)) + (stat.getAttribute('data-suffix') || '');
            } else {
              stat.innerHTML = String(Math.round(Number(stat.innerHTML)));
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* SEÇÃO 1 — Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand-surface z-0 overflow-hidden">
          <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover opacity-20 filter grayscale">
            <source src="/herobanner.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/95 via-brand-bg/70 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mt-12">
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter mb-8 uppercase font-bold">
            <div className="overflow-hidden"><div className="hero-title-line">{t('heroLine1')}</div></div>
            <div className="overflow-hidden"><div className="hero-title-line text-white/90">{t('heroLine2')}</div></div>
            <div className="overflow-hidden"><div className="hero-title-line text-accent">{t('heroLine3')}</div></div>
          </h1>

          <div className="flex flex-col max-w-md gap-8">
            <p className="hero-sub text-muted text-lg font-body">
              {t('heroSub')}
            </p>
            <div className="hero-cta opacity-0">
              <Link href="/sobre" className="inline-block px-10 py-4 border border-accent text-accent uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all duration-300 font-body hoverable">
                {t('heroCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — Manifesto */}
      <section className="manifesto-section min-h-screen flex items-center px-6 py-24 border-t border-white/20 relative overflow-hidden bg-brand-surface">
        <div className="absolute top-0 right-0 px-12 text-[15vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none transform -translate-y-1/4 leading-none">
          MANIFESTO
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="col-span-1 md:col-span-8">
              <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-7xl leading-[1.05] mb-12 text-white/40 uppercase">
                <span className="manifesto-text block transform translate-y-12 opacity-0">{t('manifestoLine1')} </span>
                <span className="manifesto-text block transform translate-y-12 opacity-0 text-white font-black">{t('manifestoLine2')}</span>
                <span className="manifesto-text block transform translate-y-12 opacity-0"> {t('manifestoLine3With')} <span className="text-accent underline decoration-accent underline-offset-8">{t('manifestoLine3Brand')}</span></span>
                <br/>
                <span className="manifesto-text block transform translate-y-12 opacity-0 font-body font-normal lowercase tracking-tight italic text-xl md:text-3xl mb-4 text-cream">{t('manifestoItalic')} </span>
                <span className="manifesto-text block transform translate-y-12 opacity-0">{t('manifestoLine4')} </span>
                <span className="manifesto-text block transform translate-y-12 opacity-0 text-white font-black bg-accent/20 px-2 mt-2 w-fit">{t('manifestoLine5')}</span>
                <br/>
                <span className="manifesto-text block transform translate-y-12 opacity-0 text-xs md:text-sm tracking-widest font-body uppercase mt-8 border-l-2 border-accent pl-6 text-muted max-w-lg leading-relaxed normal-case">{t('manifestoCaption')}</span>
              </h2>
              <Link href="/cases" className="manifesto-text inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent hover:text-white transition-colors duration-300 hoverable group transform translate-y-12 opacity-0">
                <span>{t('manifestoCta')}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
            <div className="col-span-1 md:col-span-4 flex items-end pb-8">
              <div className="stat-block p-10 border border-white/20 bg-brand-bg rounded-none relative">
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/20"></div>
                <p className="text-sm text-muted leading-relaxed font-body">
                  <span className="text-accent text-5xl font-display font-black block mb-4">81%</span>
                  {t('manifestoStat')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — O que fazemos */}
      <section className="min-h-screen py-24 border-t border-white/20 bg-brand-surface relative overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <h3 className="text-xs font-body uppercase tracking-[0.3em] text-accent mb-4 border-l-2 border-accent pl-4">{t('pilaresLabel')}</h3>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-6xl uppercase tracking-tighter">{t('pilaresHeading')}</h2>
        </div>

        <div className="w-full flex flex-col md:flex-row h-[60vh] md:h-[70vh] border-y border-white/20">
          <div className="group flex-1 border-b md:border-b-0 md:border-r border-white/20 hover:flex-[2.5] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden flex items-end p-8 md:p-12 hoverable cursor-pointer">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10 pointer-events-none" />
            <img src="/cases/parallax-2.webp" alt="Brand Strategy" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out" />
            <div className="relative z-20 w-full">
              <div className="font-display font-black text-white/50 text-3xl md:text-7xl mb-2 md:mb-4 group-hover:text-accent group-hover:-translate-y-2 transition-all duration-500">01</div>
              <h4 className="text-base md:text-3xl font-display font-black uppercase tracking-tight mb-2 md:mb-4 group-hover:-translate-y-2 transition-transform duration-500 text-white">{t('pillar1Title')}</h4>
              <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 lg:max-w-sm h-0 group-hover:h-auto overflow-hidden font-body translate-y-4 group-hover:translate-y-0">
                {t('pillar1Desc')}
              </p>
            </div>
          </div>
          <div className="group flex-1 border-b md:border-b-0 md:border-r border-white/20 hover:flex-[2.5] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden flex items-end p-8 md:p-12 hoverable cursor-pointer">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10 pointer-events-none" />
            <img src="/cases/nautilus.webp" alt="Visual Identity" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out" />
            <div className="relative z-20 w-full">
              <div className="font-display font-black text-white/50 text-3xl md:text-7xl mb-2 md:mb-4 group-hover:text-accent group-hover:-translate-y-2 transition-all duration-500">02</div>
              <h4 className="text-base md:text-3xl font-display font-black uppercase tracking-tight mb-2 md:mb-4 group-hover:-translate-y-2 transition-transform duration-500 text-white">{t('pillar2Title')}</h4>
              <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 lg:max-w-sm h-0 group-hover:h-auto overflow-hidden font-body translate-y-4 group-hover:translate-y-0">
                {t('pillar2Desc')}
              </p>
            </div>
          </div>
          <div className="group flex-1 border-b md:border-b-0 md:border-r border-white/20 hover:flex-[2.5] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden flex items-end p-8 md:p-12 hoverable cursor-pointer">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10 pointer-events-none" />
            <img src="/cases/arskammer.webp" alt="Rebranding" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out" />
            <div className="relative z-20 w-full">
              <div className="font-display font-black text-white/50 text-3xl md:text-7xl mb-2 md:mb-4 group-hover:text-accent group-hover:-translate-y-2 transition-all duration-500">03</div>
              <h4 className="text-base md:text-3xl font-display font-black uppercase tracking-tight mb-2 md:mb-4 group-hover:-translate-y-2 transition-transform duration-500 text-white">{t('pillar3Title')}</h4>
              <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 lg:max-w-sm h-0 group-hover:h-auto overflow-hidden font-body translate-y-4 group-hover:translate-y-0">
                {t('pillar3Desc')}
              </p>
            </div>
          </div>
          <div className="group flex-1 hover:flex-[2.5] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] relative overflow-hidden flex items-end p-8 md:p-12 hoverable cursor-pointer">
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-700 z-10 pointer-events-none" />
            <img src="/cases/durafa.webp" alt="Consulting" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-1000 ease-out" />
            <div className="relative z-20 w-full">
              <div className="font-display font-black text-white/50 text-3xl md:text-7xl mb-2 md:mb-4 group-hover:text-accent group-hover:-translate-y-2 transition-all duration-500">04</div>
              <h4 className="text-base md:text-3xl font-display font-black uppercase tracking-tight mb-2 md:mb-4 group-hover:-translate-y-2 transition-transform duration-500 text-white">{t('pillar4Title')}</h4>
              <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 lg:max-w-sm h-0 group-hover:h-auto overflow-hidden font-body translate-y-4 group-hover:translate-y-0">
                {t('pillar4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — Clientes */}
      <section className="py-12 md:py-24 relative z-10 bg-brand-bg">
        <div className="container mx-auto px-6 mb-8 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/20 pb-6 md:pb-8">
          <div>
            <h3 className="text-xs font-body uppercase tracking-[0.3em] text-accent mb-4 border-l-2 border-accent pl-4">{t('ecosystemLabel')}</h3>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-6xl uppercase tracking-tighter">{t('ecosystemHeading')}</h2>
          </div>
          <Link href="/cases" className="text-sm uppercase tracking-widest text-muted hover:text-white transition-colors hoverable mt-8 md:mt-0 font-body">
            {t('ecosystemLink')}
          </Link>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-l border-white/20">
            {activeLogos.map((num, i) => (
              <div key={i} className={`client-cell aspect-video border-b border-r border-[#EFEFEF] flex items-center justify-center p-3 sm:p-8 bg-white relative overflow-hidden transition-colors duration-500${i >= 15 ? ' hidden md:flex' : ''}`}>
                <div className={`client-logo-wrapper-${i} w-full h-full relative flex items-center justify-center`} style={{ perspective: '800px' }}>
                  <div className="inner-flipper w-full h-full relative flex items-center justify-center">
                    <img
                      src={`/clients/${num}.png`}
                      alt="Cliente"
                      className="absolute inset-0 m-auto w-[110%] h-[110%] object-contain z-10 scale-[1.2]"
                      onError={(e) => {
                        e.currentTarget.parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — Números */}
      <section className="py-32 border-y border-white/5 bg-brand-surface relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-5">
           <span className="font-display text-[30vw] whitespace-nowrap text-white">WEXO</span>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="stat-num font-display text-5xl md:text-8xl text-accent mb-4" data-val="11" data-suffix=" anos">0</div>
              <div className="text-xs uppercase tracking-widest text-muted">{t('statYears')}</div>
            </div>
            <div>
              <div className="stat-num font-display text-5xl md:text-8xl text-accent mb-4" data-val="40" data-prefix="+">0</div>
              <div className="text-xs uppercase tracking-widest text-muted">{t('statProjects')}</div>
            </div>
            <div>
              <div className="stat-num font-display text-5xl md:text-8xl text-accent mb-4" data-val="8" data-suffix=" setores">0</div>
              <div className="text-xs uppercase tracking-widest text-muted">{t('statSectors')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — CTA Final */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 relative">
        <h2 className="font-display text-2xl sm:text-3xl md:text-6xl mb-8 md:mb-12 max-w-4xl leading-tight">
          {t('ctaHeading')} <span className="italic text-accent">{t('ctaAccent')}</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link href="/contato" className="inline-block px-10 py-4 border border-accent text-accent uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all duration-300 font-body hoverable">
            {t('ctaButton')}
          </Link>
          <Link href="/sobre" className="text-xs uppercase tracking-widest text-muted hover:text-white transition-colors hoverable font-body">
            {t('ctaLink')}
          </Link>
        </div>
      </section>
    </div>
  );
}
