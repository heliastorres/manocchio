# Diário do projeto manocchio

Diário de bordo do projeto. Quem escreve é o Claude, ao final de cada sessão, para que o trabalho possa ser retomado depois.

## Levantamento do site atual (manocchiosports.com)

- **Tecnologia do site atual:** WordPress (imagens em `wp-content`).
- **Fontes:** Roboto e Roboto Condensed (Google Fonts).
- **Cores principais:** verde `#80b522`, verde escuro `#4e8221`, preto `#141414`, cinzas e branco.
- **Logos:** versão colorida e versão branca (rodapé), no servidor do próprio site.
- **Páginas (todas respondem com 200, exceto redirecionamentos 301):**
  - Início, Sobre (História, Guilherme Manocchio), Treinamento (Metodologia, TrainingPeaks, a distância, presenciais: Nado Livre Mercês, Acquafitness Três Marias, UPX Sports), Dicas & Fotos, Parceiros & Indicações, Contato, Política de privacidade.
  - Páginas de treino online: Triathlon, Corrida, Natação (link externo), Ciclismo, Duathlon.
- **Seções da home (MVP):** cabeçalho, chamada principal, apresentação, treinos online, planos (Básico e Prime), anamnese, treinamento e comunicação, resultados, inscrição, parceiros, locais de treino em Curitiba, rodapé.
- **Limite do levantamento:** li o conteúdo da home em detalhe. Das outras páginas, verifiquei só que existem; o conteúdo delas ainda não foi lido.

## Visão geral do projeto

- **O que é:** repaginação e reestruturação do site de um possível cliente, que hoje está desatualizado. A identidade visual atual deve ser mantida, e as cores finais devem ser fiéis às que serão usadas.
- **Tipo de entrega:** protótipo (MVP) para apresentar ao possível cliente.
- **Problema que resolve:** o cliente está insatisfeito com a página atual, que está obsoleta.
- **Fase atual:** escopo, requisitos e plano prontos. Etapas 1 (base Astro + Tailwind) e 2 (identidade visual) concluídas; próxima é a etapa 3 (imagens).
- **Decisões confirmadas:**
  - Tecnologia: **Astro + Tailwind CSS**, pensando em crescer até produção.
  - MVP: **apenas a página inicial**. As outras páginas do site atual servem de referência, mas não entram no protótipo.
  - Seções da home incluídas no MVP: as 12 seções listadas no levantamento acima.
  - Conteúdo: mesmas frases do site atual (inspiradas), mesmas logos, paleta e fotos. As fotos podem ser tratadas para ficar mais profissionais.
  - Fora do MVP: login, integrações e painel de administração.
  - Entrega: link de visualização (ex.: rodando localmente e acessível pelo link).
  - Botão de inscrição leva para o WhatsApp (não há formulário).
  - Plano de execução criado em `PLANO.md` (9 etapas).
  - Decisão pendente: publicar em hospedagem gratuita para o link ficar acessível fora do computador (exige autorização).
  - Critérios de qualidade: design moderno, skill `design-taste-frontend`, responsivo, acessível.
- **Pontos em aberto:** publicação pública (etapa 9 do plano) e a decisão sobre o git dos arquivos `DIARIO.md` e `CLAUDE.md`.

---

## 2026-10-31
- **O que foi feito:** criados o `CLAUDE.md` e o `DIARIO.md` na raiz do projeto. Definido o fluxo de trabalho entre sessões. Limpas as sessões antigas da pasta de histórico do Claude (a pasta `memory/` foi mantida). Repositório git iniciado (branch `main`), primeiro commit feito e projeto enviado ao GitHub em um repositório privado: `github.com/heliastorres/manocchio`.
- **Decisões:**
  - O fluxo é: ao fim de cada sessão, pedir "atualiza o diário"; depois abrir uma sessão nova (sem `/compact`) e dizer "retomar projeto".
  - `DIARIO.md`, `CLAUDE.md` e a pasta de skills ficam no `.gitignore`, por escolha do usuário. Isso significa que eles não sobem para o GitHub e não aparecem em um clone novo do repositório.
  - O repositório é **privado**, criado com o `gh` (CLI do GitHub).
- **Problemas:**
  - O envio por SSH falhou com `Permission denied (publickey)`, porque não há chave SSH configurada nesta máquina. Resolvido trocando a conexão para HTTPS (`gh auth setup-git`), que usa o login do `gh`.
- **Visão geral e escopo do protótipo:** definidos e registrados na seção "Visão geral do projeto" acima.
- **Requisitos e plano:** requisitos funcionais (RF1 a RF6) e não funcionais (RNF1 a RNF6) foram discutidos e aprovados. O plano de execução com 9 etapas está em `PLANO.md`, ainda sem commit.
- **Etapa 1 (base do projeto):** projeto Astro criado na raiz, com TypeScript estrito e Tailwind 4 (via `astro add tailwind`). Nome do pacote: `manocchio`. A página inicial importa o CSS do Tailwind. Testado: `npm run dev` responde HTTP 200 e `npm run build` passa.
- **Branch:** trabalho feito em `feature/etapa-1-base-astro`, com PR para a `main`.
- **Problemas:** o instalador do Astro criou a pasta `extinct-equinox/` em vez de usar a raiz. Resolvido movendo os arquivos para a raiz e apagando a pasta (que tinha um repositório git próprio, criado pelo instalador, sem nada importante). O `.gitignore` foi unificado.
- **Etapa 1 verificada:** instalação limpa (`npm ci`) e build passam, TypeScript estrito ativo, árvore git limpa. PR #1 já incorporado à `main`.
- **Etapa 2 (identidade visual):** cores (verde, verde escuro, preto, branco e 4 cinzas) e fontes (Roboto e Roboto Condensed) definidas num só lugar, `src/styles/global.css`, e viram classes do Tailwind (`bg-verde`, `text-preto`, `font-titulo`...). Logos colorida e branca baixadas para `public/logos/`. Página de teste em `/teste-identidade`.
- **Decisões (etapa 2):**
  - Fontes instaladas pelo pacote `@fontsource` (hospedadas no próprio site) em vez do link do Google Fonts: mais rápido e sem enviar dados dos visitantes ao Google.
  - Cores com nomes em português, como o resto do projeto.
- **Problemas (etapa 2):** as logos do site atual têm só 150x141 px, pequenas para telas grandes ou de alta densidade. Para usá-las bem maiores, vamos precisar de versões melhores (pedir ao cliente) ou redesenhá-las. O azul `#003388` do levantamento inicial não foi encontrado no site atual (nem no HTML, nem no CSS, nem na logo), então foi **retirado do escopo das cores** por decisão do usuário. A paleta é verde, verde escuro, preto, branco e cinzas.
- **Estado atual:** etapas 1 e 2 prontas. Verificado por build e por checagem das classes no CSS gerado; ainda não olhei a página de teste em um navegador.
- **Próximos passos:**
  - Abrir `/teste-identidade` no navegador (`npm run dev`) e conferir cores, fontes e logos.
  - Etapa 3 do `PLANO.md`: imagens (baixar, tratar e converter para WebP).
  - Apagar `src/pages/teste-identidade.astro` antes da entrega (é só uma página temporária).
  - Atualizar o `README.md` (ainda é o texto padrão do Astro).
  - Decidir depois se o link público será publicado (etapa 9, exige autorização).
  - Decidir se `DIARIO.md` e `CLAUDE.md` continuam fora do GitHub (ver aviso nas decisões).
