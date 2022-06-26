export default (price) => {
    if (price === 0) return 0
    price = Number(price)
    let p = price.toFixed(3)
    const idx = p.indexOf('.')
    for (let i = idx; i > 0; i -= 3) {
        if (i != idx) {
            const arr = p.split('');
            arr.splice(i, 0, ',');
            p = arr.join('');
        }
    }
    return p
}