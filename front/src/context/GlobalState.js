import { useEffect, useState } from "react"
import axios from 'axios'
import { baseURL } from "../constants/baseURL"
import { GlobalContext } from "./GlobalStateContext"

export default function GlobalState(props) {
    const [allPizzas, setAllPizzas] = useState([])
    const [cart, setCart] = useState([])
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    function getAllPizzas() {
        axios.get(`${baseURL}/pizzas`)
            .then((res) => {
                setAllPizzas(res.data.result)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    function getAllOrders() {
        axios.get(`${baseURL}/orders`)
            .then((res) => {
                setOrders(res.data.result)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        getAllPizzas(`${baseURL}/pizzas`)
        getAllOrders(`${baseURL}/orders`)
    }, [])

    const states = { allPizzas, cart, totalPrice, orders }
    const setters = { setAllPizzas, setCart, setTotalPrice }
    return (
        <GlobalContext.Provider value={{ states, setters }}>
            {props.children}
        </GlobalContext.Provider>
    )
}