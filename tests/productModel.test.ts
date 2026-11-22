import { test } from "node:test"
import assert from "node:assert/strict"
import { toProduct, toProductList } from "../src/data/product/model/productModel"

test("toProduct memvalidasi data produk yang valid", () => {
    const product = toProduct({ id: 1, name: "Pulpen", price: 5000 })
    assert.equal(product.id, 1)
    assert.equal(product.name, "Pulpen")
    assert.equal(product.price, 5000)
})

test("toProduct menolak data dengan harga bukan angka", () => {
    assert.throws(() => toProduct({ id: 1, name: "Pulpen", price: "5000" }), /harga/)
})

test("toProductList memvalidasi array produk", () => {
    const list = toProductList([
        { id: 1, name: "Pulpen", price: 5000 },
        { id: 2, name: "Buku", price: 12000 },
    ])
    assert.equal(list.length, 2)
    assert.equal(list[1].name, "Buku")
})

test("toProductList menolak data bukan array", () => {
    assert.throws(() => toProductList({ id: 1 } as never), /Daftar produk/)
})
