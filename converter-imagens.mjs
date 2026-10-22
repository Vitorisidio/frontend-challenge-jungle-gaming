import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const arquivos = await readdir('./src', { recursive: true })

for (const arquivo of arquivos) {
  if (!/^macaco[1-4]\.png$/i.test(path.basename(arquivo))) continue

  const origem = path.join('./src', arquivo)
  const destino = origem.replace(/\.png$/i, '.webp')

  await sharp(origem).webp({ quality: 80 }).toFile(destino)

  console.log(`Convertido: ${destino}`)
}