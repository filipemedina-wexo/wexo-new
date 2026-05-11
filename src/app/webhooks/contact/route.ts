import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'API de contato ativa', method: 'POST required' });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Envia para o webhook de produção e de teste simultaneamente
    const urls = [
      'https://prospera-n8n.34eiwn.easypanel.host/webhook/novo-site-wexo',
      'https://prospera-n8n.34eiwn.easypanel.host/webhook-test/novo-site-wexo'
    ];

    const fetchPromises = urls.map(url => 
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    );

    // Usa allSettled para que, se o teste falhar, a produção não seja afetada (e vice-versa)
    const results = await Promise.allSettled(fetchPromises);
    
    // Pega o resultado do webhook de produção (índice 0) para o retorno oficial
    const prodResult = results[0];
    
    if (prodResult.status === 'rejected') {
      console.error('Erro de rede ao chamar o webhook n8n de produção:', prodResult.reason);
      return NextResponse.json({ 
        error: 'Erro de conexão com o webhook principal', 
        details: prodResult.reason.message 
      }, { status: 500 });
    }

    const response = prodResult.value;
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro no webhook n8n de produção:', errorText);
      return NextResponse.json({ 
        error: 'Erro retornado pelo n8n principal', 
        n8n_status: response.status,
        n8n_response: errorText 
      }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erro na API de contato:', error);
    return NextResponse.json({ 
      error: 'Erro interno no servidor do site', 
      details: error.message 
    }, { status: 500 });
  }
}
