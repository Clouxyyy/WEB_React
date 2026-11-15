import { useState } from 'react'
import { initialProducts } from './data/products'
import PageHeader from './components/PageHeader'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  function handleAdd() {}
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
    </main>
  )
}

export default App
