import { Link } from "react-router"
import "./NotFoundPage.css"

function NotFoundPage() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>Halaman tidak ditemukan.</p>
            <Link to="/products" className="detail__link">
                ← Kembali ke daftar produk
            </Link>
        </div>
    )
}

export default NotFoundPage
