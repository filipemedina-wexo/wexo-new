import ContatoPageClient from './ContatoPageClient';

import { Suspense } from 'react';

export default function ContatoPage() {
  return (
    <Suspense>
      <ContatoPageClient />
    </Suspense>
  );
}
