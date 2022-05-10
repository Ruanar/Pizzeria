export type Pizza = {
    name: string,
    price: number,
    ingredients: string[]
}

export type Order = {
    id: string,
    pizzas: string[],
    totalPrice: number
}

export type ResultDb = {
    id: string,
    pizzas: string,
    totalPrice: number
}

