import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Aplica o middleware em todas as rotas exceto arquivos estáticos e APIs internas
  matcher: ['/((?!api|webhooks|_next|_vercel|.*\\..*).*)']
};
