import { formatPrice } from "../utils/formatPrice"
import type { Product } from "../types/product"
import "./ProductCard.css"

type ProductCardProps = {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    return (
        <article className="product-card">
            <span className="product-card__id">ID: {product.id}</span>
            <h2 className="product-card__name">{product.name}</h2>
            <p className="product-card__price">{formatPrice(product.price)}</p>
            <div className="product-card__actions">
                <button className="btn" onClick={() => onEdit(product)}>
                    Edit
                </button>
                <button className="btn btn-outline-danger" onClick={() => onDelete(product)}>
                    Hapus
                </button>
            </div>
        </article>
    )
}

export default ProductCard
