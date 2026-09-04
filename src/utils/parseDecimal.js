export function parseDecimal(value) {
    return Number(String(value ?? "").replace(",", ".")) || null;
}
export function parseDecimalReverse(value) {
    return String(value ?? "").replace(".", ",") || null;
}