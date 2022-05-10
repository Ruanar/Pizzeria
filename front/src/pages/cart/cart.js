import axios from "axios"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { baseURL } from "../../constants/baseURL"
import { GlobalContext } from "../../context/GlobalStateContext"
import { goToHome, goToOrders } from "../../routes/cordinator"
import { BoxCard, CartCard, CartContainer } from "./style"
import EmptyBox from '../../img/caixa-de-pizza.png'
import { Buttons } from "../Home/style"

export default function Cart() {
    const history = useHistory()
    const { states, setters } = useContext(GlobalContext)

    const removeFromCart = (pizzaToRemove) => {
        if (pizzaToRemove.quantity === 1) {
            const newCart = states.cart.filter((item) => {
                if (item.name !== pizzaToRemove.name) {
                    return item
                } else {
                    return false
                }
            })
            setters.setCart(newCart)
        } else {
            const newCart = states.cart.map((item) => {
                if (pizzaToRemove.name === item.name && item.quantity >= 1) {
                    return { ...item, quantity: item.quantity - 1 }
                } else {
                    return item
                }
            })
            setters.setCart(newCart)
        }
        subPrice(pizzaToRemove.price)
    }

    const subPrice = (price) => {
        setters.setTotalPrice(states.totalPrice - price)
    }
    const cartList = states.cart && states.cart.map((item) => {
        let showPrice = (item.price * item.quantity).toFixed(2)
        return (
            <tr >
                <td>{item.name} </td>
                <td>{item.quantity} </td>
                <td>{`$${showPrice}`} </td>
                <td><button onClick={() => removeFromCart(item)}>X</button></td>
            </tr>
        )
    })
    const EmptyCart = () => {
        return (
            <BoxCard>
                <p>Hmm, parece que você ainda não escolheu nenhuma pizza...</p>
                <img src={EmptyBox} alt='Caixa de pizza vazia' />
            </BoxCard>
        )
    }
    const postOrder = () => {
        const pizzas = []
        const totalPrice = states.totalPrice
        const showPrice = totalPrice.toFixed(2)
        states.cart && states.cart.map((item) => {
            return (
                pizzas.push(item.name)
            )
        })
        const body = {
            pizzas, totalPrice
        }

        axios.post(`${baseURL}/order`, body)
            .then((res) => {
                alert(`Seu Pedido de ${pizzas}, no valor de $${showPrice} foi realizado!`)
                setters.setCart([])
                setters.setTotalPrice(0)
            })
            .catch((err) => {
                console.log('Tivemos problemas ao processar sua solicitação')
            })
    }
    return (
        <CartContainer>
            <Buttons>
                <button onClick={() => goToHome(history)}>Voltar</button>
                <button onClick={() => goToOrders(history)}>Pedidos</button>
            </Buttons>
            {states.cart.length !== 0 ?
                <CartCard>
                    <table>
                        <tr>
                            <th>Pizza</th>
                            <th>Quantidade</th>
                            <th>Valor </th>
                        </tr>
                        {cartList}
                    </table>
                    <p>Valor total: ${states.totalPrice.toFixed(2)}</p>
                    <button onClick={postOrder}>Pedir pizza!</button>
                </CartCard> :
                <EmptyCart />
            }
        </CartContainer>
    )
}