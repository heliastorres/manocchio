import type { ImageMetadata } from 'astro';

// Carrega todas as fotos de src/assets/fotos de uma vez, para que o conteudo.ts
// possa citar cada uma só pelo nome (ex.: "equipe-ciclismo").
const fotos = import.meta.glob<{ default: ImageMetadata }>('../assets/fotos/*.webp', {
  eager: true,
});

/** Devolve a foto pelo nome do arquivo (sem .webp). Falha com mensagem clara se não existir. */
export function obterFoto(arquivo: string): ImageMetadata {
  const foto = fotos[`../assets/fotos/${arquivo}.webp`];
  if (!foto) {
    throw new Error(`Foto não encontrada em src/assets/fotos: ${arquivo}.webp`);
  }
  return foto.default;
}
