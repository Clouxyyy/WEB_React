import type { Product } from "../../../types/product"
import type { RawProduct } from "../source/productSource"

export function toProduct(raw: unknown): Product {
    if (typeof raw !== "object" || raw === null) {
        throw new Error("Data produk tidak valid")
    }
    const { id, name, price } = raw as Record<string, unknown>
    if (typeof id !== "number") throw new Error("id produk tidak valid")
    if (typeof name !== "string") throw new Error("nama produk tidak valid")
    if (typeof price !== "number") throw new Error("harga produk tidak valid")
    return { id, name, price }
}

export function toProductList(raw: RawProduct[]): Product[] {
    if (!Array.isArray(raw)) throw new Error("Daftar produk tidak valid")
    return raw.map(toProduct)
}

export function toRawProduct(product: Product): RawProduct {
    return { id: product.id, name: product.name, price: product.price }
}
