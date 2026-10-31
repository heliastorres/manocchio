// Trata as fotos originais (recorte, brilho, contraste) e gera versões WebP otimizadas.
//
// Uso:
//   node scripts/tratar-imagens.mjs <pasta-dos-originais> <pasta-de-saida>
// Exemplo:
//   node scripts/tratar-imagens.mjs /tmp/originais src/assets/fotos
//
// As fotos originais ficam FORA do git (são pesadas). Só o resultado vai para o projeto.
// Elas vêm do site atual: https://manocchiosports.com/wp-content/uploads/<ano>/<mes>/<arquivo>
//   2019/08/2016.10_low.jpg                        2021/08/IMG_3755.jpg
//   2023/08/52939606412_26b22379f1_k.jpg           2021/11/3-Marias-MTT-2IMG_20200826_210411.jpg
//   2021/11/3-Marias-MTT-3DSC_0473.jpg             2019/09/Site-MTT-Imagens-2-55.png

import sharp from 'sharp';
import { join } from 'node:path';
import { mkdir, stat } from 'node:fs/promises';

const [entrada, saida] = process.argv.slice(2);
if (!entrada || !saida) {
  console.error('Uso: node scripts/tratar-imagens.mjs <pasta-dos-originais> <pasta-de-saida>');
  process.exit(1);
}

// Cada foto: arquivo original, nome final, recorte opcional (em % da imagem),
// largura máxima e ajustes. Sem "recorte" = imagem inteira.
const fotos = [
  {
    original: '2016.10_low.jpg',
    nome: 'equipe-ciclismo',
    // corta o asfalto vazio de baixo: sobra a equipe, que é o assunto da foto
    recorte: { topo: 0, altura: 0.74 },
    largura: 1920,
    qualidade: 68, // a original já é bem comprimida; qualidade maior só gasta bytes
    brilho: 1.04,
    saturacao: 1.1,
    contraste: 1.08,
  },
  {
    original: '52939606412_26b22379f1_k.jpg',
    nome: 'atleta-capacete-verde',
    largura: 1000,
    brilho: 1.04,
    saturacao: 1.05,
    contraste: 1.05,
  },
  {
    original: 'IMG_3755.jpg',
    nome: 'piscina-nado-livre',
    largura: 1600,
    brilho: 1.03,
    saturacao: 1.05,
    contraste: 1.05,
  },
  {
    original: '3-Marias-MTT-2IMG_20200826_210411.jpg',
    nome: 'piscina-tres-marias',
    largura: 1600,
    brilho: 1.0,
    saturacao: 0.95, // a original é muito saturada e fica artificial
    contraste: 1.05,
  },
  {
    original: '3-Marias-MTT-3DSC_0473.jpg',
    nome: 'treino-natacao',
    largura: 1600,
    brilho: 0.98,
    saturacao: 0.95,
    contraste: 1.1,
  },
  {
    original: 'Site-MTT-Imagens-2-55.png',
    nome: 'guilherme-manocchio',
    // a original é pequena (418 px de largura): não ampliamos para não borrar
    largura: 418,
    brilho: 1.02,
    saturacao: 1.0,
    contraste: 1.05,
  },
];

await mkdir(saida, { recursive: true });

for (const f of fotos) {
  const origem = join(entrada, f.original);
  const destino = join(saida, `${f.nome}.webp`);

  let img = sharp(origem).rotate(); // respeita a orientação gravada pela câmera
  const { width, height } = await img.metadata();

  if (f.recorte) {
    img = img.extract({
      left: 0,
      top: Math.round(height * f.recorte.topo),
      width,
      height: Math.round(height * f.recorte.altura),
    });
  }

  await img
    .resize({ width: Math.min(f.largura, width), withoutEnlargement: true })
    .modulate({ brightness: f.brilho, saturation: f.saturacao })
    .linear(f.contraste, -(128 * (f.contraste - 1))) // contraste em torno do cinza médio
    .sharpen({ sigma: 0.6 })
    .webp({ quality: f.qualidade ?? 80, effort: 5 })
    .toFile(destino);

  const kb = Math.round((await stat(destino)).size / 1024);
  const antes = Math.round((await stat(origem)).size / 1024);
  const meta = await sharp(destino).metadata();
  console.log(`${f.nome}.webp  ${meta.width}x${meta.height}  ${antes} KB -> ${kb} KB`);
}
