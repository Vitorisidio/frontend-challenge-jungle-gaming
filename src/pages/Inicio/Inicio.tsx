import { useEffect, useMemo, useState } from 'react'

import { nfts } from '../../data/nfts'
import HeaderDesktop from '../componentes/HeaderDesktop'
import HeaderMobile from '../componentes/HeaderMobile'
import BannerPrincipal from '../componentes/BannerPrincipal'
import FiltrosMercado from '../componentes/FiltrosMercado'
import NavegacaoMobile from '../componentes/NavegacaoMobile'
import CardsLancamentos from '../componentes/CardsLancamentos'
import DiarioCunhagem from '../componentes/DiarioCunhagem'
import Footer from '../../components/footer'

function TelaInicio() {
    const [pesquisa, setPesquisa] = useState('')
    const [categoria, setCategoria] = useState('todos')
    const [bannerAtual, setBannerAtual] = useState(0)

    const [colecoesSelecionadas, setColecoesSelecionadas] =
        useState<string[]>([])

    const [redesSelecionadas, setRedesSelecionadas] =
        useState<string[]>([])

    const [precoMinimo, setPrecoMinimo] = useState(0.02)
    const [precoMaximo, setPrecoMaximo] = useState(12.30)

    const [faixaAplicada, setFaixaAplicada] = useState({
        minimo: 0.02,
        maximo: 12.30,
    })

    const [favoritos, setFavoritos] =
        useState<(typeof nfts)[number]['id'][]>([])

    const [ordenacao, setOrdenacao] = useState('recentes')
    const [paginaAtual, setPaginaAtual] = useState(1)

    const nftsPorPagina = 9

    const nftsDestaque = useMemo(
        () => nfts.slice(0, 3),
        [],
    )

    const colecoes = [
        'Arte digital',
        'Fotografia',
        'Música',
        'Arte 3D',
        'Colecionáveis',
        'Generativa',
        'Jogos',
        'Assinaturas',
        'Utilidade',
    ]

    const redes = [
        'Ethereum',
        'Polygon',
        'Solana',
    ]

    const categorias = [
        { nome: 'Todos os NFTs', valor: 'todos' },
        { nome: 'Novos lançamentos', valor: 'novos' },
        { nome: 'Em alta', valor: 'em-alta' },
    ]

    const nftsFiltrados = useMemo(() => {
        const pesquisaNormalizada = pesquisa.toLowerCase()

        return nfts.filter((nft) => {
            const nomeCombina = nft.nome
                .toLowerCase()
                .includes(pesquisaNormalizada)

            const categoriaCombina =
                categoria === 'todos' ||
                nft.categoria === categoria

            const colecaoCombina =
                colecoesSelecionadas.length === 0 ||
                colecoesSelecionadas.includes(nft.colecao)

            const redeCombina =
                redesSelecionadas.length === 0 ||
                redesSelecionadas.includes(nft.rede)

            const precoCombina =
                nft.precoNumerico >= faixaAplicada.minimo &&
                nft.precoNumerico <= faixaAplicada.maximo

            return (
                nomeCombina &&
                categoriaCombina &&
                colecaoCombina &&
                redeCombina &&
                precoCombina
            )
        })
    }, [
        pesquisa,
        categoria,
        colecoesSelecionadas,
        redesSelecionadas,
        faixaAplicada,
    ])

    const nftsOrdenados = useMemo(() => {
        const resultado = [...nftsFiltrados]

        if (ordenacao === 'menor-preco') {
            resultado.sort(
                (a, b) => a.precoNumerico - b.precoNumerico,
            )
        } else if (ordenacao === 'maior-preco') {
            resultado.sort(
                (a, b) => b.precoNumerico - a.precoNumerico,
            )
        }

        return resultado
    }, [nftsFiltrados, ordenacao])

    const totalPaginas = Math.ceil(
        nftsOrdenados.length / nftsPorPagina,
    )

    const nftsDaPagina = useMemo(
        () =>
            nftsOrdenados.slice(
                (paginaAtual - 1) * nftsPorPagina,
                paginaAtual * nftsPorPagina,
            ),
        [nftsOrdenados, paginaAtual],
    )

    useEffect(() => {
        if (totalPaginas === 0) {
            if (paginaAtual !== 1) {
                setPaginaAtual(1)
            }

            return
        }

        if (paginaAtual > totalPaginas) {
            setPaginaAtual(totalPaginas)
        }
    }, [paginaAtual, totalPaginas])

    function alternarColecao(nome: string) {
        setColecoesSelecionadas((atuais) =>
            atuais.includes(nome)
                ? atuais.filter((item) => item !== nome)
                : [...atuais, nome],
        )

        setPaginaAtual(1)
    }

    function alternarRede(nome: string) {
        setRedesSelecionadas((atuais) =>
            atuais.includes(nome)
                ? atuais.filter((item) => item !== nome)
                : [...atuais, nome],
        )

        setPaginaAtual(1)
    }

    function alternarFavorito(
        id: (typeof nfts)[number]['id'],
    ) {
        setFavoritos((atuais) =>
            atuais.includes(id)
                ? atuais.filter((item) => item !== id)
                : [...atuais, id],
        )
    }

    function aplicarFaixaPreco() {
        setFaixaAplicada({
            minimo: precoMinimo,
            maximo: precoMaximo,
        })

        setPaginaAtual(1)
    }

    function irParaPagina(pagina: number) {
        const paginaValida = Math.max(
            1,
            Math.min(pagina, totalPaginas),
        )

        setPaginaAtual(paginaValida)
    }

    return (
        <div
            className="
                min-h-screen
                bg-[#120B08]
                text-[#F5F1EB]

                [&_button]:cursor-pointer
                [&_button]:transition-transform
                [&_button]:duration-200
                [&_button:hover]:scale-[1.04]
                [&_button:disabled]:cursor-not-allowed
                [&_button:disabled:hover]:scale-100

                [&_a]:cursor-pointer
                [&_a]:transition-transform
                [&_a]:duration-200
                [&_a:hover]:scale-[1.04]

                [&_select]:cursor-pointer
                [&_input[type=range]]:cursor-pointer
            "
        >
            <HeaderDesktop />

            <HeaderMobile
                pesquisa={pesquisa}
                setPesquisa={setPesquisa}
                setPaginaAtual={setPaginaAtual}
            />

            <main
                id="inicio"
                className="mx-[24px] mt-[16px] flex flex-col pb-8 lg:mx-auto lg:mt-8 lg:max-w-[1312px]"
            >
                <BannerPrincipal
                    nftsDestaque={nftsDestaque}
                    bannerAtual={bannerAtual}
                    setBannerAtual={setBannerAtual}
                    setCategoria={setCategoria}
                    setPesquisa={setPesquisa}
                    setPaginaAtual={setPaginaAtual}
                />

                <FiltrosMercado
                    categoria={categoria}
                    setCategoria={setCategoria}
                    colecoes={colecoes}
                    redes={redes}
                    colecoesSelecionadas={colecoesSelecionadas}
                    redesSelecionadas={redesSelecionadas}
                    alternarColecao={alternarColecao}
                    alternarRede={alternarRede}
                    precoMinimo={precoMinimo}
                    precoMaximo={precoMaximo}
                    setPrecoMinimo={setPrecoMinimo}
                    setPrecoMaximo={setPrecoMaximo}
                    aplicarFaixaPreco={aplicarFaixaPreco}
                    favoritos={favoritos}
                    alternarFavorito={alternarFavorito}
                    nftsFiltrados={nftsFiltrados}
                    nftsDaPagina={nftsDaPagina}
                    categorias={categorias}
                    paginaAtual={paginaAtual}
                    totalPaginas={totalPaginas}
                    irParaPagina={irParaPagina}
                    ordenacao={ordenacao}
                    setOrdenacao={setOrdenacao}
                />

                <NavegacaoMobile />

                <CardsLancamentos
                    nftsDestaque={nftsDestaque}
                    setCategoria={setCategoria}
                    setPesquisa={setPesquisa}
                    setPaginaAtual={setPaginaAtual}
                />

                <DiarioCunhagem nfts={nfts} />
            </main>

            <Footer />
        </div>
    )
}

export default TelaInicio