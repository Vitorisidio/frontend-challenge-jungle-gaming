import Lupa from '../Inicio/img/lupa-icon.svg'
import Config from '../Inicio/img/config-icon.svg'

interface HeaderMobileProps {
    pesquisa: string
    setPesquisa: React.Dispatch<React.SetStateAction<string>>
    setPaginaAtual: React.Dispatch<React.SetStateAction<number>>
}

function HeaderMobile({
    pesquisa,
    setPesquisa,
    setPaginaAtual,
}: HeaderMobileProps) {
    return (
        <header className="mx-[24px] mt-[40px] flex lg:hidden">
            <label
                htmlFor="busca-nft"
                className="flex h-[45px] min-w-0 flex-1 items-center gap-[8px] rounded-lg bg-[#241612] px-[12px]"
            >
                <img
                    src={Lupa}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    decoding="async"
                    className="h-5 w-5 shrink-0"
                />

                <input
                    id="busca-nft"
                    name="pesquisa"
                    type="search"
                    placeholder="Explorar coleções"
                    autoComplete="off"
                    value={pesquisa}
                    onChange={(evento) => {
                        setPesquisa(evento.target.value)
                        setPaginaAtual(1)
                    }}
                    className="w-full min-w-0 bg-transparent text-[14px] font-bold leading-[16px] text-[#B39463] outline-none placeholder:text-[#B39463] focus-visible:ring-1 focus-visible:ring-[#D28A4C]"
                />
            </label>

            <button
                type="button"
                aria-label="Configurações dos filtros"
                className="ml-[8px] flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[14px] bg-[#D28A4C] transition-colors hover:bg-[#E6A264] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B875]"
            >
                <img
                    src={Config}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    decoding="async"
                    className="h-5 w-5"
                />
            </button>
        </header>
    )
}

export default HeaderMobile