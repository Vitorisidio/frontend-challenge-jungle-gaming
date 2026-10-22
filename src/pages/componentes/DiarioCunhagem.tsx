import { useMemo } from 'react'
import { nfts } from '../../data/nfts'

interface DiarioCunhagemProps {
    nfts: typeof nfts
}

function DiarioCunhagem({ nfts }: DiarioCunhagemProps) {
    const artigos = useMemo(
        () => [
            {
                data: '12 de setembro',
                leitura: 'Leitura de 6 min',
                titulo: (
                    <>
                        Como funciona a
                        <br />
                        propriedade de NFTs
                    </>
                ),
                descricao: (
                    <>
                        Aprenda a colecionar, negociar e
                        <br />
                        verificar ativos digitais.
                    </>
                ),
                imagem: nfts[0]?.imagem,
                alt: 'Como funciona a propriedade de NFTs',
            },
            {
                data: '13 de setembro',
                leitura: 'Leitura de 2 min',
                titulo: (
                    <>
                        10 artistas digitais
                        <br />
                        para acompanhar
                    </>
                ),
                descricao: (
                    <>
                        Conheça criadores que moldam a
                        <br />
                        cultura digital.
                    </>
                ),
                imagem: nfts[1]?.imagem,
                alt: '10 artistas digitais para acompanhar',
            },
            {
                data: '15 de setembro',
                leitura: 'Leitura de 3 min',
                titulo: (
                    <>
                        Raridade, atributos e
                        <br />
                        procedência
                    </>
                ),
                descricao: (
                    <>
                        Entenda raridade, procedência,
                        <br />
                        direitos autorais e utilidade.
                    </>
                ),
                imagem: nfts[2]?.imagem,
                alt: 'Raridade, atributos e procedência',
            },
            {
                data: '15 de setembro',
                leitura: 'Leitura de 2 min',
                titulo: (
                    <>
                        Como proteger sua
                        <br />
                        carteira
                    </>
                ),
                descricao: (
                    <>
                        Proteja sua carteira, seus
                        <br />
                        ativos e sua identidade.
                    </>
                ),
                imagem: nfts[3]?.imagem,
                alt: 'Como proteger sua carteira',
            },
        ],
        [nfts],
    )

    return (
        <section
            id="diario"
            aria-labelledby="diario-titulo"
            className="mt-[96px] hidden pb-[80px] lg:block"
        >
            <div className="mb-[42px] text-center">
                <h2
                    id="diario-titulo"
                    className="text-[30px] font-bold leading-[38px] text-[#F5F1EB]"
                >
                    Diário da Cunhagem
                </h2>

                <p className="mt-[12px] text-[14px] leading-[20px] text-[#CFB28C]">
                    Histórias, guias e insights para colecionadores sobre o universo da propriedade digital
                </p>
            </div>

            <div className="grid grid-cols-4 gap-[24px]">
                {artigos.map((artigo) => (
                    <article
                        key={artigo.alt}
                        className="overflow-hidden rounded-[7px] bg-[#241612]"
                    >
                        <div className="h-[195px] overflow-hidden bg-[#DCCDAA]">
                            {artigo.imagem && (
                                <img
                                    src={artigo.imagem}
                                    alt={artigo.alt}
                                    loading="lazy"
                                    decoding="async"
                                    width={250}
                                    height={195}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>

                        <div className="min-h-[174px] px-[16px] py-[14px]">
                            <p className="text-[11px] leading-[16px] text-[#CFB28C]">
                                {artigo.data}

                                <span
                                    aria-hidden="true"
                                    className="mx-[10px]"
                                >
                                    |
                                </span>

                                {artigo.leitura}
                            </p>

                            <h3 className="mt-[9px] text-[16px] font-bold leading-[21px] text-[#F5F1EB]">
                                {artigo.titulo}
                            </h3>

                            <p className="mt-[8px] text-[12px] leading-[16px] text-[#CFB28C]">
                                {artigo.descricao}
                            </p>

                            <button
                                type="button"
                                aria-label={`Ler mais: ${artigo.alt}`}
                                className="mt-[8px] text-[12px] font-bold text-[#D28A4C] transition-colors hover:text-[#F5B875] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B875]"
                            >
                                Ler mais →
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default DiarioCunhagem