import app from "./app";
import getOrders from "./endpoints/getOrders";
import getPizzas from "./endpoints/getPizzas";
import postOrder from "./endpoints/postOrder";

app.get('/api/pizzas', getPizzas)
app.post('/api/order', postOrder)
app.get('/api/orders', getOrders)
