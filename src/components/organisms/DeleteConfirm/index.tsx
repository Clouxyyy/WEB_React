import Button from "../../atoms/Button"
import { formatPrice } from "../../../utils/formatPrice"
import type { Product } from "../../../types/product"
import "./styles.css"

type DeleteConfirmProps = {
    product: Product
    onConfirm: () => void
    onCancel: () => void
}

function DeleteConfirm({ product, onConfirm, onCancel }: DeleteConfirmProps) {
    return (
        <div className="delete-confirm">
            <div className="delete-confirm__icon" aria-hidden="true">
                🗑️
            </div>
            <h2>Hapus Produk?</h2>
            <p className="modal__subtitle">
                Produk yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="delete-confirm__product">
                <span>ID: {product.id}</span>
                <strong>{product.name}</strong>
                <span className="delete-confirm__price">
                    {formatPrice(product.price)}
                </span>
            </div>

            <div className="form__actions delete-confirm__actions">
                <Button onClick={onCancel}>Batal</Button>
                <Button variant="danger" onClick={onConfirm}>
                    Hapus Produk
                </Button>
            </div>
        </div>
    )
}

export default DeleteConfirm
