import { useRef } from 'react'

import type { nfts } from '../../data/nfts'

interface BannerPrincipalProps {
    nftsDestaque: typeof nfts
    bannerAtual: number
    setBannerAtual: React.Dispatch<React.SetStateAction<number>>
    setCategoria: React.Dispatch<React.SetStateAction<string>>
    setPesquisa: React.Dispatch<React.SetStateAction<string>>
    setPaginaAtual: React.Dispatch<React.SetStateAction<number>>
}

function BannerPrincipal({
    nftsDestaque,
    bannerAtual,
    setBannerAtual,
    setCategoria,
    setPesquisa,
    setPaginaAtual,
}: BannerPrincipalProps) {
    const inicioArraste = useRef<number | null>(null)

    const nftAtual = nftsDestaque[bannerAtual]

    function arrastarBanner(posicaoFinal: number) {
        if (inicioArraste.current === null) return

        const distancia = posicaoFinal - inicioArraste.current

        inicioArraste.current = null

        if (Math.abs(distancia) <= 40 || nftsDestaque.length <= 1) {
            return
        }

        setBannerAtual((atual) => {
            if (distancia < 0) {
                return (atual + 1) % nftsDestaque.length
            }

            return (
                (atual - 1 + nftsDestaque.length) %
                nftsDestaque.length
            )
        })
    }

    function explorar() {
        setCategoria('todos')
        setPesquisa('')
        setPaginaAtual(1)
    }

    return (
        <section
            aria-label="NFTs em destaque"
            className="relative h-[190px] w-full overflow-hidden rounded-[30px] bg-[#2F1D15] lg:h-[450px] lg:rounded-[24px] lg:bg-transparent"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={(evento) => {
                inicioArraste.current = evento.clientX
            }}
            onPointerUp={(evento) => {
                arrastarBanner(evento.clientX)
            }}
            onPointerCancel={() => {
                inicioArraste.current = null
            }}
            onLostPointerCapture={() => {
                inicioArraste.current = null
            }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-80px] top-[-31px] h-[248px] w-[248px] rounded-full lg:hidden"
                style={{
                    background:
                        'linear-gradient(135deg, #DD9A5F6E 43%, #D28A4C0A 100%)',
                }}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[73px] top-[-10px] h-[248px] w-[248px] rounded-full lg:hidden"
                style={{
                    background:
                        'linear-gradient(135deg, #DD9A5F5E 37%, #D28A4C00 100%)',
                }}
            />

            <div className="pointer-events-none absolute left-[16px] top-[8px] z-10 w-[190px] lg:left-10 lg:top-8 lg:w-[460px]">
                <p className="text-[12px] font-medium leading-[16px] text-[#F5F1EB] lg:text-sm">
                    Bem-vindo à Kurio
                </p>

                <h1 className="mt-[6px] text-[18px] font-bold leading-[28px] text-[#F5F1EB] lg:mt-4 lg:text-[43px] lg:leading-[1.4]">
                    <span className="lg:hidden">
                        SEJA DONO DA
                        <br />
                        CULTURA DIGITAL
                    </span>

                    <span className="hidden lg:inline">
                        SEJA DONO DO FUTURO
                        <br />
                        DA ARTE DIGITAL
                    </span>
                </h1>

                <p className="mt-[6px] text-[12px] font-normal leading-[18px] text-[#CFB28C] lg:mt-3 lg:max-w-[420px] lg:text-[14px] lg:leading-6">
                    <span className="lg:hidden">
                        Descubra NFTs selecionados
                        <br />
                        de criadores do mundo
                        <br />
                        todo.
                    </span>

                    <span className="hidden lg:inline">
                        Descubra NFTs selecionados de criadores emergentes e consagrados.
                        Colecione arte digital rara, apoie artistas e tenha uma parte
                        da cultura da internet.
                    </span>
                </p>

                <button
                    type="button"
                    onClick={explorar}
                    className="pointer-events-auto mt-[6px] flex items-center gap-[3px] text-[11px] font-bold leading-[14px] text-[#F5B875] transition-colors hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B875] lg:mt-5 lg:rounded lg:bg-[#D28A4C] lg:px-6 lg:py-3 lg:text-sm lg:text-[#20120B]"
                >
                    EXPLORAR

                    <svg
                        width="8"
                        height="10"
                        viewBox="0 0 8.03 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="ml-[8px] lg:hidden"
                    >
                        <path
                            d="M0.5 5H7.5M4.5 1.5L7.5 5L4.5 8.5"
                            stroke="#D28A4C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className="hidden lg:inline" aria-hidden="true">
                        →
                    </span>
                </button>
            </div>

            {nftAtual && (
                <div className="absolute right-[16px] top-[10px] z-10 h-[138px] w-[138px] overflow-hidden rounded-[18px] bg-[#DCCDAA] lg:right-10 lg:top-1/2 lg:h-[450px] lg:w-[450px] lg:-translate-y-1/2 lg:rounded-[24px]">
                    <img
                        src={nftAtual.imagem}
                        alt={nftAtual.nome}
                        draggable={false}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        width={450}
                        height={450}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <div
                role="group"
                aria-label="Selecionar NFT em destaque"
                className="absolute bottom-[10px] z-20 flex w-full items-center justify-center gap-[6px] lg:bottom-5 lg:left-1/2 lg:w-auto lg:-translate-x-1/2"
            >
                {nftsDestaque.map((nft, index) => (
                    <button
                        key={nft.id}
                        type="button"
                        aria-label={`Mostrar banner ${index + 1}: ${nft.nome}`}
                        aria-pressed={bannerAtual === index}
                        onClick={() => setBannerAtual(index)}
                        className={`h-[7px] w-[7px] rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C] lg:h-2 lg:w-2 ${
                            bannerAtual === index
                                ? 'bg-[#D28A4C]'
                                : 'bg-[#D28A4C66]'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}

export default BannerPrincipal