import { useRef, useState } from 'react'
import { initialProducts } from './data/products'
import PageHeader from './components/PageHeader'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import Modal from './components/Modal'
import ProductForm from './components/ProductForm'
import DeleteConfirm from './components/DeleteConfirm'
import './App.css'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  // modal: null | { type: 'add' } | { type: 'edit' | 'delete', product }
  const [modal, setModal] = useState(null)
  const nextId = useRef(initialProducts.length + 1)

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  function closeModal() {
    setModal(null)
  }

  function handleAdd() {
    setModal({ type: 'add' })
  }

  function handleCreate(data) {
    setProducts([...products, { id: nextId.current++, ...data }])
    closeModal()
  }

  function handleEdit(product) {
    setModal({ type: 'edit', product })
  }

  function handleUpdate(data) {
    setProducts(
      products.map((p) => (p.id === modal.product.id ? { ...p, ...data } : p)),
    )
    closeModal()
  }

  function handleDelete(product) {
    setModal({ type: 'delete', product })
  }

  function handleConfirmDelete() {
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

      {modal?.type === 'add' && (
        <Modal onClose={closeModal}>
          <ProductForm onSubmit={handleCreate} onCancel={closeModal} />
        </Modal>
      )}

      {modal?.type === 'edit' && (
        <Modal onClose={closeModal}>
          <ProductForm
            product={modal.product}
            onSubmit={handleUpdate}
            onCancel={closeModal}
          />
        </Modal>
      )}

      {modal?.type === 'delete' && (
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
