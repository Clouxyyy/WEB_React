export type Product = {
    id: number
    name: string
    price: number
}

export type ProductFormValues = Omit<Product, "id">
