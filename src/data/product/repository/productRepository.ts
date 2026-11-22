import type { Product } from "../../../types/product"
import {
    createProductSource,
    deleteProductSource,
    getProductByIdSource,
    getProductListSource,
    updateProductSource,
} from "../source/productSource"
import { toProduct, toProductList } from "../model/productModel"
import type { ProductCreateParam, ProductListParam, ProductUpdateParam } from "../param/productParam"

export async function getProductList(param?: ProductListParam): Promise<Product[]> {
    const raw = await getProductListSource(param)
    return toProductList(raw)
}

export async function getProductById(id: number): Promise<Product> {
    return toProduct(await getProductByIdSource(id))
}

export async function createProduct(values: ProductCreateParam): Promise<Product> {
    return toProduct(await createProductSource(values))
}

export async function updateProduct(
    id: number,
    values: ProductUpdateParam,
): Promise<Product> {
    return toProduct(await updateProductSource(id, values))
}

export async function deleteProduct(id: number): Promise<void> {
    return deleteProductSource(id)
}
