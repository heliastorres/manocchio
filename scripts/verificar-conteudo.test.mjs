// Testes do verificador de conteúdo. Rodar com:  npm test
//
// Cada teste estraga UM detalhe dos dados reais e confere se o verificador reclama.
// Assim sabemos que ele realmente pega esse tipo de erro (e não só "passa sempre").

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verificar } from './verificar-conteudo.mjs';
import { conteudo } from '../src/data/conteudo.ts';

const FOTOS = 'src/assets/fotos';
const copia = () => structuredClone(conteudo);

/** Estraga os dados com `quebrar` e exige que o verificador aponte pelo menos um problema. */
function exigeErro(descricao, quebrar, trecho) {
  test(descricao, () => {
    const c = copia();
    quebrar(c);
    const erros = verificar(c, FOTOS);
    assert.ok(erros.length > 0, 'o verificador deixou o defeito passar');
    if (trecho) {
      assert.ok(
        erros.some((e) => e.includes(trecho)),
        `esperava um erro com "${trecho}", mas vieram:\n${erros.join('\n')}`,
      );
    }
  });
}

test('os dados reais passam sem nenhum problema', () => {
  assert.deepEqual(verificar(copia(), FOTOS), []);
});

// --- defeitos básicos
exigeErro('texto vazio', (c) => { c.chamada.titulo = '  '; }, 'texto vazio');
exigeErro('texto-modelo do tema antigo', (c) => { c.contato.email.rotulo = 'email@example.com'; }, 'texto-modelo');
exigeErro('link http (inseguro)', (c) => { c.treinos.modalidades[0].href = 'http://x.com'; }, 'https');
exigeErro('link malformado', (c) => { c.treinos.modalidades[0].href = 'manocchiosports.com/x'; }, 'inválido');
exigeErro('telefone sem +', (c) => { c.contato.telefones[0].href = 'tel:4130185550'; }, 'telefone inválido');
exigeErro('âncora que não existe', (c) => { c.cabecalho.menu[0].href = '#nao-existe'; }, '#nao-existe');
exigeErro('id repetido', (c) => { c.planos.id = 'treinos'; }, 'id repetido');
exigeErro('foto inexistente', (c) => { c.chamada.imagem.arquivo = 'foto-que-nao-existe'; }, 'foto não encontrada');
exigeErro('alt vazio', (c) => { c.chamada.imagem.alt = ''; }, 'texto vazio');

// --- achados da revisão de código (a chave do link não precisa se chamar "href")
exigeErro('link http escondido em uma chave que não é href', (c) => { c.contato.email.url = 'http://x.com'; }, 'https');
exigeErro('âncora escondida em uma chave que não é href', (c) => { c.chamada.botaoSecundario.alvo = '#nao-existe'; }, '#nao-existe');
exigeErro('endereço de site sem ponto no domínio', (c) => { c.treinos.modalidades[0].href = 'https://manocchio'; }, 'domínio');

// --- listas vazias deixariam a seção sem conteúdo
exigeErro('lista de parágrafos vazia', (c) => { c.anamnese.texto = []; }, 'lista vazia');
exigeErro('lista de modalidades vazia', (c) => { c.treinos.modalidades = []; }, 'lista vazia');

// --- o campo "texto" tem sempre o mesmo formato: lista de parágrafos
exigeErro('texto como string em vez de lista', (c) => { c.chamada.texto = 'um parágrafo só'; }, 'lista de parágrafos');

// --- o número do WhatsApp tem de bater com o link
exigeErro('número do WhatsApp sem o código do país', (c) => { c.contato.whatsapp.numero = '41991095550'; }, 'whatsapp');
exigeErro('número do WhatsApp diferente do link', (c) => { c.contato.whatsapp.numero = '5511999999999'; }, 'whatsapp');
