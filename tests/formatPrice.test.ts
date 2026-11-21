import { test } from "node:test"
import assert from "node:assert/strict"
import { formatPrice } from "../src/utils/formatPrice"

test("formatPrice memformat angka menjadi rupiah", () => {
    assert.equal(formatPrice(12000), "Rp12.000")
})

test("formatPrice memformat angka kecil", () => {
    assert.equal(formatPrice(5000), "Rp5.000")
})
