import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('Footer');

  return (
    <footer className="bg-brand-surface py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 flex flex-col justify-between">
            <Link href="/" className="relative w-20 h-20 mb-8 hoverable">
              <Image src="/logo-sq.png" alt="Wexo Icon" fill className="object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-6">{t('nav1')}</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link href="/sobre" className="hover:text-accent transition-colors hoverable w-fit">{t('about')}</Link>
              <Link href="/servicos" className="hover:text-accent transition-colors hoverable w-fit">{t('services')}</Link>
              <Link href="/cases" className="hover:text-accent transition-colors hoverable w-fit">{t('cases')}</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-6">{t('nav2')}</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <a href="mailto:contato@wexo.com.br" className="hover:text-accent transition-colors hoverable w-fit">contato@wexo.com.br</a>
              <Link href="/contato" className="hover:text-accent transition-colors hoverable w-fit">{t('startProject')}</Link>
            </nav>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-6">{t('nav3')}</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <a href="#" className="hover:text-accent transition-colors hoverable w-fit">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors hoverable w-fit">Instagram</a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Wexo. {t('copyright')}</p>
          <p className="mt-4 md:mt-0">{t('brand')}</p>
        </div>
      </div>
    </footer>
  );
}
