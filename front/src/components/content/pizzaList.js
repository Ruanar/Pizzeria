import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalStateContext";
import { PizzaCard, PizzaListContainer } from "./style";

export default function PizzaList() {
    const { states, setters } = useContext(GlobalContext)
    const pizzaList = states.allPizzas.map((pizza) => {
        function addToCart(pizza) {
            const addPrice = (price) => {
                setters.setTotalPrice(states.totalPrice + price)
            }
            const productInCart = states.cart.filter((item) => {
                if (item.name === pizza.name) {
                    return item
                } else {
                    return false
                }
            })
            if (productInCart.length === 0) {
                pizza.quantity = 1
                const newCart = [pizza, ...states.cart]
                setters.setCart(newCart)
            } else {
                const newCart = states.cart.map((item) => {
                    if (pizza.name === item.name) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
                setters.setCart(newCart)
            }
            addPrice(pizza.price)
        }
        let pizzaPrice = pizza.price.toFixed(2)
        const ingredientsList = pizza.ingredients.map((item) => {
            return (
                <li>{item} </li>
            )
        })
        return (
            <PizzaCard key={pizza.name}>
                <div>
                    <h2>{pizza.name}</h2>
                    <p>{` $${pizzaPrice} `} </p>
                </div>
                <ul><li>Ingredientes:</li>
                    {ingredientsList}
                </ul>
                <button onClick={() => addToCart(pizza)} key={pizza.name}>Adicionar</button>
            </PizzaCard>
        )
    })
    return (
        <PizzaListContainer>{pizzaList}</PizzaListContainer>
    )
}
