'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

function FAQItem({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        onClick={onClick}
        className="w-full py-5 flex justify-between items-center text-left hover:text-accent transition-colors duration-300 group"
      >
        <span className="font-display font-bold text-base md:text-lg pr-8">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-accent border-accent text-brand-bg rotate-45' : 'group-hover:border-accent text-white/50'}`}>
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="pb-6 text-muted font-body text-sm leading-relaxed max-w-2xl whitespace-pre-line">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const categories = t.raw('categories') as Array<{
    category: string;
    questions: Array<{ q: string; a: string }>;
  }>;

  const toggleFAQ = (qIndex: number) => {
    setOpenQuestion(openQuestion === qIndex ? null : qIndex);
  };

  const changeCategory = (index: number) => {
    setActiveCategory(index);
    setOpenQuestion(null);
  };

  return (
    <section className="py-24 border-t border-white/10 bg-brand-surface relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4 border-l-2 border-accent pl-4 font-body">{t('label')}</p>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter">{t('titleLine1')}<br/><span className="text-white/40">{t('titleLine2')}</span></h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="flex flex-row flex-wrap lg:flex-col gap-2 pb-4 lg:pb-0">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => changeCategory(idx)}
                  className={`text-left px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm uppercase tracking-widest font-display transition-all duration-300 lg:whitespace-normal border-b-2 lg:border-b-0 lg:border-l-2 ${
                    activeCategory === idx 
                      ? 'border-accent text-accent bg-white/[0.02]' 
                      : 'border-transparent text-white/40 hover:text-white hover:bg-white/[0.01]'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="w-full lg:w-2/3">
            {/* For SEO and AEO: we render all categories but visually hide the inactive ones */}
            {categories.map((category, catIndex) => (
              <div 
                key={catIndex} 
                className={activeCategory === catIndex ? 'block' : 'hidden'}
                aria-hidden={activeCategory !== catIndex}
              >
                <div className="border-t border-white/10">
                  {category.questions.map((item, qIndex) => (
                    <FAQItem 
                      key={qIndex} 
                      q={item.q} 
                      a={item.a} 
                      isOpen={openQuestion === qIndex}
                      onClick={() => toggleFAQ(qIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
