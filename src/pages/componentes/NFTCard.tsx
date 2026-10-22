import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import { nfts } from '../../data/nfts'

interface NFTCardProps {
    nft: (typeof nfts)[number]
    index: number
    favoritos: (typeof nfts)[number]['id'][]
    alternarFavorito: (
        id: (typeof nfts)[number]['id']
    ) => void
}

function NFTCard({
    nft,
    index,
    favoritos,
    alternarFavorito,
}: NFTCardProps) {
    const favoritado = favoritos.includes(nft.id)

    return (
        <article
            className={`min-w-0 cursor-pointer rounded-[18px] transition-transform duration-200 ease-in-out hover:z-10 hover:scale-[1.03] ${
                index % 2 !== 0 ? 'mt-[20px] lg:mt-0' : ''
            }`}
        >
            <Link
                to="/nft/$id"
                params={{ id: String(nft.id) }}
                className="block"
                aria-label={`Ver detalhes de ${nft.nome} ${nft.codigo}`}
            >
                <div className="relative rounded-[18px] bg-[#241612] p-[4px] pb-[16px]">
                    <div className="relative aspect-square overflow-hidden rounded-[14px] bg-[#DCCDAA]">
                        <img
                            src={nft.imagem}
                            alt={nft.nome}
                            loading="lazy"
                            decoding="async"
                            width={250}
                            height={250}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {nft.raridade && (
                        <span className="absolute left-0 top-[16px] bg-[#D28A4C] px-[10px] py-[6px] text-[12px] font-medium leading-[18px] text-[#24120B]">
                            RARO
                        </span>
                    )}
                </div>

                <div className="px-[4px] pt-[8px]">
                    <div className="flex min-w-0 items-center gap-2">
                        <p className="truncate text-[16px] font-medium leading-[18px] text-[#F7F3EC]">
                            {nft.nome}
                        </p>

                        <p className="shrink-0 text-[16px] font-normal text-[#F7F3EC]">
                            {nft.codigo}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="text-[14px] font-bold leading-[18px] text-[#E89B55]">
                            {nft.preco}
                        </p>

                        {nft.precoOriginal && (
                            <p className="text-[12px] leading-[18px] text-[#B39463] line-through">
                                {nft.precoOriginal}
                            </p>
                        )}
                    </div>
                </div>
            </Link>

            <button
                type="button"
                aria-label={
                    favoritado
                        ? `Remover ${nft.nome} dos favoritos`
                        : `Favoritar ${nft.nome}`
                }
                aria-pressed={favoritado}
                onClick={() => alternarFavorito(nft.id)}
                className="mt-2 rounded-full bg-[#241612] px-3 py-1 text-[20px] leading-none text-[#D28A4C] transition-colors hover:bg-[#3A251C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
            >
                {favoritado ? '♥' : '♡'}
            </button>
        </article>
    )
}

export default memo(NFTCard)