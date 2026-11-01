// Ícone animado (lucide-animated) que anima quando o LINK inteiro recebe mouse ou foco,
// e não só quando o mouse está em cima do desenho do ícone (que é pequeno).
// Sem JavaScript o ícone aparece parado (o Astro desenha a versão estática no servidor).
import { useEffect, useRef } from 'react';
import { ArrowUpRightIcon, MapPinIcon } from 'lucide-animated';

const icones = {
  seta: ArrowUpRightIcon,
  pino: MapPinIcon,
};

interface Props {
  nome: keyof typeof icones;
  size?: number;
  className?: string;
}

type Controle = { startAnimation: () => void; stopAnimation: () => void };

export default function IconeAnimado({ nome, size = 24, className }: Props) {
  const Icone = icones[nome];
  const controle = useRef<Controle>(null);
  const caixa = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Quem "manda" na animação é o link (ou botão) que contém o ícone
    const alvo = caixa.current?.closest('a, button');
    if (!alvo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ligar = () => controle.current?.startAnimation();
    const desligar = () => controle.current?.stopAnimation();
    alvo.addEventListener('mouseenter', ligar);
    alvo.addEventListener('mouseleave', desligar);
    alvo.addEventListener('focusin', ligar);
    alvo.addEventListener('focusout', desligar);
    return () => {
      alvo.removeEventListener('mouseenter', ligar);
      alvo.removeEventListener('mouseleave', desligar);
      alvo.removeEventListener('focusin', ligar);
      alvo.removeEventListener('focusout', desligar);
    };
  }, []);

  return (
    // Decorativo: o texto do link já diz tudo, então leitores de tela ignoram o ícone
    <span ref={caixa} aria-hidden="true" className="inline-flex">
      <Icone ref={controle} size={size} className={className} />
    </span>
  );
}
