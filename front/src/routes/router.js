import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from '../globalStyle';
import Header from "../components/header/header";

import Cart from '../pages/cart/cart';
import HomePage from '../pages/Home/home';
import OrdersPage from '../pages/orders/orders';
export const Router = () => {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Switch>
                <Route exact path={'/'}>
                    <HomePage />
                </Route>
                <Route exact path={'/carrinho'}>
                    <Cart />
                </Route>
                <Route exact path={'/pedidos'}>
                    <OrdersPage />
                </Route>
            </Switch>

        </BrowserRouter>

    )
}