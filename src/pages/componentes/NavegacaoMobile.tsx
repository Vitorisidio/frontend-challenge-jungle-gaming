import Home from '../Inicio/img/home-icon.svg'
import Salvos from '../Inicio/img/salvo-icon.svg'
import Menu from '../Inicio/img/menu-icon.svg'
import Comprar from '../Inicio/img/Shop.svg'
import Perfil from '../Inicio/img/meuPerfil-icon.svg'

function NavegacaoMobile() {
    return (
        <nav
            aria-label="Navegação mobile"
            className="fixed bottom-0 left-0 z-50 h-[96px] w-full bg-[#0D0806] lg:hidden"
        >
            <div className="absolute bottom-0 h-[80px] w-full rounded-t-[28px] bg-[#241612]">
                <div className="flex h-full items-center justify-around px-[16px]">
                    <button
                        type="button"
                        aria-label="Início"
                        className="flex h-[40px] w-[40px] items-center justify-center"
                    >
                        <img
                            src={Home}
                            alt=""
                            aria-hidden="true"
                            width={20}
                            height={20}
                            decoding="async"
                            className="h-[20px] w-[20px] object-contain"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Favoritos"
                        className="flex h-[40px] w-[40px] items-center justify-center"
                    >
                        <img
                            src={Salvos}
                            alt=""
                            aria-hidden="true"
                            width={22}
                            height={22}
                            decoding="async"
                            className="h-[22px] w-[22px] object-contain"
                        />
                    </button>

                    <div className="w-[64px] shrink-0" />

                    <button
                        type="button"
                        aria-label="Carrinho"
                        className="flex h-[40px] w-[40px] items-center justify-center"
                    >
                        <img
                            src={Comprar}
                            alt=""
                            aria-hidden="true"
                            width={20}
                            height={20}
                            decoding="async"
                            className="h-[20px] w-[20px] object-contain"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="Perfil"
                        className="flex h-[40px] w-[40px] items-center justify-center"
                    >
                        <img
                            src={Perfil}
                            alt=""
                            aria-hidden="true"
                            width={20}
                            height={20}
                            decoding="async"
                            className="h-[20px] w-[20px] object-contain"
                        />
                    </button>
                </div>
            </div>

            <button
                type="button"
                aria-label="Criar NFT"
                className="absolute left-1/2 top-[8px] flex h-[64px] w-[64px] -translate-x-1/2 items-center justify-center rounded-full bg-[#D28A4C66] shadow-[0_0_0_8px_#0D0806]"
            >
                <img
                    src={Menu}
                    alt=""
                    aria-hidden="true"
                    width={28}
                    height={28}
                    decoding="async"
                    className="h-[28px] w-[28px] object-contain"
                />
            </button>
        </nav>
    )
}

export default NavegacaoMobile