export default (price) => {
    if (price === 0) return 0
    price = String(price)
    for (let i = price.length; i > 0; i -= 3) {
        if (i !== price.length) {
            const arr = price.split('');
            arr.splice(i, 0, ',');
            price = arr.join('');
        }


    }
    return price
}