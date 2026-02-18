import {StoreProvider} from "./StoreProvider"
import {RouterProvider} from "./RouterProvider"

export const Providers = () => {
    return (
        <StoreProvider>
            <RouterProvider/>
        </StoreProvider>
    )
}