export interface Product {
    product: string,
    price: number,
    quantity: number,
    imageSrc: string
}

export interface Order {
    product: string,
    price: number,
    imageSrc: string,
    quantity: number,
    change: number
}

export interface Cart {
    name: string,
    address: string,
    cart: Product[],
    total: number
}