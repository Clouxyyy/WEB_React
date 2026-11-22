import { test } from "node:test"
import assert from "node:assert/strict"
import { toProduct } from "../src/data/product/model/productModel"
import { formatPrice } from "../src/utils/formatPrice"

test("formatPrice dan produk tersusun sebagai kartu", () => {
    const product = toProduct({ id: 3, name: "Spidol", price: 8000 })
    assert.equal(formatPrice(product.price), "Rp8.000")
})
