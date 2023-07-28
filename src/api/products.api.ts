import { http } from "./http"
import { routes } from "./routes"

export const fetchProducts = async () => {
    const route = routes.products.getAll

    try{
        const respose = await http.get(route)
        return respose.data
    } catch (e) {
        return []
    }
}