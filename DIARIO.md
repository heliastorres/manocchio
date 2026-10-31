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
- **Fase atual:** escopo, requisitos e plano prontos. Etapas 1 (base Astro + Tailwind), 2 (identidade visual), 3 (imagens) e 4 (conteúdo) concluídas; próxima é a etapa 5 (componentes).
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
- **Pontos em aberto:** publicação pública (etapa 9 do plano). (A decisão sobre o git do `DIARIO.md` e do `CLAUDE.md` foi resolvida: os dois agora são versionados.)

---

## 2026-10-31
- **O que foi feito:** criados o `CLAUDE.md` e o `DIARIO.md` na raiz do projeto. Definido o fluxo de trabalho entre sessões. Limpas as sessões antigas da pasta de histórico do Claude (a pasta `memory/` foi mantida). Repositório git iniciado (branch `main`), primeiro commit feito e projeto enviado ao GitHub em um repositório privado: `github.com/heliastorres/manocchio`.
- **Decisões:**
  - O fluxo é: ao fim de cada sessão, pedir "atualiza o diário"; depois abrir uma sessão nova (sem `/compact`) e dizer "retomar projeto".
  - Inicialmente `DIARIO.md`, `CLAUDE.md` e a pasta de skills ficavam no `.gitignore`. **Depois mudou:** o `DIARIO.md` e o `CLAUDE.md` passaram a ser versionados (assim um clone novo ou outro computador mantém as regras e o histórico). Só as skills (`.agents/`, `.claude/skills/`) continuam fora do git.
  - O repositório é **privado**, criado com o `gh` (CLI do GitHub).
- **Problemas:**
  - O envio por SSH falhou com `Permission denied (publickey)`, porque não há chave SSH configurada nesta máquina. Resolvido trocando a conexão para HTTPS (`gh auth setup-git`), que usa o login do `gh`.
- **Visão geral e escopo do protótipo:** definidos e registrados na seção "Visão geral do projeto" acima.
- **Requisitos e plano:** requisitos funcionais (RF1 a RF6) e não funcionais (RNF1 a RNF6) foram discutidos e aprovados. O plano de execução com 9 etapas está em `PLANO.md` (commitado).
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
- **Etapa 4 (conteúdo):** todos os textos, links e nomes de fotos da home estão em um único arquivo, `src/data/conteudo.ts`. Os componentes da etapa 5 só vão ler esses dados. Os textos mantêm as ideias do site atual, com redação corrigida e mais clara (e sem erros de digitação do original). Não inventei preços, números nem promessas. Página temporária `/teste-conteudo` mostra tudo, para você revisar os textos no navegador.
- **Verificação (etapa 4):** o script `npm run verificar:conteudo` confere que não há texto vazio, nem texto-modelo do tema antigo, que todo link é válido, que toda âncora do menu aponta para uma seção e que toda foto citada existe. Testei o script com 8 defeitos propositais e ele pegou todos (isso também revelou um bug do próprio script, já corrigido). Testei também os 11 links externos: todos respondem. O `bit.ly/MTTNAT23` devolve 403 para robôs, mas com navegador redireciona para o sistema de inscrição.
- **Decisões (etapa 4):**
  - O telefone e o e-mail do cabeçalho do site atual (`+12 34 56 78`, `email@example.com`) são texto-modelo do tema WordPress, não dados reais: ignorados. Os dados reais vêm do rodapé.
  - O botão de WhatsApp usa `wa.me` (funciona no celular e no computador, ao contrário do `web.whatsapp.com` do site atual, que só funciona no computador), com a mensagem pronta do site atual.
  - Links para páginas fora do protótipo (modalidades, locais, política de privacidade) apontam para o site atual. Quando o site novo estiver completo, basta trocar em `conteudo.ts`.
  - Os planos Básico e Prime só têm a descrição do site atual. Os valores ficam nas páginas de inscrição de cada modalidade, então os botões de plano levam à seção de treinos.
  - Descartei o bloco "Treinamento presencial" (Triathlon/Corrida/Natação) da home atual: não está nas 12 seções do escopo, e os locais de treino já cobrem o assunto.
  - O menu tem 7 itens por âncora: Sobre, Treinos, Planos, Como funciona, Resultados, Locais e Contato.
- **Revisão de código da etapa 4 (revisor independente):** nenhum problema crítico. Corrigido, cada item com teste que falhava antes:
  - O verificador só conferia campos chamados `href`: agora confere qualquer texto que pareça link, aceita só domínios com ponto e checa o número do WhatsApp contra o link.
  - Listas vazias passavam sem aviso: agora são erro.
  - O campo `texto` ora era texto, ora lista: agora é sempre lista de parágrafos (e o verificador exige). Isso evita erro nos componentes da etapa 5.
  - O botão dos planos dizia "Ver valores", mas a seção de destino não mostra valores: virou "Escolher modalidade".
  - Link da política de privacidade estava repetido: agora é definido uma vez só.
  - Textos do logo e de acessibilidade (menu, rodapé, banner de cookies) entraram no arquivo de dados, para os componentes não terem texto fixo.
  - Os 8 testes do verificador que eu fazia à mão viraram testes automáticos (`npm test`, 18 testes ao todo).
- **Anotado, sem mexer (menores):** o verificador compara o fim do caminho para achar `id` e `arquivo` (basta hoje); `cookies.botao` e `site.idioma` são textos simples e não `{rotulo, href}`.
- **Limite:** o TypeScript não está instalado no projeto, então a conferência de tipos só acontece no editor (VS Code), não por comando. Vale decidir na etapa 7 ou 8 se adicionamos `@astrojs/check`.
- **Fluxo de trabalho adotado (decisões):**
  - Cada etapa tem a sua branch (`feature/etapa-N-...`), é verificada, revisada, vai para a `main` por Pull Request (PR) e a branch é apagada. Mudanças só de documentação (`DIARIO.md`, `CLAUDE.md`) vão direto na `main`.
  - Skills usadas a partir da etapa 3: `executing-plans`, `verification-before-completion` e `requesting-code-review` (revisor independente antes de cada PR). Registrado no `CLAUDE.md`. Outras entram só na etapa em que fazem sentido (`design-taste-frontend` na 6, `run` na 7, `security-review` e `finishing-a-development-branch` na 9, `systematic-debugging` quando algo quebrar).
  - Adaptações da skill `executing-plans`: uso branch comum em vez de *worktree* (cópia de trabalho separada), porque o projeto tem um só autor; o `DIARIO.md` faz o papel do livro de registro da skill; o `PLANO.md` não está no formato dela, então os testes foram escritos onde cabiam (scripts de verificação), e não em todo passo.
- **Estado atual:** etapas 1 a 4 prontas, revisadas e na `main` (PRs #1 a #6 incorporados, último merge `d3fd7d9`). Árvore de trabalho limpa. Etapa 4 verificada por 18 testes, pelo verificador de conteúdo, pelo build e pelo teste dos links.
- **Próximos passos (para a sessão nova):**
  - Dizer "retomar projeto" e, depois do resumo, pedir a Etapa 5.
  - Antes da Etapa 5, ler os textos em `/teste-conteudo` (`npm run dev`, abrir `http://localhost:4321/teste-conteudo`) e pedir as mudanças de redação que quiser. Mudar texto depois dos componentes dá mais trabalho.
  - Etapa 5 do `PLANO.md` (componentes e seções): ler tudo de `src/data/conteudo.ts` e das fotos via `obterFoto()` (`src/data/fotos.ts`). Pontos para lembrar:
    - `texto` é sempre lista de parágrafos.
    - `locais.itens[0]` (UPX Sports) tem `imagem: null`: o componente precisa tratar a falta de foto.
    - Definir `widths` e `sizes` das imagens por seção (a chamada principal ocupa a tela toda e precisa de larguras maiores que as da página de teste).
    - Os textos de acessibilidade (menu, rodapé, cookies, logo) estão em `conteudo.acessibilidade`, `cabecalho.logo`, `rodape` e `cookies`.
    - Rodar `npm run verificar:conteudo` e `npm test` sempre que mexer em `conteudo.ts`.
  - Apagar antes da entrega as duas páginas temporárias: `src/pages/teste-identidade.astro` e `src/pages/teste-conteudo.astro`.
  - Pedir ao cliente (ou conferir) fotos melhores: Guilherme, UPX Sports e logos em alta resolução.
  - Atualizar o `README.md` (ainda é o texto padrão do Astro).
  - Etapa 7 ou 8: decidir se instalamos o `@astrojs/check` para conferir tipos por comando.
  - Etapa 9: conferir de novo o `sharp` como dependência de desenvolvimento e decidir se o link público será publicado (exige autorização).
