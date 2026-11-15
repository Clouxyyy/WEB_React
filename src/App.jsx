import { useRef, useState } from 'react'
import { initialProducts } from './data/products'
import PageHeader from './components/PageHeader'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import Modal from './components/Modal'
import ProductForm from './components/ProductForm'
import './App.css'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  // modal: null | { type: 'add' }
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

  function handleEdit() {}
  function handleDelete() {}

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
    </main>
  )
}

export default App
