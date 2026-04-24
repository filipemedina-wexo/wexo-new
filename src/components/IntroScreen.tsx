'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';

type Quote = { text: string; author: string };

export default function IntroScreen() {
  const t = useTranslations('Intro');
  const quotes = t.raw('quotes') as Quote[];

  const [complete, setComplete] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * quotes.length));
  }, [quotes.length]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto';
          setComplete(true);
        }
      });

      let progress = { val: 0 };
      tl.to(progress, {
        val: 100,
        duration: 2.5,
        ease: 'power3.out',
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.innerHTML = Math.round(progress.val).toString();
          }
        }
      });

      tl.to('.intro-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'power3.out'
      }, "-=1.0");

      tl.to({}, { duration: 0.8 });

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (complete) return null;

  const quote = quotes[quoteIndex] ?? quotes[0];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0A0A0F] text-cream flex flex-col justify-between p-8 md:p-12"
    >
      <div className="flex justify-between items-start font-display text-xs uppercase tracking-widest text-[#F2EDE4]/50">
        <div>Wexo &copy; {new Date().getFullYear()}</div>
        <div>{t('tagline')}</div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center overflow-hidden max-w-2xl mx-auto px-4">
          <p className="intro-text font-display text-2xl md:text-4xl lg:text-5xl text-[#F2EDE4]/85 italic translate-y-12 opacity-0 mb-8 leading-snug">
            &ldquo;{quote.text}&rdquo;
          </p>
          <p className="intro-text font-display text-xs md:text-sm text-accent translate-y-12 opacity-0 uppercase tracking-[0.25em]">
            &mdash;&nbsp;{quote.author}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end font-display text-xs uppercase tracking-widest text-[#F2EDE4]/50">
        <div>{t('loading')}</div>
        <div className="text-4xl text-accent"><span ref={progressRef}>0</span>%</div>
      </div>
    </div>
  );
}
