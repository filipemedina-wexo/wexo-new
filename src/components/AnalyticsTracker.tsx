'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * Componente para rastreamento global de interações.
 * Captura cliques em links, botões e elementos interativos para enviar eventos personalizados ao GA4.
 */
export default function AnalyticsTracker() {
  useEffect(() => {
    // Captura e persiste UTMs se existirem na URL
    const urlParams = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    utms.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
      }
    });

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Busca o elemento interativo mais próximo (link, botão ou role="button")
      const interactiveElement = target.closest('a, button, [role="button"]');
      
      if (interactiveElement) {
        const text = interactiveElement.textContent?.trim() || 'Sem texto';
        const id = interactiveElement.id || 'Sem ID';
        const className = interactiveElement.className || 'Sem classes';
        const href = (interactiveElement as HTMLAnchorElement).href;
        const tag = interactiveElement.tagName.toLowerCase();

        // Envia o evento para o GA4
        sendGAEvent('event', 'user_click', {
          event_category: 'Interação',
          event_label: text,
          element_tag: tag,
          element_id: id,
          element_classes: className,
          link_url: href || 'N/A',
          page_path: window.location.pathname,
          page_title: document.title
        });
      }
    };

    // Adiciona o listener global
    window.addEventListener('click', handleGlobalClick);
    
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}
