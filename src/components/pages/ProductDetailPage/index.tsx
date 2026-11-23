import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import { getProductById } from "../../../data/product/repository/productRepository"
import type { Product } from "../../../types/product"
import { formatPrice } from "../../../utils/formatPrice"
import "./ProductDetailPage.css"

function ProductDetailPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        let active = true
        const timer = setTimeout(() => {
            if (!active) return
            void (async () => {
                setIsLoading(true)
                setError("")
                try {
                    const data = await getProductById(Number(id))
                    if (!active) return
                    setProduct(data)
                } catch {
                    if (!active) return
                    setError("Produk tidak ditemukan.")
                } finally {
                    if (active) setIsLoading(false)
                }
            })()
        }, 0)
        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [id])

    if (isLoading) {
        return (
            <div className="product-detail">
                <p>Memuat produk...</p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="product-detail">
                <p className="form__hint form__hint--error">
                    {error || "Produk tidak ditemukan."}
                </p>
                <Link to="/products" className="detail__link">
                    ← Kembali ke daftar produk
                </Link>
            </div>
        )
    }

    return (
        <div className="product-detail">
            <span className="product-card__id">ID: {product.id}</span>
            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-card__price">{formatPrice(product.price)}</p>
            <Link to="/products" className="detail__link">
                ← Kembali ke daftar produk
            </Link>
        </div>
    )
}

export default ProductDetailPage
