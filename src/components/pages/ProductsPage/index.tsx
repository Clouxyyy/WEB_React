import { useEffect, useState } from "react"
import { initialProducts } from "../../../data/products"
import type { Product, ProductFormValues } from "../../../types/product"
import {
    createProduct,
    deleteProduct,
    getProductList,
    updateProduct,
} from "../../../data/product/repository/productRepository"
import PageHeader from "../../organisms/PageHeader"
import SearchBar from "../../molecules/SearchBar"
import ProductGrid from "../../organisms/ProductGrid"
import Modal from "../../molecules/Modal"
import ProductForm from "../../organisms/ProductForm"
import DeleteConfirm from "../../organisms/DeleteConfirm"
import "./ProductsPage.css"

type ModalState =
    | null
    | { type: "add" }
    | { type: "edit"; product: Product }
    | { type: "delete"; product: Product }

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [query, setQuery] = useState("")
    const [modal, setModal] = useState<ModalState>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        let active = true
        const timer = setTimeout(() => {
            if (!active) return
            void (async () => {
                setIsLoading(true)
                setError("")
                try {
                    const list = await getProductList(query ? { q: query } : undefined)
                    if (!active) return
                    setProducts(list)
                } catch {
                    if (!active) return
                    setError("Gagal memuat produk dari server.")
                } finally {
                    if (active) setIsLoading(false)
                }
            })()
        }, 0)
        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [query])

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.trim().toLowerCase()),
    )

    function closeModal() {
        setModal(null)
    }

    async function handleCreate(values: ProductFormValues) {
        try {
            const created = await createProduct(values)
            setProducts([...products, created])
            closeModal()
        } catch {
            setError("Gagal menyimpan produk.")
        }
    }

    async function handleUpdate(values: ProductFormValues) {
        if (modal?.type !== "edit") return
        try {
            const updated = await updateProduct(modal.product.id, values)
            setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
            closeModal()
        } catch {
            setError("Gagal memperbarui produk.")
        }
    }

    async function handleConfirmDelete() {
        if (modal?.type !== "delete") return
        try {
            await deleteProduct(modal.product.id)
            setProducts(products.filter((p) => p.id !== modal.product.id))
            closeModal()
        } catch {
            setError("Gagal menghapus produk.")
        }
    }

    return (
        <div className="products-page">
            <PageHeader onAdd={() => setModal({ type: "add" })} />
            <SearchBar value={query} onChange={setQuery} total={filteredProducts.length} />
            {error && <p className="form__hint form__hint--error">{error}</p>}
            {isLoading ? (
                <p className="product-list__empty">Memuat produk...</p>
            ) : (
                <ProductGrid
                    products={filteredProducts}
                    onEdit={(product) => setModal({ type: "edit", product })}
                    onDelete={(product) => setModal({ type: "delete", product })}
                />
            )}
            <p className="app__summary">
                Menampilkan {filteredProducts.length} dari {products.length} produk
            </p>

            {modal?.type === "add" && (
                <Modal onClose={closeModal}>
                    <ProductForm onSubmit={handleCreate} onCancel={closeModal} />
                </Modal>
            )}

            {modal?.type === "edit" && (
                <Modal onClose={closeModal}>
                    <ProductForm
                        product={modal.product}
                        onSubmit={handleUpdate}
                        onCancel={closeModal}
                    />
                </Modal>
            )}

            {modal?.type === "delete" && (
                <Modal onClose={closeModal}>
                    <DeleteConfirm
                        product={modal.product}
                        onConfirm={handleConfirmDelete}
                        onCancel={closeModal}
                    />
                </Modal>
            )}
        </div>
    )
}

export default ProductsPage
