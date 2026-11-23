import Button from "../../atoms/Button"
import { Link } from "react-router"
import { formatPrice } from "../../../utils/formatPrice"
import type { Product } from "../../../types/product"
import "./styles.css"

type ProductCardProps = {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-card__tile" aria-hidden="true">
                📦
            </div>
            <span className="product-card__id">ID: {product.id}</span>
            <h2 className="product-card__name">
                <Link to={`/products/${product.id}`} className="product-card__link">
                    {product.name}
                </Link>
            </h2>
            <p className="product-card__price">{formatPrice(product.price)}</p>
            <div className="product-card__actions">
                <Button onClick={() => onEdit(product)}>Edit</Button>
                <Button variant="outline-danger" onClick={() => onDelete(product)}>
                    Hapus
                </Button>
            </div>
        </article>
    )
}

export default ProductCard
