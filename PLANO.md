# Plano de execução: protótipo da página inicial (manocchio)

Este plano segue os requisitos e as decisões registradas no `DIARIO.md`. Cada etapa termina com algo que dá para verificar, e o commit é feito ao final de cada uma.

**Stack:** Astro + Tailwind CSS. Gerenciador de pacotes: npm.

## Etapa 1: Base do projeto
- Criar o projeto Astro na pasta atual, com TypeScript estrito e Tailwind.
- Instalar as dependências (`npm install`) e confirmar que `npm run dev` sobe a página padrão.
- **Verificação:** a página abre em `localhost`.
- **Commit:** "Base do projeto com Astro e Tailwind".

## Etapa 2: Identidade visual
- Definir as cores (verde `#80b522`, verde escuro `#4e8221`, preto `#141414`, cinzas e branco) e as fontes (Roboto e Roboto Condensed) em um único lugar, como variáveis do tema Tailwind.
- Baixar as logos (colorida e branca) para a pasta `public/`.
- **Verificação:** uma página de teste mostra as cores, fontes e logos corretas.
- **Commit:** "Tokens de cor, fontes e logos".

## Etapa 3: Imagens
- Baixar as fotos principais do site atual.
- Tratar as fotos (recorte, brilho, contraste) para deixar o visual mais profissional, como você pediu.
- Gerar versões otimizadas (WebP) para carregar rápido.
- **Verificação:** tamanho de cada imagem razoável, sem perda visível de qualidade.
- **Commit:** "Imagens otimizadas da home".

## Etapa 4: Conteúdo
- Reunir em um arquivo de dados todos os textos da home, com as mesmas frases do site atual, inspiradas e não copiadas literalmente.
- Os links (WhatsApp, redes sociais, endereço, telefones) também ficam nesse arquivo, para serem alterados em um só lugar.
- **Verificação:** nenhum texto ou link fixo dentro dos componentes.
- **Commit:** "Conteúdo da home em arquivo de dados".

## Etapa 5: Componentes e seções
Um componente por seção, na ordem do site atual:
1. Cabeçalho com menu e âncoras (RF2).
2. Chamada principal.
3. Apresentação ("Mais que um esporte").
4. Treinos online (botões de modalidade, RF3).
5. Planos Básico e Prime.
6. Anamnese.
7. Treinamento e comunicação.
8. Resultados e realização.
9. Inscrição, com botão que abre o WhatsApp (RF4).
10. Parceiros com desconto.
11. Locais de treino em Curitiba.
12. Rodapé (RF5).
- Componente flutuante do WhatsApp e banner de cookies visual (RF6).
- **Verificação:** cada seção aparece, e o menu leva até ela.
- **Commits:** um commit por grupo de seções (ex.: "Cabeçalho e chamada principal", "Planos e anamnese", "Rodapé e elementos flutuantes").

## Etapa 6: Design e acabamento
- Usar a skill `design-taste-frontend` para revisar o visual: hierarquia, espaçamento, ritmo entre seções e animações sutis.
- Garantir que a identidade visual original continue reconhecível.
- **Verificação:** capturas de tela no desktop e no celular, revisadas antes de seguir.
- **Commit:** "Ajustes visuais da home".

## Etapa 7: Responsividade e acessibilidade (RNF1, RNF3)
- Testar em largura de celular (margem de 16px, sem rolagem horizontal).
- Conferir contraste de cores e texto alternativo em todas as imagens.
- **Verificação:** lista de conferência marcada.
- **Commit:** "Ajustes de responsividade e acessibilidade".

## Etapa 8: SEO e desempenho (RNF2, RNF4)
- Título, descrição, `lang="pt-BR"` e Open Graph na página.
- Estrutura de títulos (um `h1` e `h2` por seção).
- Conferir o desempenho com `npm run build` e uma medição de página.
- **Commit:** "SEO básico e otimização".

## Etapa 9: Entrega
- Build de produção (`npm run build`) sem erros.
- Mostrar o link local para você revisar.
- **Decisão pendente:** o link local (`localhost`) só funciona no seu computador. Para o cliente acessar de qualquer lugar, precisamos publicar em uma hospedagem gratuita (ex.: Netlify ou Cloudflare Pages). Isso só será feito com sua autorização, porque publica o conteúdo na internet.

## Fora desta versão
Login, integrações, painel administrativo, páginas internas, formulário funcional.

## Regras de trabalho
- Atualizar o `DIARIO.md` ao final de cada etapa.
- Não gravar segredos no repositório.
- Commits pequenos e com mensagem clara.
