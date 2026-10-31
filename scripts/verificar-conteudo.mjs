// Confere o arquivo de conteúdo da home (src/data/conteudo.ts).
//
// Uso:  npm run verificar:conteudo
//
// O que confere:
//  - nenhum texto vazio
//  - nenhum texto-modelo do tema antigo (ex.: "email@example.com", "Text Hover")
//  - todo `href` é válido: https://..., mailto:..., tel:+... ou uma âncora (#id) que existe
//  - todo `id` de seção é único
//  - toda foto citada em `arquivo` existe na pasta de fotos

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const MODELOS_PROIBIDOS = [
  /example\.com/i,
  /\+12 34 56 78/,
  /lorem ipsum/i,
  /text hover/i,
  /your address/i,
  /\bTODO\b/,
];

function percorrer(valor, caminho, visitar) {
  if (typeof valor === 'string') {
    visitar(valor, caminho);
  } else if (Array.isArray(valor)) {
    valor.forEach((item, i) => percorrer(item, `${caminho}[${i}]`, visitar));
  } else if (valor && typeof valor === 'object') {
    for (const [chave, item] of Object.entries(valor)) {
      percorrer(item, `${caminho}.${chave}`, visitar);
    }
  }
}

/** Devolve a lista de problemas encontrados (vazia = tudo certo). */
export function verificar(conteudo, pastaFotos) {
  const erros = [];
  const ids = [];
  const ancoras = [];

  percorrer(conteudo, 'conteudo', (texto, caminho) => {
    if (texto.trim() === '') erros.push(`${caminho}: texto vazio`);

    for (const modelo of MODELOS_PROIBIDOS) {
      if (modelo.test(texto)) erros.push(`${caminho}: texto-modelo do tema antigo (${modelo})`);
    }

    if (caminho.endsWith('.id')) ids.push({ id: texto, caminho });

    if (caminho.endsWith('.href')) {
      if (texto.startsWith('#')) {
        ancoras.push({ id: texto.slice(1), caminho });
      } else if (texto.startsWith('mailto:')) {
        if (!/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) erros.push(`${caminho}: e-mail inválido (${texto})`);
      } else if (texto.startsWith('tel:')) {
        if (!/^tel:\+\d{10,15}$/.test(texto)) erros.push(`${caminho}: telefone inválido (${texto})`);
      } else {
        try {
          if (new URL(texto).protocol !== 'https:') erros.push(`${caminho}: o link deveria ser https (${texto})`);
        } catch {
          erros.push(`${caminho}: link inválido (${texto})`);
        }
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
