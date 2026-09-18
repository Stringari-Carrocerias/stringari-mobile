export function parseDecimal(value) {
    return Number(String(value ?? "").replace(",", ".")) || null;
}
export function parseDecimalReverse(value) {
    return String(Number(value).toFixed(1) ?? "").replace(".", ",") || null;
}
export function parseDecimalCurrency(value) {
    let numberValue = Number(value); 
    return numberValue != null ? numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'}) : null;
}