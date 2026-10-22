import { useMemo, useRef } from 'react'

import { nfts } from '../../data/nfts'

import NFTCard from './NFTCard'
import Paginacao from './Paginacao'

interface FiltrosMercadoProps {
    categoria: string
    setCategoria: React.Dispatch<React.SetStateAction<string>>

    colecoes: string[]
    redes: string[]

    colecoesSelecionadas: string[]
    redesSelecionadas: string[]

    alternarColecao: (nome: string) => void
    alternarRede: (nome: string) => void

    precoMinimo: number
    precoMaximo: number

    setPrecoMinimo: React.Dispatch<
        React.SetStateAction<number>
    >

    setPrecoMaximo: React.Dispatch<
        React.SetStateAction<number>
    >

    aplicarFaixaPreco: () => void

    favoritos: (typeof nfts)[number]['id'][]

    alternarFavorito: (
        id: (typeof nfts)[number]['id']
    ) => void

    nftsFiltrados: (typeof nfts)[number][]
    nftsDaPagina: (typeof nfts)[number][]

    categorias: {
        nome: string
        valor: string
    }[]

    paginaAtual: number
    totalPaginas: number

    irParaPagina: (pagina: number) => void

    ordenacao: string

    setOrdenacao: React.Dispatch<
        React.SetStateAction<string>
    >
}

function FiltrosMercado({
    categoria,
    setCategoria,
    colecoes,
    redes,
    colecoesSelecionadas,
    redesSelecionadas,
    alternarColecao,
    alternarRede,
    precoMinimo,
    precoMaximo,
    setPrecoMinimo,
    setPrecoMaximo,
    aplicarFaixaPreco,
    favoritos,
    alternarFavorito,
    nftsFiltrados,
    nftsDaPagina,
    categorias,
    paginaAtual,
    totalPaginas,
    irParaPagina,
    ordenacao,
    setOrdenacao,
}: FiltrosMercadoProps) {
    const precoArrastado =
        useRef<'minimo' | 'maximo' | null>(null)

    // ==================================================
    // QUANTIDADES DAS COLEÇÕES E REDES
    // Calculadas uma vez por conjunto de dados.
    // ==================================================

    const quantidadesColecoes = useMemo(() => {
        const quantidades = new Map<string, number>()

        for (const nft of nfts) {
            quantidades.set(
                nft.colecao,
                (quantidades.get(nft.colecao) ?? 0) + 1,
            )
        }

        return quantidades
    }, [])

    const quantidadesRedes = useMemo(() => {
        const quantidades = new Map<string, number>()

        for (const nft of nfts) {
            quantidades.set(
                nft.rede,
                (quantidades.get(nft.rede) ?? 0) + 1,
            )
        }

        return quantidades
    }, [])

    // ==================================================
    // PREÇO
    // ==================================================

    function atualizarPreco(
        evento: React.ChangeEvent<HTMLInputElement>,
    ) {
        const valor = Number(evento.target.value)

        if (precoArrastado.current === 'minimo') {
            setPrecoMinimo(
                Math.min(valor, precoMaximo - 0.01),
            )
        } else if (precoArrastado.current === 'maximo') {
            setPrecoMaximo(
                Math.max(valor, precoMinimo + 0.01),
            )
        }
    }

    const posicaoMinima =
        ((precoMinimo - 0.02) / (12.30 - 0.02)) * 100

    const posicaoMaxima =
        ((precoMaximo - 0.02) / (12.30 - 0.02)) * 100

    return (
        <div className="mt-[24px] lg:mt-8 lg:grid lg:grid-cols-[310px_minmax(0,1fr)] lg:items-start lg:gap-10">
            {/* FILTROS */}

            <aside className="hidden lg:block">
                <div className="bg-[#241612] px-5 py-4">
                    <h2 className="mb-4 text-base font-bold text-[#F5F1EB]">
                        Coleções
                    </h2>

                    {colecoes.map((nome) => (
                        <button
                            key={nome}
                            type="button"
                            onClick={() => alternarColecao(nome)}
                            className={`mb-3 flex w-full items-center justify-between text-left text-[13px] transition-colors ${
                                colecoesSelecionadas.includes(nome)
                                    ? 'text-[#E89B55]'
                                    : 'text-[#CFB28C] hover:text-[#D28A4C]'
                            }`}
                        >
                            <span>{nome}</span>
                            <span>
                                ({quantidadesColecoes.get(nome) ?? 0})
                            </span>
                        </button>
                    ))}

                    {/* PREÇO */}

                    <div className="mb-5 mt-12">
                        <h3 className="mb-3 text-base font-bold text-[#F5F1EB]">
                            Faixa de preço
                        </h3>

                        <div className="relative mx-3 mb-4 h-4">
                            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#D28A4C]" />

                            <div
                                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#D28A4C]"
                                style={{
                                    left: `${posicaoMinima}%`,
                                    width: `${posicaoMaxima - posicaoMinima}%`,
                                }}
                            />

                            <input
                                type="range"
                                min="0.02"
                                max="12.30"
                                step="0.01"
                                value={precoMinimo}
                                onPointerDown={() => {
                                    precoArrastado.current = 'minimo'
                                }}
                                onPointerUp={() => {
                                    precoArrastado.current = null
                                }}
                                onPointerCancel={() => {
                                    precoArrastado.current = null
                                }}
                                onChange={atualizarPreco}
                                aria-label="Preço mínimo"
                                className="absolute inset-0 z-20 h-4 w-full cursor-pointer appearance-none bg-transparent accent-[#D28A4C]"
                            />

                            <input
                                type="range"
                                min="0.02"
                                max="12.30"
                                step="0.01"
                                value={precoMaximo}
                                onPointerDown={() => {
                                    precoArrastado.current = 'maximo'
                                }}
                                onPointerUp={() => {
                                    precoArrastado.current = null
                                }}
                                onPointerCancel={() => {
                                    precoArrastado.current = null
                                }}
                                onChange={atualizarPreco}
                                aria-label="Preço máximo"
                                className="absolute inset-0 z-10 h-4 w-full cursor-pointer appearance-none bg-transparent accent-[#D28A4C]"
                            />

                            <div
                                className="pointer-events-none absolute top-1/2 z-30 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#120B08] bg-[#D28A4C]"
                                style={{
                                    left: `${posicaoMinima}%`,
                                }}
                            />

                            <div
                                className="pointer-events-none absolute top-1/2 z-30 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#120B08] bg-[#D28A4C]"
                                style={{
                                    left: `${posicaoMaxima}%`,
                                }}
                            />
                        </div>

                        <p className="mb-3 px-3 text-sm text-[#F5F1EB]">
                            Preço:{' '}
                            {precoMinimo.toFixed(2).replace('.', ',')}
                            {' – '}
                            {precoMaximo.toFixed(2).replace('.', ',')}
                            {' ETH'}
                        </p>

                        <button
                            type="button"
                            onClick={aplicarFaixaPreco}
                            className="mt-0 rounded-md bg-[#D28A4C] px-3 py-2 text-sm font-bold text-[#20120B] hover:bg-[#E6A264]"
                        >
                            Aplicar
                        </button>
                    </div>

                    {/* REDES */}

                    <h3 className="mb-4 text-base font-bold text-[#F5F1EB]">
                        Rede
                    </h3>

                    {redes.map((nome) => (
                        <button
                            key={nome}
                            type="button"
                            onClick={() => alternarRede(nome)}
                            className={`mb-3 flex w-full items-center justify-between text-[13px] ${
                                redesSelecionadas.includes(nome)
                                    ? 'text-[#E89B55]'
                                    : 'text-[#CFB28C] hover:text-[#D28A4C]'
                            }`}
                        >
                            <span>{nome}</span>
                            <span>
                                ({quantidadesRedes.get(nome) ?? 0})
                            </span>
                        </button>
                    ))}
                </div>

                {/* NFT DESTAQUE */}

                {nfts.length > 1 && (
                    <div className="mt-5 bg-[#241612] p-4">
                        <h2 className="text-[24px] font-bold text-[#D28A4C]">
                            NFT EM DESTAQUE
                        </h2>

                        <p className="mb-3 text-center text-[22px] font-bold">
                            OFERTA LIMITADA
                        </p>

                        <div className="overflow-hidden rounded-xl">
                            <img
                                src={nfts[1].imagem}
                                alt={nfts[1].nome}
                                loading="lazy"
                                decoding="async"
                                className="aspect-square w-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </aside>

            {/* MERCADO */}

            <section id="mercado" className="min-w-0">
                <div className="flex items-center gap-[16px] overflow-x-auto whitespace-nowrap lg:justify-between lg:gap-6">
                    <div className="flex items-center gap-[16px] lg:gap-6">
                        {categorias.map((item) => (
                            <button
                                key={item.valor}
                                type="button"
                                onClick={() => setCategoria(item.valor)}
                                aria-pressed={categoria === item.valor}
                                className={`flex flex-col items-center gap-[6px] text-[14px] ${
                                    categoria === item.valor
                                        ? 'font-medium text-[#E89B55]'
                                        : 'font-normal text-[#F5F1EB]'
                                }`}
                            >
                                {item.nome}

                                <span
                                    className={`h-[2px] w-full rounded-full ${
                                        categoria === item.valor
                                            ? 'bg-[#E89B55]'
                                            : 'bg-transparent'
                                    }`}
                                />
                            </button>
                        ))}
                    </div>

                    <select
                        value={ordenacao}
                        onChange={(evento) =>
                            setOrdenacao(evento.target.value)
                        }
                        aria-label="Ordenar NFTs"
                        className="hidden bg-transparent text-xs text-[#CFB28C] outline-none xl:inline"
                    >
                        <option value="recentes">
                            Listados recentemente
                        </option>
                        <option value="menor-preco">
                            Menor preço
                        </option>
                        <option value="maior-preco">
                            Maior preço
                        </option>
                    </select>
                </div>

                {/* GRADE DE NFTS */}

                <div className="mt-[24px] grid grid-cols-2 items-start gap-x-[16px] gap-y-[24px] pb-[120px] lg:mt-6 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8 lg:pb-10">
                    {nftsDaPagina.map((nft, index) => (
                        <NFTCard
                            key={nft.id}
                            nft={nft}
                            index={index}
                            favoritos={favoritos}
                            alternarFavorito={alternarFavorito}
                        />
                    ))}
                </div>

                {nftsFiltrados.length === 0 && (
                    <p className="py-10 text-center text-sm text-[#CFB28C]">
                        Nenhum NFT encontrado.
                    </p>
                )}

                <Paginacao
                    paginaAtual={paginaAtual}
                    totalPaginas={totalPaginas}
                    irParaPagina={irParaPagina}
                />
            </section>
        </div>
    )
}

export default FiltrosMercado