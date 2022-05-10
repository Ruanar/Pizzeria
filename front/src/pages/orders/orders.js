import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { PizzaCard, PizzaListContainer } from "../../components/content/style"
import { GlobalContext } from "../../context/GlobalStateContext"
import { gotoCart, goToHome } from "../../routes/cordinator"
import { Buttons, ContentContainer } from "../Home/style"

export default function OrdersPage() {
    const history = useHistory()
    const { states, setters } = useContext(GlobalContext)
    const orderList = states.orders.map((item) => {
        const orderPrice = item.totalPrice.toFixed(2)
        const orderedPizzas = item.pizzas.map((pizza) => {
            return (
                <li>{pizza} </li>
            )
        })
        return (
            <PizzaCard key={item.id}>
                <ul><li>Sabores:</li>
                    {orderedPizzas}
                </ul>
                <p>Valor total: $ {orderPrice}</p>
            </PizzaCard>
        )
    })
    return (
        <ContentContainer>
            <Buttons>
                <button onClick={() => goToHome(history)}>Voltar</button>
                <button onClick={() => gotoCart(history)}>Carrinho</button>
            </Buttons>
            <PizzaListContainer>
                {orderList}
            </PizzaListContainer>
        </ContentContainer>
    )
}