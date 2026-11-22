import type { ProductCreateParam, ProductListParam, ProductUpdateParam } from "../param/productParam"

export type RawProduct = {
    id: number
    name: string
    price: number
}

const BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "/api"

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`Request gagal: ${response.status} ${response.statusText}`)
    }
    if (response.status === 204) return undefined as T
    return (await response.json()) as T
}

export async function getProductListSource(
    param?: ProductListParam,
): Promise<RawProduct[]> {
    const search = param?.q ? `?q=${encodeURIComponent(param.q)}` : ""
    const response = await fetch(`${BASE_URL}/products${search}`)
    return handleResponse<RawProduct[]>(response)
}

export async function getProductByIdSource(id: number): Promise<RawProduct> {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    return handleResponse<RawProduct>(response)
}

export async function createProductSource(
    values: ProductCreateParam,
): Promise<RawProduct> {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    })
    return handleResponse<RawProduct>(response)
}

export async function updateProductSource(
    id: number,
    values: ProductUpdateParam,
): Promise<RawProduct> {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    })
    return handleResponse<RawProduct>(response)
}

export async function deleteProductSource(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" })
    return handleResponse<void>(response)
}
