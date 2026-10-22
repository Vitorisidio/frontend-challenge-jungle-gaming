export type CategoriaNFT = 'todos' | 'novos' | 'em-alta'

export type ColecaoNFT =
  | 'Arte digital'
  | 'Fotografia'
  | 'Música'
  | 'Arte 3D'
  | 'Colecionáveis'
  | 'Generativa'
  | 'Jogos'
  | 'Assinaturas'
  | 'Utilidade'

export type RedeNFT = 'Ethereum' | 'Polygon' | 'Solana'

export interface NFT {
  id: string
  codigo: string
  nome: string
  preco: string
  precoNumerico: number
  precoOriginal?: string
  imagem: string
  categoria: CategoriaNFT
  colecao: ColecaoNFT
  rede: RedeNFT
  raridade: boolean
  quantidadeDisponível: number
}