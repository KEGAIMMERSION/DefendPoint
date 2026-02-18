import {RouterProvider as TanStackRouterProvider} from '@tanstack/react-router';
import {router} from '@app/router/router'

export const RouterProvider = () => {
    return <TanStackRouterProvider router={router}/>
}