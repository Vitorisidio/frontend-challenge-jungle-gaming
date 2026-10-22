import { nfts } from '../../data/nfts'

interface CardsLancamentosProps {
    nftsDestaque: typeof nfts
    setCategoria: React.Dispatch<React.SetStateAction<string>>
    setPesquisa: React.Dispatch<React.SetStateAction<string>>
    setPaginaAtual: React.Dispatch<React.SetStateAction<number>>
}

function CardsLancamentos({
    nftsDestaque,
    setCategoria,
    setPesquisa,
    setPaginaAtual,
}: CardsLancamentosProps) {
    function explorar() {
        setCategoria('todos')
        setPesquisa('')
        setPaginaAtual(1)
    }

    const cards = [
        {
            imagem: nftsDestaque[0]?.imagem,
            alt: 'Lançamentos Gênesis',
            titulo: 'Lançamentos Gênesis de edição limitada',
            descricao:
                'Colecione edições escassas diretamente dos criadores antes da revelação pública.',
        },
        {
            imagem: nftsDestaque[1]?.imagem,
            alt: 'Arte digital',
            titulo: 'Arte digital selecionada e muito mais',
            descricao:
                'Explore novos artistas, coleções verificadas e obras digitais que definem a cultura.',
        },
    ]

    return (
        <section
            aria-label="Lançamentos e coleções"
            className="mt-[96px] hidden gap-[12px] lg:flex"
        >
            {cards.map((card) => (
                <article
                    key={card.titulo}
                    className="flex h-[250px] min-w-0 flex-1 overflow-hidden rounded-[8px] bg-[#241612]"
                >
                    <div className="h-full w-1/2 shrink-0 bg-[#DCCDAA]">
                        {card.imagem && (
                            <img
                                src={card.imagem}
                                alt={card.alt}
                                loading="lazy"
                                decoding="async"
                                width={250}
                                height={250}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col items-end justify-center px-5 py-4 text-right">
                        <h2 className="text-[20px] font-bold leading-[26px] text-[#FFFFFFFF]">
                            {card.titulo}
                        </h2>

                        <p className="mt-3 text-[12px] leading-[18px] text-[#CFB28C]">
                            {card.descricao}
                        </p>

                        <button
                            type="button"
                            onClick={explorar}
                            className="mt-4 flex items-center gap-2 rounded bg-[#D28A4C] px-5 py-2.5 text-[12px] font-bold text-[#20120B] transition-colors hover:bg-[#F5B875] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B875]"
                        >
                            EXPLORAR
                            <span aria-hidden="true" className="text-sm">
                                →
                            </span>
                        </button>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default CardsLancamentos