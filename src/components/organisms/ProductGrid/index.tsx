import ProductCard from "../../molecules/ProductCard"
import type { Product } from "../../../types/product"
import "./styles.css"

type ProductGridProps = {
    products: Product[]
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

function ProductGrid({ products, onEdit, onDelete }: ProductGridProps) {
    if (products.length === 0) {
        return <p className="product-list__empty">Tidak ada produk yang ditemukan.</p>
    }

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default ProductGrid
