import PizzaList from "../../components/content/pizzaList";
import { Buttons, ContentContainer } from "./style";
import { gotoCart, goToOrders } from "../../routes/cordinator";
import { useHistory } from "react-router-dom";

export default function HomePage() {
    const history = useHistory()
    return (
        <div>
            <ContentContainer>
                <Buttons>
                    <button onClick={() => goToOrders(history)}>Pedidos</button>
                    <button onClick={() => gotoCart(history)}>Carrinho</button>
                </Buttons>
                <PizzaList />
            </ContentContainer>
        </div>
    )
}