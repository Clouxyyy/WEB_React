import './PageHeader.css'

function PageHeader({ onAdd }) {
  return (
    <header className="page-header">
      <div>
        <h1>Manajemen Produk</h1>
        <p>Kelola daftar produk dan harga dalam satu tempat.</p>
      </div>
      <button className="btn btn-primary" onClick={onAdd}>
        + Tambah Produk
      </button>
    </header>
  )
}

export default PageHeader
