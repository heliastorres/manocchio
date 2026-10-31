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
- **Fase atual:** escopo, requisitos e plano prontos. Etapas 1 a 5 concluídas; a etapa 6 (design e acabamento) está feita e em PR, aguardando a sua aprovação visual; próxima é a etapa 7.
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
- **Etapa 5 (componentes e seções):** a home inteira está montada em `src/pages/index.astro`, com um componente por seção em `src/components/` (cabeçalho, chamada, apresentação, treinos, planos, anamnese, comunicação, resultados, inscrição, parceiros, locais, rodapé), mais o WhatsApp flutuante e o banner de cookies (só visual). Peças reutilizáveis: `Base.astro` (layout da página, em `src/layouts/`), `Secao.astro` (moldura das seções), `Botao.astro` e `Foto.astro` (foto otimizada, com `widths` e `sizes` por seção). Todo texto e link vem de `conteudo.ts`.
- **Verificação (etapa 5):** build, 18 testes e verificador de conteúdo passam. Conferi no HTML gerado que todo link do menu aponta para uma seção que existe, que há um só título principal (`h1`) e que nenhuma imagem está sem `alt`. Olhei capturas de tela no desktop (1280 px) e no celular (500 px).
- **Decisões (etapa 5):**
  - Botões verdes levam texto preto (texto branco sobre o verde `#80b522` tem pouco contraste). O verde escuro `#4e8221` pode levar texto branco.
  - Menu móvel feito com um botão e um pouco de JavaScript (abre, fecha com clique num item ou com Esc).
  - O UPX Sports, sem foto, mostra um bloco preto com o nome no lugar.
  - O Chrome não abre janelas com menos de 500 px de largura, então as capturas de celular foram feitas com 500 px. A conferência em 390 px fica para a etapa 7.
  - A foto do atleta de capacete teve a altura limitada (520 px) no desktop, porque ficava enorme.
- **Revisão de código da etapa 5 (revisor independente):** 2 achados importantes, corrigidos: o botão "Inscreva-se" do cabeçalho aparecia também no celular (a classe `inline-flex` vencia a `hidden`), e o banner de cookies cobria o botão do WhatsApp. Corrigidos também 6 menores: contorno de foco com contraste baixo, título "Redes sociais" que estava fixo no componente (agora em `conteudo.ts`), script do menu que quebraria se faltasse um elemento, foco perdido ao fechar o menu com Esc, selo "Recomendado" lido antes do nome do plano, e `sizes` da foto da inscrição. **Deixado como está:** os caminhos dos logos (`/logos/logo-cor.png` e `logo-branca.png`) estão escritos direto nos componentes, e não em `conteudo.ts`.
- **Problema aberto:** nas capturas de celular a foto do Nado Livre saiu em branco. É do teste (fotos abaixo da dobra só carregam quando a tela chega nelas e a captura não rola a página). No desktop ela aparece. Vale conferir de verdade no celular na etapa 7.
- **Referências pedidas para a etapa 6:** além da skill `design-taste-frontend`, usar como inspiração o site https://profitize.com.br/ (efeitos de cabeçalho e afins) e a ideia da skill `expo-liquid-glass` (efeito de vidro, "liquid glass"). Atenção: essa skill é para apps Expo/React Native (iOS 26), então não serve direto numa página Astro. Na web, o equivalente é feito com CSS (`backdrop-filter: blur()`, fundo translúcido, bordas finas de luz). Usar como referência de visual, adaptando.
- **Etapa 6 (design e acabamento):** a home foi redesenhada com a skill `design-taste-frontend`. Direção usada: "um motivo só". O arco da logo virou a **folha**, uma forma que se repete: foto da equipe na chamada (com uma folha verde lisa atrás), fotos das seções, cantos dos botões e marcadores de lista. Cada seção tem composição diferente da vizinha e um campo de cor próprio (preto, branco, verde, cinza, verde escuro). Títulos bem maiores (Roboto Condensed em maiúsculas, como a marca). Cabeçalho e aviso de cookies em **vidro** (translúcido com desfoque); no cabeçalho o vidro cresce com a rolagem, como no profitize.com.br. Entrada das partes ao rolar, foto da chamada com paralaxe leve, e nos **locais de treino** a foto muda ao apontar ou focar uma linha (no celular cada linha mostra a própria foto). Rodapé com o nome MANOCCHIO em largura total.
- **Decisões (etapa 6):**
  - Vidro foi pedido por você, mas a skill proíbe vidro por regra própria. Segui o seu pedido e deixei o aviso dela (glass) como conhecido. Sem o banner de cookies, o aviso some (só sobra o cabeçalho).
  - O inspetor da skill acusa "texto coberto" por causa do banner de cookies fixo, que passa por cima do texto até o visitante aceitar. Provei que é só isso: numa cópia do build sem o banner, 0 falhas.
  - Dois títulos foram **encurtados** para caber em duas linhas no celular: "Treinos práticos, simples e eficazes" e "Anamnese: primeiro contato". O texto abaixo continua o mesmo. O rótulo pequeno "Sobre a assessoria" (acima do título) foi removido.
  - O botão do WhatsApp mantém uma sombra leve, porque flutua sobre o conteúdo.
  - Não fiz o "elemento ao vivo" que a skill sugere (ex.: escolher modalidade) nem vídeo: fora do escopo do protótipo.
  - A pasta `.taste-skill/` (capturas e relatórios do inspetor) foi para o `.gitignore`: são arquivos gerados e pesados.
- **Verificação (etapa 6):** build, 18 testes e verificador de conteúdo passam. Inspetor da skill no build de produção: 0 falhas em 1440, 768 e 390 px; sobram só 2 avisos (vidro, sem vídeo). Olhei as capturas dos três tamanhos. Testei no Chrome que a foto dos locais troca e que o menu do celular abre.
- **Revisão de código da etapa 6 (revisor independente):** nenhum problema crítico; 6 importantes, todos corrigidos: contorno de foco invisível nos botões verdes sobre fundo escuro (agora anel de duas cores), `sticky` que nunca grudava (por causa do `overflow-hidden`, trocado por `overflow-clip`), esmaecimento das modalidades lento e "grudado" no toque, conteúdo que ficaria escondido se o JavaScript falhasse (rede de segurança de 3 s), e menu do celular sem rolagem em tela deitada. Também corrigidos menores: "eficaz" para "eficazes", semântica de lista da anamnese, foco depois de aceitar cookies, menu que fecha ao ampliar a janela, movimento reduzido nas novas transições.
- **Estado atual:** etapa 6 no branch `feature/etapa-6-design`, com PR aberto, ainda **não incorporado** à `main` (falta a sua aprovação visual). `npm run dev` mostra a home nova em `http://localhost:4321`.
- **Próximos passos (para a sessão nova):**
  - Ver a home no navegador (desktop e celular) e dizer se aprova ou o que mudar; depois incorporar o PR da etapa 6.
  - Etapa 7: responsividade e acessibilidade (conferir 390 px de verdade, contraste, teclado com Tab pela página toda, foto do Nado Livre no celular real).
  - Pendências antigas: apagar antes da entrega as páginas temporárias `teste-identidade.astro` e `teste-conteudo.astro`; pedir fotos melhores (Guilherme, UPX Sports) e logos em alta resolução; atualizar o `README.md` (ainda é o texto padrão do Astro); decidir sobre `@astrojs/check`.
  - Etapa 9: conferir de novo o `sharp` como dependência de desenvolvimento e decidir se o link público será publicado (exige autorização).
