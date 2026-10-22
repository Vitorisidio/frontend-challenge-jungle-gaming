function Footer() {
    const beneficios = [
        {
            inicial: 'W',
            titulo: 'Segurança da carteira',
            linhas: (
                <>
                    Proteja sua carteira e
                    <br />
                    colecione arte digital
                    <br />
                    verificada com
                    <br />
                    confiança.
                </>
            ),
        },
        {
            inicial: 'C',
            titulo: 'Criadores em destaque',
            linhas: (
                <>
                    Conheça artistas,
                    <br />
                    estúdios e comunidades
                    <br />
                    que moldam a cultura
                    <br />
                    digital na rede.
                </>
            ),
        },
        {
            inicial: 'D',
            titulo: 'Alertas de lançamentos',
            linhas: (
                <>
                    Receba calendários de
                    <br />
                    cunhagem, novidades de
                    <br />
                    listas de acesso e
                    <br />
                    análises do mercado.
                </>
            ),
        },
    ]

    const gruposLinks = [
        {
            titulo: 'Meu perfil',
            links: [
                'Meu perfil',
                'Minha coleção',
                'Atividade',
                'Estúdio do criador',
                'Lista de interesse',
            ],
        },
        {
            titulo: 'Central de ajuda',
            links: [
                'Central de ajuda',
                'Como comprar NFTs',
                'Carteira e segurança',
                'Política do mercado',
                'Denunciar item',
            ],
        },
        {
            titulo: 'Coleções',
            links: [
                'Arte digital',
                'Fotografia',
                'Música',
                'Arte 3D',
                'Utilidade',
            ],
        },
    ]

    const redesSociais = [
        { nome: 'Facebook', simbolo: 'f', tamanho: 'text-[16px]' },
        { nome: 'Instagram', simbolo: '◎', tamanho: 'text-[16px]' },
        { nome: 'Twitter', simbolo: '♥', tamanho: 'text-[16px]' },
        { nome: 'LinkedIn', simbolo: 'in', tamanho: 'text-[15px]' },
        { nome: 'YouTube', simbolo: '▶', tamanho: 'text-[15px]' },
    ]

    return (
        <footer className="hidden w-full bg-[#1F130F] text-[#F5F1EB] lg:block">
            {/* BENEFÍCIOS */}
            <section className="border-b border-[#5A3A28]">
                <div className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-4">
                    {beneficios.map((beneficio) => (
                        <div
                            key={beneficio.inicial}
                            className="border-b border-[#5A3A28] px-8 py-8 lg:border-b-0 lg:border-r"
                        >
                            <div
                                aria-hidden="true"
                                className="mb-3 flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#D28A4C]"
                            >
                                <span className="text-[22px] font-bold text-[#20120B]">
                                    {beneficio.inicial}
                                </span>
                            </div>

                            <h3 className="text-[17px] font-bold">
                                {beneficio.titulo}
                            </h3>

                            <p className="mt-2 max-w-[210px] text-[14px] leading-[22px] text-[#CFB28C]">
                                {beneficio.linhas}
                            </p>
                        </div>
                    ))}

                    {/* NEWSLETTER */}
                    <div className="px-8 py-8">
                        <h3 className="text-[18px] font-bold leading-[19px]">
                            Antecipe-se ao próximo
                            <br />
                            lançamento
                        </h3>

                        <form
                            className="mt-4 flex h-[40px] w-full overflow-hidden rounded-[6px]"
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <input
                                type="email"
                                aria-label="Seu e-mail"
                                placeholder="digite seu e-mail..."
                                className="min-w-0 flex-1 bg-[#3A2113] px-3 text-[13px] text-[#F5F1EB] outline-none placeholder:text-[#B39463] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D28A4C]"
                            />

                            <button
                                type="submit"
                                className="shrink-0 bg-[#D28A4C] px-5 text-[15px] font-bold text-[#20120B] transition-colors hover:bg-[#F5B875]"
                            >
                                Enviar
                            </button>
                        </form>

                        <p className="mt-3 text-[13px] leading-[21px] text-[#CFB28C]">
                            Receba lançamentos selecionados,
                            <br />
                            histórias de criadores e novidades do
                            <br />
                            mercado.
                        </p>
                    </div>
                </div>
            </section>

            {/* INFORMAÇÕES DA MARCA */}
            <section className="bg-[#3A2113]">
                <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-8 py-6 lg:flex-row lg:items-center lg:justify-between">
                    <p className="text-[14px] font-bold tracking-[1px]">
                        KURIO
                    </p>

                    <p className="text-[14px] leading-[21px] text-[#F5F1EB]">
                        Feito para colecionadores,
                        <br className="lg:hidden" />
                        criadores e cultura
                    </p>

                    <p className="text-[14px]">contato@email.com</p>

                    <p className="text-[14px]">+55 11 4002 8922</p>
                </div>
            </section>

            {/* LINKS */}
            <section className="bg-[#1F130F]">
                <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
                    {gruposLinks.map((grupo) => (
                        <div key={grupo.titulo}>
                            <h3 className="mb-3 text-[17px] font-bold">
                                {grupo.titulo}
                            </h3>

                            <nav
                                aria-label={grupo.titulo}
                                className="flex flex-col gap-3 text-[14px] text-[#F5F1EB]"
                            >
                                {grupo.links.map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="transition-colors hover:text-[#D28A4C]"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    ))}

                    {/* REDES SOCIAIS E CARTEIRAS */}
                    <div>
                        <h3 className="mb-3 text-[17px] font-bold">
                            Redes sociais
                        </h3>

                        <div className="flex gap-2">
                            {redesSociais.map((rede) => (
                                <a
                                    key={rede.nome}
                                    href="#"
                                    aria-label={rede.nome}
                                    className={`flex h-[33px] w-[33px] items-center justify-center rounded-[5px] border border-[#D28A4C] font-bold text-[#D28A4C] transition-colors hover:bg-[#D28A4C] hover:text-[#20120B] ${rede.tamanho}`}
                                >
                                    {rede.simbolo}
                                </a>
                            ))}
                        </div>

                        <h3 className="mb-3 mt-7 text-[17px] font-bold">
                            Carteiras compatíveis
                        </h3>

                        <div className="flex h-[27px] items-center justify-center rounded-[6px] border border-[#5A3A28] bg-[#3A2113] px-3 text-[8px] font-bold text-[#D28A4C]">
                            METAMASK&nbsp;&nbsp;•&nbsp;&nbsp;WALLETCONNECT&nbsp;&nbsp;•&nbsp;&nbsp;COINBASE
                        </div>
                    </div>
                </div>
            </section>

            {/* COPYRIGHT */}
            <div className="flex h-[64px] items-center justify-center bg-black px-4 text-center">
                <p className="text-[13px] font-bold text-[#F5F1EB]">
                    © 2026 Kurio. Propriedade digital para todos.
                </p>
            </div>
        </footer>
    )
}

export default Footer