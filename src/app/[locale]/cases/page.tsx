'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type CaseItem = {
  id: number;
  client: string;
  project?: string;
  images: string[];
  description: string;
  left: number;
  top: number;
  width: number;
  height: number;
  parallaxSpeed: number;
};

const canvasWidth = 4400;
const canvasHeight = 3200;

const caseData: Omit<CaseItem, 'id' | 'description' | 'left' | 'top' | 'width' | 'height' | 'parallaxSpeed'>[] = [
  { client: 'Yadra',            images: ['/cases/yadra.webp', '/cases/yadra-2.webp', '/cases/yadra-3.webp'] },
  { client: 'Retina center',    images: ['/cases/retina-center.webp', '/cases/retina-center-2.webp'] },
  { client: 'Parallax',         images: ['/cases/parallax.webp', '/cases/parallax-2.webp'] },
  { client: 'Ab incorporadora', project: 'Ronald42',             images: ['/cases/ab-incorporadora_ronald42.webp', '/cases/ab-incorporadora_ronald42-2.webp'] },
  { client: 'Hospital da plastica',                              images: ['/cases/hospital-da-plastica.webp', '/cases/hospital-da-plastica-2.webp'] },
  { client: 'Nazale',           project: 'Viz',                  images: ['/cases/nazale_viz.webp', '/cases/nazale_viz-2.webp'] },
  { client: 'Nazale',           project: 'Zephyr',               images: ['/cases/nazale_zephyr.webp', '/cases/nazale_zephyr-2.webp', '/cases/nazale_zephyr-3.webp'] },
  { client: 'Voxxa',            images: ['/cases/voxxa.webp', '/cases/voxxa-2.webp'] },
  { client: 'Arccio',           project: 'Reserva park canella', images: ['/cases/arccio_reserva-park-canella.webp', '/cases/arccio_reserva-park-canella-2.webp'] },
  { client: 'Arskammer',        images: ['/cases/arskammer.webp', '/cases/arskammer-2.webp'] },
  { client: 'La rocca',         images: ['/cases/la-rocca.webp', '/cases/la-rocca-2.webp'] },
  { client: 'Mirar',            images: ['/cases/mirar.webp', '/cases/mirar-2.webp'] },
  { client: 'Durafa',           images: ['/cases/durafa.webp', '/cases/durafa-2.webp'] },
  { client: 'Durafa',           project: 'Oxy',                  images: ['/cases/durafa_oxy.webp', '/cases/durafa_oxy-2.webp'] },
  { client: 'Fogoct',           images: ['/cases/fogoct.webp', '/cases/fogoct-2.webp'] },
  { client: 'Setdoor',          images: ['/cases/setdoor.webp', '/cases/setdoor-2.webp'] },
  { client: 'Nautilus',         images: ['/cases/nautilus.webp', '/cases/nautilus-2.webp'] },
  { client: 'Find',             images: ['/cases/find.webp', '/cases/find-2.webp'] },
  { client: 'Meraki',           images: ['/cases/meraki.webp', '/cases/meraki-2.webp'] },
  { client: 'Amplastic',        images: ['/cases/amplastic.webp'] },
  { client: 'Gesta',            images: ['/cases/gesta.webp', '/cases/gesta-2.webp'] },
  { client: 'Censi fisa',       images: ['/cases/censi-fisa.webp'] },
  { client: 'Legacy',           images: ['/cases/legacy.webp', '/cases/legacy-2.webp'] },
  { client: 'Alto lindoia',     images: ['/cases/alto-lindoia.webp'] },
  { client: 'Arisa',            images: ['/cases/arisa.webp', '/cases/arisa-2.webp'] },
  { client: 'Dimak',            images: ['/cases/dimak.webp', '/cases/dimak-2.webp'] },
  { client: 'Ditech',           images: ['/cases/ditech.webp', '/cases/ditech-2.webp'] },
  { client: 'Emedical',         images: ['/cases/emedical.webp', '/cases/emedical-2.webp'] },
  { client: 'Grupo dasos',      images: ['/cases/grupo-dasos.webp', '/cases/grupo-dasos-2.webp', '/cases/grupo-dasos-3.webp'] },
  { client: 'Kravi',            images: ['/cases/kravi.webp', '/cases/kravi-2.webp', '/cases/kravi-3.webp'] },
  { client: 'La huerta',        images: ['/cases/la-huerta.webp', '/cases/la-huerta-2.webp', '/cases/la-huerta-3.webp', '/cases/la-huerta-4.webp'] },
  { client: 'Sv digital',       images: ['/cases/sv-digital.webp', '/cases/sv-digital-2.webp', '/cases/sv-digital-3.webp'] },
  { client: 'Svbpar',           images: ['/cases/svbpar.webp', '/cases/svbpar-2.webp', '/cases/svbpar-3.webp'] },
  { client: 'Wtcmeat',          images: ['/cases/wtcmeat.webp', '/cases/wtcmeat-2.webp', '/cases/wtcmeat-3.webp'] },
];

const cases: CaseItem[] = caseData.map((data, i) => {
  const w = [300, 450, 600, 500][i % 4] as number;
  const h = [400, 300, 600, 800][(i + 1) % 4] as number;

  const cols = 7;
  const rows = Math.ceil(caseData.length / cols);
  const cellW = canvasWidth / cols;
  const cellH = canvasHeight / rows;
  const c = i % cols;
  const r = Math.floor(i / cols);

  const randomOffsetX = (Math.random() - 0.5) * (cellW * 0.25);
  const randomOffsetY = (Math.random() - 0.5) * (cellH * 0.25);

  return {
    id: i + 1,
    ...data,
    description: '',
    left: (c * cellW) + (cellW / 2) + randomOffsetX - (w / 2),
    top:  (r * cellH) + (cellH / 2) + randomOffsetY - (h / 2),
    width: w,
    height: h,
    parallaxSpeed: 0.5 + Math.random() * 1.5,
  };
});

export default function CasesPage() {
  const t = useTranslations('Cases');
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [modalSlide, setModalSlide] = useState(0);
  const [slideIndices, setSlideIndices] = useState<Record<number, number>>({});
  const [activatedCards, setActivatedCards] = useState<Set<number>>(new Set());

  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLDivElement>(null);
  const caseRefs       = useRef<Record<number, HTMLElement | null>>({});
  const didDragRef     = useRef(false);
  const isDraggingRef  = useRef(false);
  const dragStartRef   = useRef({ x: 0, y: 0 });
  const panRef         = useRef({ x: -(canvasWidth / 2 - 1920 / 2), y: -(canvasHeight / 2 - 1080 / 2) });
  const currentPanRef  = useRef(panRef.current);
  const rafRef         = useRef<number | null>(null);
  const hasDraggedRef  = useRef(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [showHint,   setShowHint]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { if (!hasDragged && !selectedCase) setShowHint(true); }, 3000);
    return () => clearTimeout(t);
  }, [hasDragged, selectedCase]);

  useEffect(() => {
    if (!showHint) return;
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, [showHint]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const ctx = gsap.context(() => {
      gsap.fromTo('.cases-title',  { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.canvas-item',  { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, stagger: 0.02, ease: 'power3.out', delay: 0.5 });
    }, containerRef);
    return () => { document.body.style.overflow = 'auto'; ctx.revert(); };
  }, []);

  const applyPan = (x: number, y: number) => {
    gsap.to(canvasRef.current, { x, y, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
    cases.forEach((item) => {
      const el = caseRefs.current[item.id];
      if (el) {
        gsap.to(el, {
          x: x * (1 - item.parallaxSpeed) * 0.1,
          y: y * (1 - item.parallaxSpeed) * 0.1,
          duration: 0.6, ease: 'power2.out', overwrite: 'auto',
        });
      }
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    currentPanRef.current = { ...panRef.current };
    gsap.to(canvasRef.current, { cursor: 'grabbing', duration: 0.1 });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      didDragRef.current = true;
      if (!hasDraggedRef.current) {
        hasDraggedRef.current = true;
        setHasDragged(true);
        setShowHint(false);
      }
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    panRef.current = {
      x: Math.max(-(canvasWidth  - vw  + 200), Math.min(200, currentPanRef.current.x + dx)),
      y: Math.max(-(canvasHeight - vh  + 200), Math.min(200, currentPanRef.current.y + dy)),
    };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        applyPan(panRef.current.x, panRef.current.y);
      });
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    gsap.to(canvasRef.current, { cursor: 'grab', duration: 0.1 });
  };

  const openCase = (item: CaseItem) => { setSelectedCase(item); setModalSlide(0); };
  const closeCase = () => setSelectedCase(null);

  const handleItemEnter = (_e: React.MouseEvent, id: number) => {
    setActivatedCards(prev => { prev.add(id); return new Set(prev); });
    const el = caseRefs.current[id];
    if (el && !isDraggingRef.current) {
      gsap.to(el, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
      gsap.to(el.querySelector('.item-imgs'), { opacity: 1, duration: 0.4 });
      gsap.to(el.querySelector('.item-content'), { y: -10, duration: 0.4 });
    }
  };

  const handleItemLeave = (_e: React.MouseEvent, id: number) => {
    const el = caseRefs.current[id];
    if (el) {
      gsap.to(el, { scale: 1, duration: 0.6, ease: 'power2.out' });
      gsap.to(el.querySelector('.item-imgs'), { opacity: 0.65, duration: 0.4 });
      gsap.to(el.querySelector('.item-content'), { y: 0, duration: 0.4 });
    }
  };

  const setCardSlide = (id: number, dir: 1 | -1, total: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndices(prev => {
      const cur = prev[id] ?? 0;
      return { ...prev, [id]: (cur + dir + total) % total };
    });
  };

  const setCardSlideIndex = (id: number, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlideIndices(prev => ({ ...prev, [id]: idx }));
  };

  return (
    <>
      {/* ── MODAL ─────────────────────────────────────────────── */}
      <div className={`fixed inset-0 z-[200] transition-opacity duration-200 ease-out ${selectedCase ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#0A0A0F]/80 backdrop-blur-[20px]" onClick={closeCase} />

        {selectedCase && (
          <div className="absolute inset-4 md:inset-8 lg:inset-12 flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full max-w-[1920px] aspect-video max-h-[90vh] bg-[#0A0A0F] border border-white/10 shadow-2xl rounded-3xl overflow-hidden pointer-events-auto">

              {/* Fechar */}
              <button onClick={closeCase} className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/10">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {/* Imagens com cross-fade */}
              {selectedCase.images.map((img, idx) => (
                <div key={img} className={`absolute inset-0 transition-opacity duration-500 ${idx === modalSlide ? 'opacity-100' : 'opacity-0'}`}>
                  <Image src={img} alt={selectedCase.project ?? selectedCase.client} fill className="object-cover" priority={idx === 0} />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Arrows do modal */}
              {selectedCase.images.length > 1 && (
                <>
                  <button
                    onClick={() => setModalSlide(s => (s - 1 + selectedCase.images.length) % selectedCase.images.length)}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/10"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={() => setModalSlide(s => (s + 1) % selectedCase.images.length)}
                    className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/50 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/10"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>

                  {/* Dots do modal */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
                    {selectedCase.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalSlide(idx)}
                        className={`rounded-full transition-all duration-300 ${idx === modalSlide ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Logo */}
              <div className="absolute top-8 left-8 md:top-12 md:left-12 opacity-80 pointer-events-none">
                <Image src="/logo.png" alt="Wexo" width={100} height={32} className="object-contain" />
              </div>

              {/* Nome */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
                <span className="text-accent text-[10px] uppercase tracking-[0.3em] font-display mb-2 block">{selectedCase.client}</span>
                <h2 className="font-display text-4xl md:text-7xl lg:text-[6rem] leading-none text-white drop-shadow-2xl">
                  {selectedCase.project ?? selectedCase.client}
                </h2>
              </div>

              {/* Contador de imagens */}
              {selectedCase.images.length > 1 && (
                <div className="absolute top-8 right-20 z-50 text-white/40 text-xs font-body tracking-widest">
                  {modalSlide + 1} / {selectedCase.images.length}
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* ── CANVAS VIEWPORT ───────────────────────────────────── */}
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-screen overflow-hidden bg-[#0A0A0F] cursor-grab active:cursor-grabbing touch-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Hint */}
        <div className={`absolute inset-0 z-[150] pointer-events-none flex flex-col items-center justify-center transition-all duration-700 bg-black/60 backdrop-blur-md ${showHint ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative flex items-center justify-center w-32 h-32 mb-4">
            <div className="absolute w-12 h-12 bg-accent/40 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            <svg className="absolute text-white stroke-2 drop-shadow-2xl" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'dragAnimation 2s infinite ease-in-out' }}>
              <path d="M10 11V3a2 2 0 1 1 4 0v8"/><path d="M14 11V7a2 2 0 1 1 4 0v2"/><path d="M18 9V6a2 2 0 1 1 4 0v9a8 8 0 0 1-13.6 5.6"/><path d="M8.4 14.6 4.3 10.5a2 2 0 1 1 2.8-2.8L10 11"/>
            </svg>
            <style>{`
              @keyframes dragAnimation {
                0%   { transform: translate(20px, 10px) scale(1); }
                30%  { transform: translate(20px, 10px) scale(0.9); }
                70%  { transform: translate(-20px,-10px) scale(0.9); }
                100% { transform: translate(20px, 10px) scale(1); }
              }
              @keyframes borderSpin {
                0%   { transform: translate(-50%,-50%) rotate(0deg); }
                100% { transform: translate(-50%,-50%) rotate(360deg); }
              }
            `}</style>
          </div>
          <p className="font-display font-black uppercase text-xl md:text-3xl tracking-widest text-[#EFEFEF] drop-shadow-xl text-center">{t('hintTitle')}</p>
          <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.3em] font-body mt-2 text-center">{t('hintSubtitle')}</p>
        </div>

        {/* HUD */}
        <div className="absolute top-32 left-12 z-50 pointer-events-none">
          <h1 className="cases-title font-display text-5xl md:text-7xl mb-4">
            {t('hudTitlePrefix')} <em className="text-accent italic">{t('hudTitleAccent')}</em>
          </h1>
          <div className="cases-title flex items-center gap-4">
            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-muted text-sm uppercase tracking-widest">{t('hudSubtitle')}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm md:max-w-lg px-4">
          <div className="relative p-[1.5px] rounded-3xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
            <span aria-hidden className="pointer-events-none absolute" style={{ width: '150%', height: '150%', top: '50%', left: '50%', background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 50deg, transparent 100deg)', animation: 'borderSpin 3s linear infinite' }} />
            <Link href="/contato" className="relative z-10 flex flex-col items-center gap-2 px-8 py-6 rounded-[22px] bg-[#0D0D12] backdrop-blur-2xl transition-colors duration-300 hover:bg-[#13131a]">
              <span className="text-white/40 text-[10px] uppercase tracking-[0.35em] font-body">{t('ctaTop')}</span>
              <span className="font-display text-white text-xl md:text-2xl leading-snug text-center">{t('ctaTitle')}</span>
              <span className="mt-1 flex items-center gap-2 bg-white/10 border border-white/30 text-white text-[11px] uppercase tracking-widest font-body px-4 py-2 rounded-full hover:bg-accent hover:text-black hover:border-transparent transition-all duration-300 cursor-pointer">
                {t('ctaButton')}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Canvas */}
        <div ref={canvasRef} className="absolute top-0 left-0" style={{ width: canvasWidth, height: canvasHeight, willChange: 'transform' }}>
          {cases.map((c) => {
            const activeSlide = slideIndices[c.id] ?? 0;
            const hasMany = c.images.length > 1;
            return (
              <div
                key={c.id}
                ref={el => { caseRefs.current[c.id] = el; }}
                className="canvas-item absolute bg-brand-surface rounded-xl overflow-hidden hoverable group"
                style={{ left: c.left, top: c.top, width: c.width, height: c.height }}
                onMouseEnter={(e) => handleItemEnter(e, c.id)}
                onMouseLeave={(e) => handleItemLeave(e, c.id)}
                onClick={() => { if (!didDragRef.current) openCase(c); }}
              >
                {/* Imagens empilhadas — slides extras só carregam após hover */}
                <div className="item-imgs absolute inset-0 opacity-65">
                  {c.images.map((img, idx) => {
                    if (idx > 0 && !activatedCards.has(c.id)) return null;
                    return (
                      <div key={img} className={`absolute inset-0 transition-opacity duration-500 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}>
                        <Image src={img} alt={c.project ?? c.client} fill className="object-cover" draggable={false} loading="lazy" />
                      </div>
                    );
                  })}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Arrows do card */}
                {hasMany && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 hover:bg-white hover:text-black text-white"
                      onClick={(e) => setCardSlide(c.id, -1, c.images.length, e)}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 hover:bg-white hover:text-black text-white"
                      onClick={(e) => setCardSlide(c.id, 1, c.images.length, e)}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>

                    {/* Dots do card */}
                    <div className="absolute bottom-14 left-0 right-0 z-20 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {c.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => setCardSlideIndex(c.id, idx, e)}
                          onPointerDown={(e) => e.stopPropagation()}
                          className={`rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-4 h-1 bg-white' : 'w-1 h-1 bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Título */}
                <div className="item-content absolute bottom-0 left-0 w-full p-5 flex flex-col pointer-events-none">
                  {c.project && <span className="text-accent text-[10px] uppercase tracking-[0.2em] mb-1">{c.client}</span>}
                  <h3 className="font-display text-xl md:text-2xl text-white">{c.project ?? c.client}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
