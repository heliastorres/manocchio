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
- **Fase atual:** escopo, requisitos e plano prontos. Etapas 1 (base Astro + Tailwind), 2 (identidade visual) e 3 (imagens) concluídas; próxima é a etapa 4 (conteúdo).
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
- **Etapa 3 (imagens):** 6 fotos do site atual tratadas e convertidas para WebP em `src/assets/fotos/` (equipe de ciclismo, atleta de capacete verde, duas piscinas, treino de natação e retrato do Guilherme). Total de 1,7 MB, contra 5,5 MB das originais. O tratamento (recorte, brilho, contraste, cor) é feito pelo script `scripts/tratar-imagens.mjs`, que pode ser repetido. As fotos aparecem na página `/teste-identidade`.
- **Decisões (etapa 3):**
  - As fotos originais ficam fora do git (são pesadas). O script lista de onde baixá-las.
  - Fotos ficam em `src/assets/` e não em `public/`, para o Astro gerar versões menores sozinho (de 12 a 150 KB, conforme a tela). O build confirmou.
  - O `sharp` (biblioteca de imagens) foi declarado como dependência de desenvolvimento, porque o script depende dele.
  - Tratamento leve: corte do asfalto vazio na foto da equipe e ajuste suave de contraste e cor, sem mudar o aspecto das fotos.
  - **Descartadas:** o banner de parcerias (foto de banco de imagens, com escurecimento já embutido) e o gráfico da pista UPX (material de divulgação com texto).
- **Problemas (etapa 3):** a foto do Guilherme tem só 418 px de largura. Não foi ampliada, para não borrar, então só serve em tamanho pequeno. Se for usada grande, precisa de uma foto melhor. Os locais de treino da seção 11 só têm foto de duas piscinas (Nado Livre e Três Marias); falta foto do UPX Sports.
- **Revisão de código da etapa 3 (feita por um revisor independente):** nenhum problema crítico. Achados tratados:
  - Bug no script: fotos giradas pela câmera (marca de orientação) teriam largura e altura trocadas no recorte. Provado com um teste e corrigido. A primeira correção recodificava o JPEG duas vezes (piorava a qualidade); a versão final usa um passo intermediário sem perda, e as 6 imagens saem idênticas às anteriores.
  - Script agora avisa quando a pasta ou uma foto não existe, trata cada foto separadamente e termina com erro se alguma falhar. Atalho: `npm run imagens -- <pasta-dos-originais> <pasta-de-saida>`.
  - `sharp` como dependência de desenvolvimento: testei um build só com dependências de produção e funcionou (17 imagens geradas). Mantido, mas conferir de novo na etapa 9 (publicação).
  - Anotado para a etapa 5: na home de verdade, `widths` e `sizes` das imagens precisam ser definidos por seção (a foto da chamada principal ocupa a tela toda e precisa de larguras maiores que as da página de teste).
- **Estado atual:** etapas 1, 2 e 3 prontas e revisadas. Verificado por build, por prévia visual das imagens e por revisão de código.
- **Próximos passos:**
  - Etapa 4 do `PLANO.md`: conteúdo (textos e links em arquivo de dados).
  - A partir da etapa 3 o fluxo é: `executing-plans`, `verification-before-completion` e `requesting-code-review` antes de cada PR (registrado no `CLAUDE.md`).
  - Pedir ao cliente (ou conferir) fotos melhores: Guilherme, UPX Sports e logos em alta resolução.
  - Apagar `src/pages/teste-identidade.astro` antes da entrega (é só uma página temporária).
  - Atualizar o `README.md` (ainda é o texto padrão do Astro).
  - Decidir depois se o link público será publicado (etapa 9, exige autorização).
  - Decidir se `DIARIO.md` e `CLAUDE.md` continuam fora do GitHub (ver aviso nas decisões).
