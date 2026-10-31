// Confere o arquivo de conteúdo da home (src/data/conteudo.ts).
//
// Uso:  npm run verificar:conteudo      (testes do próprio verificador: npm test)
//
// O que confere:
//  - nenhum texto vazio e nenhuma lista vazia
//  - nenhum texto-modelo do tema antigo (ex.: "email@example.com", "Text Hover")
//  - todo link é válido, QUALQUER que seja o nome do campo: qualquer texto que comece
//    com https://, http://, mailto:, tel: ou # é tratado como link (e todo campo `href` também)
//      · https://... com domínio de verdade (precisa ter um ponto)
//      · mailto:... com e-mail válido
//      · tel:+... com código do país
//      · #id que aponta para uma seção que existe
//  - todo `id` de seção é único
//  - toda foto citada em `arquivo` existe na pasta de fotos
//  - todo campo `texto` é uma lista de parágrafos (sempre o mesmo formato)
//  - o número do WhatsApp (com 55) bate com o link do WhatsApp
//
// Observação: a mensagem pronta do WhatsApp termina em "..." de propósito
// (a pessoa completa com a modalidade), por isso "..." não é tratado como texto-modelo.

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const MODELOS_PROIBIDOS = [
  /example\.(com|org)/i,
  /\+12 34 56 78/,
  /lorem ipsum/i,
  /text hover/i,
  /your address/i,
  /\bTODO\b/,
];

const PARECE_LINK = /^(https?:|mailto:|tel:|#)/;

/** Visita todos os valores (textos, listas e objetos), do mais externo ao mais interno. */
function percorrer(valor, caminho, visitar) {
  visitar(valor, caminho);
  if (Array.isArray(valor)) {
    valor.forEach((item, i) => percorrer(item, `${caminho}[${i}]`, visitar));
  } else if (valor && typeof valor === 'object') {
    for (const [chave, item] of Object.entries(valor)) {
      percorrer(item, `${caminho}.${chave}`, visitar);
    }
  }
}

/** Valida um link e devolve o problema encontrado (ou null se estiver certo). */
function problemaDoLink(texto) {
  if (texto.startsWith('mailto:')) {
    return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto) ? null : `e-mail inválido (${texto})`;
  }
  if (texto.startsWith('tel:')) {
    return /^tel:\+\d{10,15}$/.test(texto) ? null : `telefone inválido, falta o + e o código do país (${texto})`;
  }
  try {
    const url = new URL(texto);
    if (url.protocol !== 'https:') return `o link deveria ser https (${texto})`;
    if (!url.hostname.includes('.')) return `domínio sem ponto, parece incompleto (${texto})`;
    return null;
  } catch {
    return `link inválido (${texto})`;
  }
}

/** Devolve a lista de problemas encontrados (vazia = tudo certo). */
export function verificar(conteudo, pastaFotos) {
  const erros = [];
  const ids = [];
  const ancoras = [];

  percorrer(conteudo, 'conteudo', (valor, caminho) => {
    // Listas vazias deixariam uma seção sem conteúdo.
    if (Array.isArray(valor) && valor.length === 0) {
      erros.push(`${caminho}: lista vazia`);
      return;
    }

    // O campo "texto" tem sempre o mesmo formato: lista de parágrafos.
    if (valor && typeof valor === 'object' && !Array.isArray(valor) && 'texto' in valor) {
      if (!Array.isArray(valor.texto)) {
        erros.push(`${caminho}.texto: deve ser uma lista de parágrafos, ex.: ['primeiro', 'segundo']`);
      }
    }

    if (typeof valor !== 'string') return;
    const texto = valor;

    if (texto.trim() === '') erros.push(`${caminho}: texto vazio`);

    for (const modelo of MODELOS_PROIBIDOS) {
      if (modelo.test(texto)) erros.push(`${caminho}: texto-modelo do tema antigo (${modelo})`);
    }

    if (caminho.endsWith('.id')) ids.push({ id: texto, caminho });

    if (caminho.endsWith('.href') || PARECE_LINK.test(texto)) {
      if (texto.startsWith('#')) {
        ancoras.push({ id: texto.slice(1), caminho });
      } else {
        const problema = problemaDoLink(texto);
        if (problema) erros.push(`${caminho}: ${problema}`);
      }
    }

    if (caminho.endsWith('.arquivo') && !existsSync(join(pastaFotos, `${texto}.webp`))) {
      erros.push(`${caminho}: foto não encontrada (${texto}.webp em ${pastaFotos})`);
    }
  });

  const vistos = new Set();
  for (const { id, caminho } of ids) {
    if (vistos.has(id)) erros.push(`${caminho}: id repetido (${id})`);
    vistos.add(id);
  }
  for (const { id, caminho } of ancoras) {
    if (!vistos.has(id)) erros.push(`${caminho}: a âncora #${id} não aponta para nenhuma seção`);
  }

  // O número do WhatsApp precisa ter o código do país (55) e aparecer no link wa.me.
  const whatsapp = conteudo?.contato?.whatsapp;
  if (whatsapp) {
    if (!/^55\d{10,11}$/.test(whatsapp.numero ?? '')) {
      erros.push(`conteudo.contato.whatsapp.numero: deve ter 55 + DDD + número, só dígitos (${whatsapp.numero})`);
    } else if (!String(whatsapp.href).startsWith(`https://wa.me/${whatsapp.numero}`)) {
      erros.push('conteudo.contato.whatsapp.href: não usa o mesmo número de contato.whatsapp.numero');
    }
  }

  return erros;
}

// Só roda sozinho quando chamado pelo terminal (não quando importado por testes).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let conteudo;
  try {
    ({ conteudo } = await import('../src/data/conteudo.ts'));
  } catch (erro) {
    console.error(`Não consegui carregar src/data/conteudo.ts: ${erro.message}`);
    process.exit(1);
  }

  const erros = verificar(conteudo, 'src/assets/fotos');
  if (erros.length > 0) {
    console.error(`${erros.length} problema(s) no conteúdo:\n- ${erros.join('\n- ')}`);
    process.exit(1);
  }
  console.log('Conteúdo ok: textos, links, âncoras e fotos conferidos.');
}
