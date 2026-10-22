
import { memo, useMemo, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'

import HeaderDesktop from '../componentes/HeaderDesktop'
import Footer from '../../components/footer'

import { nfts } from '../../data/nfts'

const imagensRelacionadasMax = 3
const relacionadosMax = 5

function DetalhesNFT() {
    const { id } = useParams({ from: '/nft/$id' })

    const nft = useMemo(
        () => nfts.find((item) => String(item.id) === id),
        [id],
    )

    const [imagemAtual, setImagemAtual] = useState(0)
    const [quantidade, setQuantidade] = useState(1)
    const [favorito, setFavorito] = useState(false)
    const [abaAtiva, setAbaAtiva] = useState('detalhes')

    const imagensNFT = useMemo(() => {
        if (!nft) return []

        return [
            nft.imagem,
            ...nfts
                .filter((item) => item.id !== nft.id)
                .slice(0, imagensRelacionadasMax)
                .map((item) => item.imagem),
        ]
    }, [nft])

    const relacionados = useMemo(() => {
        if (!nft) return []

        return nfts
            .filter(
                (item) =>
                    item.id !== nft.id &&
                    item.colecao === nft.colecao,
            )
            .slice(0, relacionadosMax)
    }, [nft])

    if (!nft) {
        return (
            <div className="flex min-h-screen flex-col bg-[#120B08] text-[#F5F1EB]">
                <HeaderDesktop />

                <main className="mx-auto flex w-full max-w-[1312px] flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold">
                        NFT não encontrado
                    </h1>

                    <p className="mt-3 text-[#B39463]">
                        Esse item não existe ou não está disponível.
                    </p>

                    <Link
                        to="/mercado"
                        className="mt-6 rounded-md bg-[#D28A4C] px-6 py-3 font-bold text-[#20120B] transition-colors hover:bg-[#E6A264]"
                    >
                        Voltar ao mercado
                    </Link>
                </main>

                <Footer />
            </div>
        )
    }

    const tokenId = String(nft.id).padStart(4, '0')
    const descricaoAtributos = nft.raridade ? 'Raro' : 'Colecionável'

    const alternarFavorito = () => {
        setFavorito((atual) => !atual)
    }

    const diminuirQuantidade = () => {
        setQuantidade((atual) => Math.max(1, atual - 1))
    }

    const aumentarQuantidade = () => {
        setQuantidade((atual) => Math.min(10, atual + 1))
    }

    const copiarLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
        } catch {
            // A cópia pode não estar disponível neste navegador.
        }
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#120B08] text-[#F5F1EB] [&_button]:cursor-pointer [&_a]:cursor-pointer">
            {/* DESKTOP */}
            <div className="hidden lg:block">
                <HeaderDesktop />

                <main className="mx-auto w-full max-w-[1312px] px-8 pb-16 pt-8">
                    {/* CAMINHO DA PÁGINA */}
                    <p className="mb-6 text-xs text-[#CFB28C]">
                        <Link to="/" className="hover:text-[#D28A4C]">
                            Início
                        </Link>

                        <span className="mx-2">/</span>

                        <Link to="/mercado" className="hover:text-[#D28A4C]">
                            Mercado
                        </Link>

                        <span className="mx-2">/</span>

                        <span className="text-[#F5F1EB]">
                            {nft.nome} {nft.codigo}
                        </span>
                    </p>

                    {/* GALERIA E INFORMAÇÕES */}
                    <section className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] gap-10">
                        {/* GALERIA */}
                        <div className="flex min-w-0 gap-4">
                            <div className="flex w-[70px] shrink-0 flex-col gap-3">
                                {imagensNFT.map((imagem, index) => (
                                    <button
                                        key={`${imagem}-${index}`}
                                        type="button"
                                        onClick={() => setImagemAtual(index)}
                                        aria-label={`Ver imagem ${index + 1}`}
                                        aria-pressed={imagemAtual === index}
                                        className={`h-[70px] w-[70px] overflow-hidden rounded-md border-2 ${
                                            imagemAtual === index
                                                ? 'border-[#D28A4C]'
                                                : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={imagem}
                                            alt={`Miniatura ${index + 1}`}
                                            width={70}
                                            height={70}
                                            loading="lazy"
                                            fetchPriority="low"
                                            decoding="async"
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            <div className="group relative min-w-0 flex-1 overflow-hidden rounded-lg bg-[#241612] p-3">
                                <img
                                    src={imagensNFT[imagemAtual]}
                                    alt={nft.nome}
                                    width={600}
                                    height={600}
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="aspect-square w-full rounded-2xl object-cover"
                                />

                                <span className="absolute right-6 top-6 rounded-full bg-[#120B08]/80 px-3 py-1 text-xs text-[#F5F1EB]">
                                    {nft.raridade ? 'RARO' : 'COLECIONÁVEL'}
                                </span>
                            </div>
                        </div>

                        {/* INFORMAÇÕES */}
                        <div className="min-w-0">
                            <p className="text-sm text-[#B39463]">
                                {nft.colecao}
                            </p>

                            <h1 className="mt-2 text-3xl font-bold">
                                {nft.nome} {nft.codigo}
                            </h1>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs text-[#B39463]">
                                        Preço atual
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-[#E89B55]">
                                        {nft.preco}
                                    </p>
                                </div>

                                <div className="text-sm text-[#D28A4C]">
                                    ★★★★★
                                    <span className="ml-2 text-xs text-[#CFB28C]">
                                        Avaliações de colecionadores
                                    </span>
                                </div>
                            </div>

                            <div className="my-5 border-t border-[#3A271D]" />

                            <h2 className="font-bold">Sobre este NFT</h2>

                            <p className="mt-3 text-sm leading-6 text-[#B39463]">
                                Conheça esta peça digital da coleção {nft.colecao}.
                                Explore seus atributos, sua arte e os detalhes
                                que tornam cada item único no universo Kurio.
                            </p>

                            {/* EDIÇÃO */}
                            <div className="mt-5">
                                <h3 className="text-sm font-bold">Edição:</h3>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {['1/1', '1/10', '1/50', 'ABERTA'].map(
                                        (edicao, index) => (
                                            <span
                                                key={edicao}
                                                className={`rounded-full border px-3 py-1 text-xs ${
                                                    index === 2
                                                        ? 'border-[#D28A4C] text-[#E89B55]'
                                                        : 'border-[#5A3A28] text-[#B39463]'
                                                }`}
                                            >
                                                {edicao}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* QUANTIDADE E AÇÕES */}
                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={diminuirQuantidade}
                                        aria-label="Diminuir quantidade"
                                        disabled={quantidade <= 1}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D28A4C] text-xl font-bold text-[#20120B] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        −
                                    </button>

                                    <span className="min-w-4 text-center">
                                        {quantidade}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={aumentarQuantidade}
                                        aria-label="Aumentar quantidade"
                                        disabled={quantidade >= 10}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D28A4C] text-xl font-bold text-[#20120B] transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="flex-1 rounded-md bg-[#D28A4C] px-5 py-3 text-sm font-bold text-[#20120B] hover:bg-[#E6A264]"
                                >
                                    COMPRAR
                                </button>

                                <button
                                    type="button"
                                    onClick={alternarFavorito}
                                    aria-pressed={favorito}
                                    className="rounded-md border border-[#D28A4C] px-4 py-3 text-sm text-[#D28A4C] hover:bg-[#241612]"
                                >
                                    {favorito ? '♥ Favoritado' : '♡ Favoritar'}
                                </button>
                            </div>

                            {/* METADADOS */}
                            <div className="mt-6 space-y-3 text-sm text-[#B39463]">
                                <p>ID do token: #{tokenId}</p>
                                <p>Coleção: {nft.colecao}</p>
                                <p>Atributos: {descricaoAtributos}</p>
                            </div>

                            {/* COMPARTILHAR */}
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                                <span className="font-bold">
                                    Compartilhar este NFT:
                                </span>

                                <button
                                    type="button"
                                    onClick={copiarLink}
                                    className="text-[#D28A4C] hover:text-[#E6A264]"
                                >
                                    Copiar link
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ABAS */}
                    <section className="mt-16">
                        <div className="flex gap-7 border-b border-[#3A271D]">
                            <button
                                type="button"
                                onClick={() => setAbaAtiva('detalhes')}
                                aria-pressed={abaAtiva === 'detalhes'}
                                className={`border-b-2 pb-3 text-sm ${
                                    abaAtiva === 'detalhes'
                                        ? 'border-[#D28A4C] font-bold text-[#D28A4C]'
                                        : 'border-transparent text-[#F5F1EB]'
                                }`}
                            >
                                Detalhes do NFT
                            </button>

                            <button
                                type="button"
                                onClick={() => setAbaAtiva('avaliacoes')}
                                aria-pressed={abaAtiva === 'avaliacoes'}
                                className={`border-b-2 pb-3 text-sm ${
                                    abaAtiva === 'avaliacoes'
                                        ? 'border-[#D28A4C] font-bold text-[#D28A4C]'
                                        : 'border-transparent text-[#F5F1EB]'
                                }`}
                            >
                                Avaliações de colecionadores
                            </button>
                        </div>

                        {abaAtiva === 'detalhes' ? (
                            <div className="space-y-5 py-5 text-sm leading-6 text-[#B39463]">
                                <p>
                                    {nft.nome} {nft.codigo} faz parte da coleção{' '}
                                    {nft.colecao}. Explore os detalhes da obra
                                    e descubra outros itens disponíveis no mercado.
                                </p>

                                <div>
                                    <h3 className="font-bold text-[#F5F1EB]">
                                        Rede:
                                    </h3>
                                    <p>
                                        {nft.rede || 'Rede não informada no cadastro'}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#F5F1EB]">
                                        Procedência:
                                    </h3>
                                    <p>
                                        Consulte os metadados e as informações
                                        de origem cadastradas para este ativo.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-[#F5F1EB]">
                                        Direitos autorais:
                                    </h3>
                                    <p>
                                        Consulte as condições de uso e os direitos
                                        associados à obra antes da aquisição.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-sm text-[#B39463]">
                                <h3 className="font-bold text-[#F5F1EB]">
                                    Avaliações de colecionadores
                                </h3>
                                <p className="mt-3">
                                    Ainda não há avaliações cadastradas para exibir.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* MAIS DESTA COLEÇÃO */}
                    {relacionados.length > 0 && (
                        <section className="mt-14">
                            <h2 className="border-b border-[#3A271D] pb-4 text-xl font-bold text-[#E89B55]">
                                Mais desta coleção
                            </h2>

                            <div className="mt-6 grid grid-cols-5 gap-5">
                                {relacionados.map((item) => (
                                    <Link
                                        key={item.id}
                                        to="/nft/$id"
                                        params={{ id: String(item.id) }}
                                        className="min-w-0 transition hover:-translate-y-1"
                                    >
                                        <div className="rounded-lg bg-[#241612] p-2">
                                            <img
                                                src={item.imagem}
                                                alt={item.nome}
                                                width={250}
                                                height={250}
                                                loading="lazy"
                                                fetchPriority="low"
                                                decoding="async"
                                                className="aspect-square w-full rounded-md object-cover"
                                            />
                                        </div>

                                        <h3 className="mt-3 truncate text-sm">
                                            {item.nome} {item.codigo}
                                        </h3>

                                        <p className="mt-1 text-sm font-bold text-[#E89B55]">
                                            {item.preco}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <Footer />
            </div>

            {/* MOBILE */}
            <div className="relative min-h-screen bg-[#120B08] lg:hidden">
                <section className="relative rounded-t-[38px] bg-gradient-to-b from-[#2A1912] to-[#1D100C] px-4 pb-0 pt-6 sm:px-7">
                    <div className="absolute left-7 right-7 top-6 z-20 flex items-center justify-between">
                        <Link
                            to="/"
                            aria-label="Voltar ao mercado"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#4A2B1C] bg-[#2C1A12]/80 text-[#D9B38A] transition-colors hover:bg-[#42271A]"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </Link>

                        <button
                            type="button"
                            onClick={alternarFavorito}
                            aria-label={
                                favorito
                                    ? 'Remover dos favoritos'
                                    : 'Adicionar aos favoritos'
                            }
                            aria-pressed={favorito}
                            className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#4A2B1C] bg-[#2C1A12]/80 transition-colors hover:bg-[#42271A] ${
                                favorito ? 'text-[#E89B55]' : 'text-[#D28A4C]'
                            }`}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill={favorito ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                            </svg>
                        </button>
                    </div>

                    {/* IMAGEM PRINCIPAL */}
                    <div className="overflow-hidden rounded-[24px] bg-[#E9E8CB]">
                        <img
                            src={imagensNFT[imagemAtual]}
                            alt={nft.nome}
                            width={450}
                            height={495}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="aspect-[0.91/1] w-full object-cover object-center"
                        />
                    </div>

                    {/* MINIATURAS */}
                    {imagensNFT.length > 1 && (
                        <div className="flex justify-center gap-2 overflow-x-auto py-3">
                            {imagensNFT.map((imagem, index) => (
                                <button
                                    key={`${imagem}-mobile-${index}`}
                                    type="button"
                                    onClick={() => setImagemAtual(index)}
                                    aria-label={`Ver imagem ${index + 1}`}
                                    aria-pressed={imagemAtual === index}
                                    className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border ${
                                        imagemAtual === index
                                            ? 'border-[#D28A4C]'
                                            : 'border-[#4A2B1C]'
                                    }`}
                                >
                                    <img
                                        src={imagem}
                                        alt=""
                                        width={48}
                                        height={48}
                                        loading="lazy"
                                        fetchPriority="low"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                {/* PAINEL DE INFORMAÇÕES */}
                <section className="relative z-10 -mt-1 rounded-t-[10px] bg-[#241510] px-6 pb-8 pt-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h1 className="min-w-0 break-words text-[20px] font-bold tracking-[0.2px]">
                            {nft.nome} {nft.codigo}
                        </h1>

                        <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#A76B36] px-2 py-1 text-xs text-[#F0D4B0]">
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-[#E89B55]"
                                aria-hidden="true"
                            >
                                <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
                            </svg>

                            <span>4.8</span>
                            <span className="text-[#B39463]">(19)</span>
                        </div>
                    </div>

                    <p className="mt-4 text-[14px] leading-[24px] tracking-[0.15px] text-[#C5A982]">
                        Um colecionável digital da coleção {nft.colecao},
                        verificado na blockchain.
                    </p>

                    {/* EDIÇÃO */}
                    <div className="mt-3">
                        <h2 className="text-sm font-bold">Edição:</h2>

                        <div className="mt-1.5 flex flex-wrap gap-2">
                            {['1/10', '1/10', '1/50', 'ABERTA'].map(
                                (edicao, index) => (
                                    <button
                                        key={`${edicao}-${index}`}
                                        type="button"
                                        className={`rounded-full border px-2.5 py-1 text-xs tracking-wide ${
                                            index === 2
                                                ? 'border-[#D28A4C] text-[#E89B55]'
                                                : 'border-[#4A2B1C] text-[#B39463]'
                                        }`}
                                    >
                                        {edicao}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>

                    {/* METADADOS */}
                    <div className="mt-3 space-y-2.5 text-[14px] tracking-[0.15px] text-[#B39463]">
                        <p>ID do token: #{tokenId}</p>
                        <p>Coleção: {nft.colecao}</p>
                        <p className="break-words">
                            Atributos: Óculos, Esmeralda, {descricaoAtributos}
                        </p>
                    </div>
                </section>

                {/* BARRA INFERIOR DE COMPRA */}
                <section className="relative z-20 -mt-1 rounded-t-[12px] bg-[#21120D] px-6 pb-8 pt-5 shadow-[0_-8px_28px_rgba(0,0,0,0.55)]">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[#C5A982]">
                                Qtd.
                            </span>

                            <button
                                type="button"
                                onClick={diminuirQuantidade}
                                aria-label="Diminuir quantidade"
                                disabled={quantidade <= 1}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D28A4C] text-lg font-bold text-[#20120B] transition-colors hover:bg-[#E6A264] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                −
                            </button>

                            <span className="min-w-3 text-center text-base">
                                {quantidade}
                            </span>

                            <button
                                type="button"
                                onClick={aumentarQuantidade}
                                aria-label="Aumentar quantidade"
                                disabled={quantidade >= 10}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D28A4C] text-lg font-bold text-[#20120B] transition-colors hover:bg-[#E6A264] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                +
                            </button>
                        </div>

                        <p className="shrink-0 text-lg font-bold tracking-wide text-[#E89B55] sm:text-xl">
                            {nft.preco}
                        </p>
                    </div>

                    {/* BOTÕES DE COMPRA */}
                    <div className="mt-5 flex items-center gap-3">
                        <button
                            type="button"
                            className="flex h-[60px] min-w-0 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-[#E39A54] to-[#B9773F] px-4 text-sm font-bold text-[#1B100B] transition-opacity hover:opacity-90 sm:text-base"
                        >
                            Comprar NFT
                        </button>

                        <button
                            type="button"
                            aria-label="Adicionar ao carrinho"
                            className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-[#4A2B1C] bg-[#2B1911] text-[#B88A56] transition-colors hover:bg-[#3B2417]"
                        >
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 3H2v2h1.8l2.7 11.4A2 2 0 0 0 8.4 18h9.8a2 2 0 0 0 1.9-1.4L23 8H6.1L5.2 3ZM7 10h13.3l-1.9 6H8.4L7 10Z" />
                            </svg>
                        </button>
                    </div>
                </section>

                <div className="h-5 bg-[#21120D]" />
            </div>
        </div>
    )
}

export default memo(DetalhesNFT)
