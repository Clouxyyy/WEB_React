import { useState } from 'react'
import './ProductForm.css'

function ProductForm({ product, onSubmit, onCancel }) {
  const isEdit = Boolean(product)
  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [submitted, setSubmitted] = useState(false)

  const nameError = name.trim() === ''
  const priceError = !(Number(price) > 0)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (nameError || priceError) return
    onSubmit({ name: name.trim(), price: Number(price) })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>{isEdit ? 'Edit Produk' : 'Tambah Produk'}</h2>
      <p className="modal__subtitle">
        {isEdit
          ? 'Perbarui informasi produk yang dipilih.'
          : 'Masukkan informasi produk baru.'}
      </p>

      {isEdit && <p className="form__id">ID: {product.id}</p>}

      <label className="form__label" htmlFor="product-name">
        Nama Produk
      </label>
      <input
        id="product-name"
        className="form__input"
        placeholder="Contoh: Pulpen"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      {submitted && nameError && (
        <p className="form__hint form__hint--error">Nama produk wajib diisi.</p>
      )}

      <label className="form__label" htmlFor="product-price">
        Harga (Rp)
      </label>
      <input
        id="product-price"
        className="form__input"
        type="number"
        placeholder="Contoh: 5000"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <p className={`form__hint ${submitted && priceError ? 'form__hint--error' : ''}`}>
        Harga harus lebih dari 0.
      </p>

      <div className="form__actions">
        <button type="button" className="btn" onClick={onCancel}>
          Batal
        </button>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
