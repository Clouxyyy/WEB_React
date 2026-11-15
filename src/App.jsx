import { useState } from 'react'
import { initialProducts } from './data/products'
import PageHeader from './components/PageHeader'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  const [products, setProducts] = useState(initialProducts)

  function handleAdd() {}
  function handleEdit() {}
  function handleDelete() {}

  return (
    <main className="app">
      <PageHeader onAdd={handleAdd} />
      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default App
