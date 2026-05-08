import ContatoPageClient from './ContatoPageClient';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.contact' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

import { Suspense } from 'react';

export default function ContatoPage() {
  return (
    <Suspense>
      <ContatoPageClient />
    </Suspense>
  );
}
