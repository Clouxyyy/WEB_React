import { useRef, useState } from "react"
import { initialProducts } from "./data/products"
import type { Product, ProductFormValues } from "./types/product"
import PageHeader from "./components/PageHeader"
import SearchBar from "./components/molecules/SearchBar"
import ProductList from "./components/ProductList"
import Modal from "./components/molecules/Modal"
import ProductForm from "./components/organisms/ProductForm"
import DeleteConfirm from "./components/organisms/DeleteConfirm"
import "./App.css"

type ModalState =
    | null
    | { type: "add" }
    | { type: "edit" | "delete"; product: Product }

function App() {
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

    function handleAdd() {
        setModal({ type: "add" })
    }

    function handleCreate(values: ProductFormValues) {
        setProducts([...products, { id: nextId.current++, ...values }])
        closeModal()
    }

    function handleEdit(product: Product) {
        setModal({ type: "edit", product })
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

    function handleDelete(product: Product) {
        setModal({ type: "delete", product })
    }

    function handleConfirmDelete() {
        if (modal?.type !== "delete") return
        setProducts(products.filter((p) => p.id !== modal.product.id))
        closeModal()
    }

    return (
        <main className="app">
            <PageHeader onAdd={handleAdd} />
            <SearchBar
                value={query}
                onChange={setQuery}
                total={filteredProducts.length}
            />
            <ProductList
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
        </main>
    )
}

export default App
