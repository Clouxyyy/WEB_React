import { useRef, useState } from "react"
import { initialProducts } from "../../../data/products"
import type { Product, ProductFormValues } from "../../../types/product"
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
    const [products, setProducts] = useState(initialProducts)
    const [query, setQuery] = useState("")
    const [modal, setModal] = useState<ModalState>(null)
    const nextId = useRef(initialProducts.length + 1)

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.trim().toLowerCase()),
    )

    function closeModal() {
        setModal(null)
    }

    function handleCreate(values: ProductFormValues) {
        setProducts([...products, { id: nextId.current++, ...values }])
        closeModal()
    }

    function handleUpdate(values: ProductFormValues) {
        if (modal?.type !== "edit") return
        setProducts(
            products.map((p) =>
                p.id === modal.product.id ? { ...p, ...values } : p,
            ),
        )
        closeModal()
    }

    function handleConfirmDelete() {
        if (modal?.type !== "delete") return
        setProducts(products.filter((p) => p.id !== modal.product.id))
        closeModal()
    }

    return (
        <div className="products-page">
            <PageHeader onAdd={() => setModal({ type: "add" })} />
            <SearchBar value={query} onChange={setQuery} total={filteredProducts.length} />
            <ProductGrid
                products={filteredProducts}
                onEdit={(product) => setModal({ type: "edit", product })}
                onDelete={(product) => setModal({ type: "delete", product })}
            />
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
