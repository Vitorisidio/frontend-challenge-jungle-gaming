import { Link, useRouterState } from '@tanstack/react-router'

import Lupa from '../Inicio/img/lupa-icon.svg'
import Carrinho from '../Inicio/img/carrinhoCompras.svg'
import Login from '../Inicio/img/login-icon.svg'

function HeaderDesktop() {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    })

    const mercadoAtivo =
        pathname === '/mercado' || pathname.startsWith('/nft/')

    const inicioAtivo = pathname === '/'

    const classeAtiva =
        'flex h-full items-center border-b-2 border-[#D28A4C] px-1 text-[#D28A4C]'

    const classeInativa =
        'flex h-full items-center border-b-2 border-transparent px-1 text-[#F5F1EB] transition-colors hover:text-[#D28A4C]'

    return (
        <header className="hidden h-[72px] border-b border-[#3A271D] lg:block">
            <div className="mx-auto flex h-full max-w-[1312px] items-center justify-between px-6">
                <Link
                    to="/"
                    aria-label="Kurio — página inicial"
                    className="text-[16px] font-bold tracking-[2px] text-[#F5F1EB] transition-colors hover:text-[#D28A4C]"
                >
                    KURIO
                </Link>

                <nav
                    aria-label="Navegação principal"
                    className="flex h-full items-center gap-8 text-[14px]"
                >
                    <Link
                        to="/"
                        aria-current={inicioAtivo ? 'page' : undefined}
                        className={classeAtiva.replace(
                            'border-[#D28A4C] text-[#D28A4C]',
                            inicioAtivo
                                ? 'border-[#D28A4C] text-[#D28A4C]'
                                : 'border-transparent text-[#F5F1EB]',
                        ) + (!inicioAtivo ? ' transition-colors hover:text-[#D28A4C]' : '')}
                    >
                        Início
                    </Link>

                    <Link
                        to="/mercado"
                        aria-current={
                            pathname === '/mercado' ? 'page' : undefined
                        }
                        className={mercadoAtivo ? classeAtiva : classeInativa}
                    >
                        Mercado
                    </Link>

                    <a
                        href="/#criadores"
                        className="flex h-full items-center border-b-2 border-transparent px-1 text-[#F5F1EB] transition-colors hover:text-[#D28A4C]"
                    >
                        Criadores
                    </a>

                    <a
                        href="/#diario"
                        className="flex h-full items-center border-b-2 border-transparent px-1 text-[#F5F1EB] transition-colors hover:text-[#D28A4C]"
                    >
                        Aprenda
                    </a>
                </nav>

                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        aria-label="Pesquisar NFTs"
                        onClick={() =>
                            document.getElementById('busca-nft')?.focus()
                        }
                        className="rounded p-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                    >
                        <img
                            src={Lupa}
                            alt=""
                            aria-hidden="true"
                            width={20}
                            height={20}
                            className="h-5 w-5 brightness-0 invert"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Carrinho de compras"
                        className="rounded p-1 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D28A4C]"
                    >
                        <img
                            src={Carrinho}
                            alt=""
                            aria-hidden="true"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                        />
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-md bg-[#D28A4C] px-4 py-2 text-[13px] font-semibold text-[#20120B] transition-colors hover:bg-[#E6A264] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B875]"
                    >
                        <img
                            src={Login}
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                            className="h-4 w-4"
                        />
                        Entrar
                    </button>
                </div>
            </div>
        </header>
    )
}

export default HeaderDesktop