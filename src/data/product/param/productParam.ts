import type { ProductFormValues } from "../../../types/product"

export type ProductListParam = {
    q?: string
}

export type ProductCreateParam = ProductFormValues

export type ProductUpdateParam = ProductFormValues
