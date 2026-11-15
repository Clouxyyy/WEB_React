import './SearchBar.css'

function SearchBar({ value, onChange, total }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-bar__input"
        placeholder="🔍 Cari nama produk..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="search-bar__count">{total} produk</span>
    </div>
  )
}

export default SearchBar
