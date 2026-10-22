interface PaginacaoProps {
    paginaAtual: number
    totalPaginas: number
    irParaPagina: (pagina: number) => void
}

function Paginacao({
    paginaAtual,
    totalPaginas,
    irParaPagina,
}: PaginacaoProps) {
    if (totalPaginas <= 1) {
        return null
    }

    const paginaAnterior = paginaAtual > 1 ? paginaAtual - 1 : 1
    const proximaPagina =
        paginaAtual < totalPaginas ? paginaAtual + 1 : totalPaginas

    const paginas = Array.from(
        { length: totalPaginas },
        (_, index) => index + 1,
    )

    return (
        <nav
            aria-label="Paginação dos NFTs"
            className="mb-8 hidden flex-wrap items-center justify-end gap-2 lg:mb-4 lg:flex"
        >
            <button
                type="button"
                onClick={() => irParaPagina(paginaAnterior)}
                disabled={paginaAtual === 1}
                aria-label="Página anterior"
                className="rounded-md border border-[#5A3A28] px-3 py-2 text-sm text-[#F5F1EB] transition-colors hover:border-[#D28A4C] hover:text-[#D28A4C] disabled:cursor-not-allowed disabled:opacity-40"
            >
                ←
            </button>

            {paginas.map((pagina) => {
                const paginaSelecionada = paginaAtual === pagina

                return (
                    <button
                        key={pagina}
                        type="button"
                        onClick={() => irParaPagina(pagina)}
                        aria-label={`Ir para a página ${pagina}`}
                        aria-current={paginaSelecionada ? 'page' : undefined}
                        className={`h-9 min-w-9 rounded-md border px-3 text-sm transition-colors ${
                            paginaSelecionada
                                ? 'border-[#D28A4C] bg-[#D28A4C] font-bold text-[#20120B]'
                                : 'border-[#5A3A28] text-[#F5F1EB] hover:border-[#D28A4C] hover:text-[#D28A4C]'
                        }`}
                    >
                        {pagina}
                    </button>
                )
            })}

            <button
                type="button"
                onClick={() => irParaPagina(proximaPagina)}
                disabled={paginaAtual === totalPaginas}
                aria-label="Próxima página"
                className="rounded-md border border-[#5A3A28] px-3 py-2 text-sm text-[#F5F1EB] transition-colors hover:border-[#D28A4C] hover:text-[#D28A4C] disabled:cursor-not-allowed disabled:opacity-40"
            >
                →
            </button>
        </nav>
    )
}

export default Paginacao