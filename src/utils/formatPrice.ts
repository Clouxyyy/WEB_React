// 12000 -> "Rp12.000"
export function formatPrice(value: number): string {
    return "Rp" + new Intl.NumberFormat("id-ID").format(value)
}
