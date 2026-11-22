import { useState, type FormEvent } from "react"
import Button from "../../atoms/Button"
import FormField from "../../molecules/FormField"
import Input from "../../atoms/Input"
import type { Product, ProductFormValues } from "../../../types/product"
import "./styles.css"

type ProductFormProps = {
    product?: Product
    onSubmit: (values: ProductFormValues) => void
    onCancel: () => void
}

function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    const isEdit = Boolean(product)
    const [name, setName] = useState(product?.name ?? "")
    const [price, setPrice] = useState(product ? String(product.price) : "")
    const [submitted, setSubmitted] = useState(false)

    const nameError = name.trim() === ""
    const priceError = !(Number(price) > 0)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitted(true)
        if (nameError || priceError) return
        onSubmit({ name: name.trim(), price: Number(price) })
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2>{isEdit ? "Edit Produk" : "Tambah Produk"}</h2>
            <p className="modal__subtitle">
                {isEdit
                    ? "Perbarui informasi produk yang dipilih."
                    : "Masukkan informasi produk baru."}
            </p>

            {product && <p className="form__id">ID: {product.id}</p>}

            <FormField
                htmlFor="product-name"
                label="Nama Produk"
                hint={submitted && nameError ? "Nama produk wajib diisi." : undefined}
                hintError={submitted && nameError}
            >
                <Input
                    id="product-name"
                    placeholder="Contoh: Pulpen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
            </FormField>

            <FormField
                htmlFor="product-price"
                label="Harga (Rp)"
                hint="Harga harus lebih dari 0."
                hintError={submitted && priceError}
            >
                <Input
                    id="product-price"
                    type="number"
                    placeholder="Contoh: 5000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </FormField>

            <div className="form__actions">
                <Button onClick={onCancel}>Batal</Button>
                <Button variant="primary" type="submit">
                    {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
                </Button>
            </div>
        </form>
    )
}

export default ProductForm
