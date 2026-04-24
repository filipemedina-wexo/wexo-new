'use client';

import { useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/routing';

const locales = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-body">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          {i > 0 && <span className="text-white/15 select-none">|</span>}
          <Link
            href={pathname}
            locale={l.code}
            className={`transition-colors duration-200 hoverable ${
              locale === l.code
                ? 'text-accent'
                : 'text-white/35 hover:text-white/70'
            }`}
          >
            {l.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
