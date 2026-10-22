import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
    redirect,
} from '@tanstack/react-router'

import TelaInicio from './pages/Inicio/Inicio'
import DetalhesNFT from './pages/Inicio/DetalhesNFT'
import { nfts } from './data/nfts'

const rootRoute = createRootRoute({
    component: () => <Outlet />,
})

const inicioRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: TelaInicio,
})

const mercadoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/mercado',
    beforeLoad: () => {
        if (nfts.length === 0) {
            throw redirect({ to: '/' })
        }

        const indiceAleatorio = Math.floor(
            Math.random() * nfts.length
        )

        const nftAleatorio = nfts[indiceAleatorio]

        throw redirect({
            to: '/nft/$id',
            params: {
                id: String(nftAleatorio.id),
            },
        })
    },
})

const detalhesNFTRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/nft/$id',
    component: DetalhesNFT,
})

const routeTree = rootRoute.addChildren([
    inicioRoute,
    mercadoRoute,
    detalhesNFTRoute,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export default router