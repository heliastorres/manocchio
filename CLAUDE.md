# Instruções do projeto manocchio

## Idioma
- Responda sempre em português do Brasil.
- O usuário é programador iniciante e autodidata: explique termos técnicos novos em linguagem simples.

## Retomar o projeto
Quando o usuário disser "retomar projeto" (ou algo parecido, no início de uma sessão):
1. Leia este `CLAUDE.md`.
2. Leia o `DIARIO.md`, principalmente as entradas mais recentes (no topo).
3. Quando o git estiver configurado, rode `git status` e `git log --oneline -10` para ver o estado atual do código.
4. Faça um resumo curto de onde o projeto parou e os próximos passos.
5. **Aguarde a nova instrução do usuário.** Não comece a mudar nada sem ele pedir.

## Fim de sessão
Quando o usuário pedir "atualiza o diário" (ou quando a sessão terminar):
- Adicione uma entrada nova no **topo** do `DIARIO.md` (mais recente primeiro), com a data no formato `AAAA-MM-DD`.
- Se já existir uma entrada do mesmo dia, atualize essa entrada em vez de criar outra.
- Use este formato:
  - **O que foi feito:** resumo curto do que mudou.
  - **Decisões:** escolhas feitas e o porquê.
  - **Problemas:** erros encontrados e como foram resolvidos (ou que ainda estão abertos).
  - **Próximos passos:** o que fazer na próxima sessão.
- Não registre senhas, chaves de API ou outros segredos.

## Convenções
- Não coloque segredos (senhas, chaves de API, tokens) em arquivos versionados. Use um arquivo `.env`, que fica fora do git.
- Python: use ambiente virtual (`.venv`). Instale pacotes com `pip install`, e depois rode `pip freeze > requirements.txt`.
- JavaScript: use `npm install <pacote>` para adicionar dependências.
- Antes de fazer algo fora das boas práticas (estrutura, nomes, segurança, controle de versão, dependências), avise o usuário de forma curta, explique o motivo e sugira a alternativa. Se ele insistir, faça do jeito dele, a menos que seja destrutivo ou inseguro.

## Skills
- As skills instaladas ficam em `.agents/skills/` e `.claude/skills/`. Essas pastas não vão para o git.

## Fluxo de trabalho por etapa (a partir da Etapa 3)
Cada etapa do `PLANO.md` segue: branch (`feature/etapa-N-...`) → trabalho → verificação → PR → merge → diário.
- **`executing-plans`:** seguir o plano passo a passo, uma etapa por vez.
- **`verification-before-completion`:** antes de dizer que algo está pronto, rodar o comando que prova (build, checagens) e mostrar o resultado. Nada de "deve estar funcionando".
- **`requesting-code-review`:** antes de abrir cada PR, revisar o diff.
- Outras skills entram só na etapa em que fazem sentido: `design-taste-frontend` (etapa 6), `run` (etapa 7), `security-review` e `finishing-a-development-branch` (etapa 9), `systematic-debugging` (quando algo quebrar).
