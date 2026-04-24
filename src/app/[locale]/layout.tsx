import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { Montserrat, DM_Sans } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import IntroScreen from '@/components/IntroScreen';

const montserrat = Montserrat({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({locale});
 
  return (
    <html lang={locale}>
      <body className={`antialiased selection:bg-accent selection:text-white ${montserrat.variable} ${dmSans.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <IntroScreen />
            <CustomCursor />
            <Header />
            <div className="pt-24 min-h-screen">
              {children}
            </div>
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
