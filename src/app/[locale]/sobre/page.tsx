'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

interface TeamMemberProps {
  index: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  tags: string[];
  indexLabel: string;
  image: string;
  instagram: string;
  linkedin: string;
  email: string;
  reverse?: boolean;
}

function TeamMember({ index, name, firstName, lastName, title, bio, tags, indexLabel, image, instagram, linkedin, email, reverse }: TeamMemberProps) {
  return (
    <div className={`team-member group relative flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} border-b border-white/10 overflow-hidden`}>

      <div className="relative w-full md:w-[42%] aspect-[3/4] flex-shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
          sizes="(max-width: 768px) 100vw, 42vw"
        />
        <div className={`absolute inset-0 bg-gradient-to-${reverse ? 'l' : 'r'} from-transparent to-brand-bg/60 pointer-events-none`} />
      </div>

      <div className={`relative z-10 flex flex-col justify-center px-8 md:px-16 py-16 flex-1 ${reverse ? 'md:items-end md:text-right' : ''}`}>
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-8 font-body">{index} — {indexLabel}</p>

        <h3 className="font-display font-black uppercase leading-[0.9] mb-6">
          <span className="block text-[clamp(3rem,6vw,6rem)] text-white/30">{firstName}</span>
          <span className="block text-[clamp(3rem,6vw,6rem)] text-white group-hover:text-accent transition-colors duration-500">{lastName}</span>
        </h3>

        <p className={`text-xs uppercase tracking-widest text-muted mb-8 border-t border-white/10 pt-6 ${reverse ? 'md:border-r md:border-l-0 md:pr-6' : 'border-l-0'}`}>
          {title}
        </p>

        <p className="text-sm text-muted leading-relaxed max-w-md mb-8 font-body">
          {bio}
        </p>

        <div className={`flex flex-wrap gap-2 mb-10 ${reverse ? 'md:justify-end' : ''}`}>
          {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1 font-body hover:border-accent/40 hover:text-accent/70 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex items-center gap-3 ${reverse ? 'md:justify-end' : ''}`}>
          <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${email}`} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300" aria-label="E-mail">
            <EmailIcon />
          </a>
          <span className="ml-2 text-xs text-white/20 font-body">{email}</span>
        </div>
      </div>
    </div>
  );
}

export default function SobrePage() {
  const t = useTranslations('About');
  const containerRef = useRef<HTMLDivElement>(null);

  const member1Tags = t.raw('member1Tags') as string[];
  const member2Tags = t.raw('member2Tags') as string[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sobre-label', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.sobre-headline', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.35 });
      gsap.fromTo('.sobre-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.7, ease: 'power2.out' });
      gsap.fromTo('.sobre-stat', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, delay: 0.9, ease: 'power2.out' });

      gsap.utils.toArray('.team-member').forEach((el: any, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: { trigger: el, start: 'top 85%' },
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: i * 0.1
          }
        );
      });

      gsap.utils.toArray('.value-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: { trigger: card, start: 'top 85%' },
            y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: i * 0.15
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-20 px-6 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
          <span className="font-display font-black text-[22vw] text-white/[0.03] leading-none select-none">SOBRE</span>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <p className="sobre-label text-xs uppercase tracking-[0.3em] text-accent mb-10 border-l-2 border-accent pl-4 font-body">
            {t('label')}
          </p>

          <h1 className="sobre-headline font-display font-black text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.0] uppercase tracking-tight mb-14 max-w-4xl">
            {t('headline1')}<br/>
            <em className="not-italic text-white/30">{t('headline2')}</em><br/>
            <span className="text-accent">{t('headline3')}</span>
          </h1>

          <div className="sobre-text grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-10">
            <div className="md:col-span-5 text-muted text-base md:text-lg leading-relaxed space-y-4 font-body">
              <p>{t('body1')}</p>
              <p>{t('body2')}</p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10 self-start">
              <div className="sobre-stat px-5 py-6 border-b sm:border-b-0 sm:border-r border-white/10">
                <div className="font-display font-black text-3xl md:text-5xl text-accent mb-1">+20</div>
                <div className="text-xs uppercase tracking-widest text-muted font-body leading-tight">{t('stat1Label')}</div>
              </div>
              <div className="sobre-stat px-5 py-6 border-b sm:border-b-0 sm:border-r border-white/10">
                <div className="font-display font-black text-3xl md:text-5xl text-accent mb-1">+500</div>
                <div className="text-xs uppercase tracking-widest text-muted font-body leading-tight">{t('stat2Label')}</div>
              </div>
              <div className="sobre-stat px-5 py-6">
                <div className="font-display font-black text-3xl md:text-5xl text-accent mb-1">+1.200</div>
                <div className="text-xs uppercase tracking-widest text-muted font-body leading-tight">{t('stat3Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIDERANÇA ────────────────────────────────────────── */}
      <section className="bg-brand-surface">
        <div className="container mx-auto px-6 py-16">
          <h2 className="font-display font-black text-xs uppercase tracking-[0.3em] text-white/20 mb-0">{t('leadershipSection')}</h2>
        </div>

        <TeamMember
          index="01"
          name="Filipe Medina"
          firstName="Filipe"
          lastName="Medina"
          title={t('member1Title')}
          bio={t('member1Bio')}
          tags={member1Tags}
          indexLabel={t('memberIndexLabel')}
          image="/about/filipe-medina.jpeg"
          instagram="https://www.instagram.com/filipemedina/"
          linkedin="https://www.linkedin.com/in/filipemedina/"
          email="medina@wexo.com.br"
        />

        <TeamMember
          index="02"
          name="Leandro Bulsing"
          firstName="Leandro"
          lastName="Bulsing"
          title={t('member2Title')}
          bio={t('member2Bio')}
          tags={member2Tags}
          indexLabel={t('memberIndexLabel')}
          image="/about/leandro-bulsing.jpeg"
          instagram="https://www.instagram.com/lbulsing/"
          linkedin="https://www.linkedin.com/in/leandro-bulsing/"
          email="leandro@wexo.com.br"
          reverse
        />
      </section>

      {/* ─── VALORES ──────────────────────────────────────────── */}
      <section className="py-32 border-t border-white/10 bg-brand-bg overflow-hidden">
        <div className="container mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-accent border-l-2 border-accent pl-4 mb-24 font-body">{t('valuesLabel')}</p>

          <div className="space-y-0 divide-y divide-white/5">

            <div className="value-card group relative py-16 md:py-20 flex flex-col md:flex-row md:items-center gap-8 md:gap-20 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8">
              <span className="flex-shrink-0 font-display font-black text-[8rem] md:text-[11rem] leading-none text-white/5 group-hover:text-accent/20 transition-colors duration-500 select-none w-full md:w-48 text-center md:text-left">01</span>
              <h3 className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
                {t.rich('value1', {
                  accent: (chunks) => <span className="text-accent">{chunks}</span>,
                  strike: (chunks) => <span className="line-through text-white/30">{chunks}</span>,
                })}
              </h3>
            </div>

            <div className="value-card group relative py-16 md:py-20 flex flex-col md:flex-row md:items-center gap-8 md:gap-20 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8">
              <span className="flex-shrink-0 font-display font-black text-[8rem] md:text-[11rem] leading-none text-white/5 group-hover:text-accent/20 transition-colors duration-500 select-none w-full md:w-48 text-center md:text-left">02</span>
              <h3 className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
                {t.rich('value2', {
                  accent: (chunks) => <span className="text-accent italic">{chunks}</span>,
                  strike: (chunks) => <span className="line-through text-white/30">{chunks}</span>,
                })}
              </h3>
            </div>

            <div className="value-card group relative py-16 md:py-20 flex flex-col md:flex-row md:items-center gap-8 md:gap-20 hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8">
              <span className="flex-shrink-0 font-display font-black text-[8rem] md:text-[11rem] leading-none text-white/5 group-hover:text-accent/20 transition-colors duration-500 select-none w-full md:w-48 text-center md:text-left">03</span>
              <h3 className="font-display text-2xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
                {t.rich('value3', {
                  accent: (chunks) => <span className="text-accent">{chunks}</span>,
                })}
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-32 border-t border-white/10 bg-brand-surface text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-8 font-body">{t('ctaLabel')}</p>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-6xl uppercase mb-10 md:mb-12 max-w-3xl mx-auto leading-tight">
          {t('ctaHeading')} <span className="text-accent italic not-italic">{t('ctaAccent')}</span>.
        </h2>
        <Link
          href="/contato"
          className="inline-block px-10 py-4 border border-accent text-accent uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all duration-300 font-body"
        >
          {t('ctaButton')}
        </Link>
      </section>

    </div>
  );
}
