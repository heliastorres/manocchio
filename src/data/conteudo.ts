/**
 * Todo o conteúdo da página inicial: textos, links e fotos.
 *
 * Para mudar uma frase, um telefone ou um link, altere SÓ este arquivo.
 * Os componentes apenas leem estes dados (nada de texto ou link fixo neles).
 *
 * Depois de editar, rode `npm run verificar:conteudo` para conferir links,
 * âncoras e fotos.
 *
 * Como editar (regras que o verificador confere):
 *  - `texto` é SEMPRE uma lista de parágrafos: ['primeiro parágrafo', 'segundo'].
 *    Para um parágrafo só, uma lista com um item.
 *  - Todo link é https://..., mailto:..., tel:+55... ou #id-de-uma-secao.
 *    Chame o campo de `href`.
 *  - `imagem.arquivo` é o nome da foto em src/assets/fotos (sem o .webp).
 *  - Toda foto precisa de `alt` (texto que descreve a foto para quem usa leitor de tela).
 *  - Links para páginas que ainda não existem neste protótipo apontam para o
 *    site atual (manocchiosports.com).
 */

// ---------------------------------------------------------------------------
// Tipos (descrevem o formato dos dados; o editor avisa se algo estiver errado)
// ---------------------------------------------------------------------------

export interface Link {
  rotulo: string;
  href: string;
}

export interface Imagem {
  /** Nome do arquivo em src/assets/fotos, sem a extensão. */
  arquivo: string;
  /** Texto alternativo, lido por leitores de tela. */
  alt: string;
}

export interface Plano {
  nome: string;
  descricao: string;
  /** Plano em destaque (o recomendado). */
  destaque: boolean;
  /** Etiqueta opcional, ex.: "Recomendado". */
  selo?: string;
  botao: Link;
}

// ---------------------------------------------------------------------------
// Dados de contato (usados no rodapé, no WhatsApp e nos botões de inscrição)
// ---------------------------------------------------------------------------

const whatsappNumero = '5541991095550';
const whatsappMensagem =
  'Olá, gostaria de saber mais informações sobre o treinamento. A modalidade que tenho interesse é ...';

/** Link que abre uma conversa no WhatsApp (celular ou computador) com a mensagem pronta. */
const whatsappHref = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(whatsappMensagem)}`;

/** Política de privacidade: usada no rodapé e no banner de cookies. */
const politicaHref = 'https://manocchiosports.com/politica-de-privacidade';

// ---------------------------------------------------------------------------
// Conteúdo
// ---------------------------------------------------------------------------

export const conteudo = {
  site: {
    nome: 'Manocchio Team',
    titulo: 'Manocchio Team | Assessoria esportiva em Curitiba',
    descricao:
      'Assessoria esportiva de triathlon, corrida, natação e ciclismo em Curitiba, a distância ou presencial, com a metodologia do Head Coach Guilherme Manocchio.',
    idioma: 'pt-BR',
  },

  contato: {
    id: 'contato',
    titulo: 'Fale com a gente',
    endereco: 'Av. Hugo Simas, 1948, loja 3 · CEP 80520-250 · Curitiba, PR',
    email: { rotulo: 'atendimento@manocchio.com.br', href: 'mailto:atendimento@manocchio.com.br' },
    telefones: [
      { rotulo: '+55 (41) 3018-5550', href: 'tel:+554130185550' },
      { rotulo: '+55 (41) 99109-5550', href: 'tel:+5541991095550' },
    ],
    whatsapp: {
      rotulo: 'Chamar no WhatsApp',
      numero: whatsappNumero,
      href: whatsappHref,
    },
    redes: [
      { rotulo: 'Instagram', href: 'https://www.instagram.com/manocchioteam/' },
      { rotulo: 'Facebook', href: 'https://www.facebook.com/ManocchioTeam/' },
      { rotulo: 'YouTube', href: 'https://www.youtube.com/channel/UCviyaV0uHyaMDf5Ok4TXgjg' },
    ],
  },

  // Cabeçalho: o menu leva até cada seção da página (RF2).
  cabecalho: {
    logo: { alt: 'Manocchio Team: ir para o início da página', href: '#inicio' },
    menu: [
      { rotulo: 'Sobre', href: '#apresentacao' },
      { rotulo: 'Treinos', href: '#treinos' },
      { rotulo: 'Planos', href: '#planos' },
      { rotulo: 'Como funciona', href: '#anamnese' },
      { rotulo: 'Resultados', href: '#resultados' },
      { rotulo: 'Locais', href: '#locais' },
      { rotulo: 'Contato', href: '#contato' },
    ] satisfies Link[],
    botao: { rotulo: 'Inscreva-se', href: '#inscricao' },
  },

  // 1. Chamada principal
  chamada: {
    id: 'inicio',
    titulo: 'Mais que um esporte, um estilo de vida',
    texto: [
      'Assessoria esportiva de triathlon, corrida, natação e ciclismo para atletas amadores, a distância ou presencial em Curitiba.',
    ],
    botaoPrincipal: { rotulo: 'Tire suas dúvidas e inscreva-se', href: whatsappHref },
    botaoSecundario: { rotulo: 'Conheça os treinos', href: '#treinos' },
    imagem: {
      arquivo: 'equipe-ciclismo',
      alt: 'Equipe Manocchio de ciclismo, de uniforme verde, com os braços erguidos na estrada',
    } satisfies Imagem,
  },

  // 2. Apresentação
  apresentacao: {
    id: 'apresentacao',
    chamadaCurta: 'Sobre a assessoria',
    titulo: 'Esporte que transforma a rotina',
    texto: [
      'São muitos anos de natação, pedal e corrida, sempre com o mesmo propósito: levar o valor transformador do esporte para o dia a dia de atletas amadores.',
      'Nossa metodologia é exclusiva. Ela une o sistema ATR à periodização em blocos e vem sendo desenvolvida desde 2004 para ajudar você a alcançar seus objetivos, da alta performance ao treino pela qualidade de vida.',
    ],
    imagem: {
      arquivo: 'atleta-capacete-verde',
      alt: 'Atleta de capacete verde pedalando em posição aerodinâmica',
    } satisfies Imagem,
  },

  // 3. Treinos online (RF3: um botão por modalidade)
  treinos: {
    id: 'treinos',
    titulo: 'Seus treinos de forma prática, simples e eficaz',
    texto: [
      'Escolha a modalidade, preencha a ficha de inscrição e finalize o pagamento por boleto ou cartão. Deixe que a gente ajude você a executar o seu planejamento esportivo com profissionalismo e seriedade.',
    ],
    rotuloModalidades: 'Treinamento online',
    // Igual ao site atual: o Duathlon usa a mesma página de inscrição do Triathlon, e a
    // Natação usa um link encurtado (bit.ly) que leva ao sistema de inscrição.
    // Se algum deles mudar, é só trocar aqui.
    modalidades: [
      { rotulo: 'Triathlon', href: 'https://manocchiosports.com/tri-online/' },
      { rotulo: 'Corrida', href: 'https://manocchiosports.com/corrida-online/' },
      { rotulo: 'Natação', href: 'https://bit.ly/MTTNAT23' },
      { rotulo: 'Ciclismo', href: 'https://manocchiosports.com/ciclismo/' },
      { rotulo: 'Duathlon', href: 'https://manocchiosports.com/tri-online/' },
    ] satisfies Link[],
  },

  // 4. Planos Básico e Prime (os valores ficam nas páginas de inscrição de cada modalidade)
  planos: {
    id: 'planos',
    titulo: 'Escolha seu formato de plano',
    texto: [
      'O plano Básico atende o essencial. Para quem gosta de uma atenção diferenciada, está começando em uma modalidade ou já tem um objetivo em mente, o recomendado é o Prime. Você escolhe o que melhor se encaixa na sua realidade.',
    ],
    itens: [
      {
        nome: 'Básico',
        descricao: 'Atende a necessidade essencial do atleta.',
        destaque: false,
        // Os valores aparecem na página de inscrição de cada modalidade, por isso o botão
        // leva à escolha da modalidade (e não promete preços aqui).
        botao: { rotulo: 'Escolher modalidade', href: '#treinos' },
      },
      {
        nome: 'Prime',
        descricao:
          'Atenção diferenciada, indicada para quem está começando na modalidade ou tem um objetivo definido.',
        destaque: true,
        selo: 'Recomendado',
        botao: { rotulo: 'Escolher modalidade', href: '#treinos' },
      },
    ] satisfies Plano[],
  },

  // 5. Anamnese
  anamnese: {
    id: 'anamnese',
    titulo: 'Anamnese: o primeiro contato com o treinador',
    texto: [
      'Ao entrar na equipe, o atleta preenche uma ficha de anamnese. Analisamos os dados e escolhemos o treinador mais adequado ao seu perfil. Se você já conhece nossos treinadores, pode indicar a sua preferência.',
      'A anamnese é o primeiro contato entre atleta e treinador. Ele analisa uma série de fatores e, se precisar, fala com você para tirar dúvidas antes de enviar os primeiros treinos.',
      'Com o tempo e com os dados da plataforma de treino, o treinador passa a conhecer suas particularidades, necessidades e objetivos. Quanto melhor entendemos cada atleta, mais eficaz é a adaptação e a evolução do treinamento.',
    ],
  },

  // 6. Treinamento e comunicação
  comunicacao: {
    id: 'comunicacao',
    titulo: 'Treinamento e comunicação',
    texto: [
      'Depois dos primeiros passos, o treino segue os dados coletados a cada sessão e a conversa constante entre aluno e treinador. É a tecnologia e o fator humano juntos, em busca do melhor resultado.',
      'De tempos em tempos, o aluno alinha as estratégias com o coach, pessoalmente ou de forma virtual. Isso é importante porque a cada fase da vida, a cada meta batida e a cada sonho realizado, o plano precisa ser ajustado de novo.',
    ],
  },

  // 7. Resultados e realização
  resultados: {
    id: 'resultados',
    titulo: 'Resultado e realização',
    texto: [
      'Coleta e análise eficientes de dados, somadas a um treinamento individualizado dentro da metodologia Manocchio Training System, são um caminho certo para você alcançar seus objetivos esportivos.',
      'Todo treinamento convida a sair da zona de conforto, e isso é bom, principalmente quando o planejamento respeita o seu objetivo, o seu corpo e a sua rotina. Contar com uma equipe de profissionais diferenciados é a forma mais acertada de chegar a grandes realizações no esporte.',
    ],
    imagem: {
      arquivo: 'treino-natacao',
      alt: 'Duas nadadoras treinando com prancha em uma piscina',
    } satisfies Imagem,
  },

  // 8. Inscrição (o botão abre o WhatsApp, RF4)
  inscricao: {
    id: 'inscricao',
    titulo: 'Inscreva-se',
    texto: [
      'Nosso time de treinadores segue a metodologia desenvolvida pelo Head Coach Guilherme Manocchio. Para treinar diretamente com o Guilherme, solicite uma planilha à parte.',
    ],
    passosTitulo: 'Como funciona a inscrição',
    passos: [
      'Clique na modalidade, escolha o formato de atendimento e preencha a inscrição no link que abrir.',
      'O boleto para pagamento é gerado automaticamente.',
      'Quer pagar por Pix ou receber os treinos mais rápido? Envie o comprovante pelo WhatsApp.',
      'Com o pagamento confirmado, você recebe a ficha de anamnese para preencher.',
      'O treinador tem até 48 horas úteis para analisar seus dados e montar os treinos, mas geralmente posta antes.',
    ],
    botao: { rotulo: 'Falar pelo WhatsApp', href: whatsappHref },
    imagem: {
      arquivo: 'guilherme-manocchio',
      alt: 'Guilherme Manocchio, Head Coach, sorrindo com os braços abertos',
    } satisfies Imagem,
  },

  // 9. Parceiros com desconto
  parceiros: {
    id: 'parceiros',
    titulo: 'Parceiros com desconto',
    texto: [
      'Em Curitiba temos parceria com três locais de treino. Quem se matricula nas duas empresas ao mesmo tempo ganha desconto: o valor final é a soma do valor do parceiro com o da Manocchio Team.',
      'Os pagamentos são feitos diretamente a cada empresa, seguindo a política local de cada plano.',
    ],
  },

  // 10. Locais de treino em Curitiba (o UPX Sports ainda não tem foto: veja o DIARIO.md)
  locais: {
    id: 'locais',
    titulo: 'Locais de treino em Curitiba',
    textoLink: 'Saiba mais e inscreva-se',
    itens: [
      {
        nome: 'UPX Sports',
        complemento: 'Universidade Positivo',
        href: 'https://manocchiosports.com/upxsports/',
        imagem: null,
      },
      {
        nome: 'Acquafitness Três Marias',
        complemento: 'Clube Três Marias',
        href: 'https://manocchiosports.com/treinamento/nadolivre/acquafitness-tres-marias-clube-tres-marias/',
        imagem: {
          arquivo: 'piscina-tres-marias',
          alt: 'Piscina coberta do Clube Três Marias com atletas treinando',
        } satisfies Imagem,
      },
      {
        nome: 'Nado Livre',
        complemento: 'Mercês',
        href: 'https://manocchiosports.com/treinamento/nadolivre/',
        imagem: {
          arquivo: 'piscina-nado-livre',
          alt: 'Atletas nadando na piscina do Nado Livre, no bairro Mercês',
        } satisfies Imagem,
      },
    ],
  },

  // Rodapé
  rodape: {
    rotuloAcessibilidade: 'Rodapé',
    copyright: '© Manocchio Team',
    politica: { rotulo: 'Política de privacidade', href: politicaHref },
  },

  // Banner de cookies (só visual, RF6)
  cookies: {
    rotuloAcessibilidade: 'Aviso de cookies',
    texto: [
      'Usamos cookies para lembrar suas preferências e melhorar a sua experiência no site. Ao clicar em “Aceitar”, você concorda com o uso dos cookies.',
    ],
    botao: 'Aceitar',
    politica: { rotulo: 'Leia nossa Política de privacidade', href: politicaHref },
  },

  // Textos que só leitores de tela leem (ficam escondidos na tela, mas precisam existir)
  acessibilidade: {
    menuAbrir: 'Abrir menu',
    menuFechar: 'Fechar menu',
    menuPrincipal: 'Menu principal',
    pularParaConteudo: 'Pular para o conteúdo',
  },

  // Botão flutuante do WhatsApp (RF6)
  whatsappFlutuante: {
    rotulo: 'Falar pelo WhatsApp',
    href: whatsappHref,
  },
};
