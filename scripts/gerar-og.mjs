// Gera a imagem de prévia para quando o link do site é compartilhado (WhatsApp, redes sociais).
// Formato padrão das prévias: 1200x630. Sai em public/og.jpg.
//
// Uso: node scripts/gerar-og.mjs
import sharp from 'sharp';

await sharp('src/assets/fotos/equipe-ciclismo.webp')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og.jpg');
console.log('Gerado: public/og.jpg');
