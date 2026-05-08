import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // O webhook é chamado pelo servidor (Node.js), o que evita erros de CORS
    const response = await fetch('https://prospera-n8n.34eiwn.easypanel.host/webhook/novo-site-wexo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro no webhook n8n:', errorText);
      return NextResponse.json({ error: 'Erro ao enviar para o webhook' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro na API de contato:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
