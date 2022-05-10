import { Request, Response } from "express";
import { connection } from "../connection";
import generateId from "../services/idGenerator";

export default async function postOrder(req: Request, res: Response) {
    try {
        let message = "Pizza chosen successfully"
        const totalPrice = req.body.totalPrice
        const pizzaList = req.body.pizzas
        if (!pizzaList || !totalPrice) {
            res.statusCode = 406
            message = 'All fields must be filled'
            throw new Error(message)
        }
        const id: string = generateId()
        const pizzas = pizzaList.join()
        await connection('pizzeriaOrder')
            .insert({
                id, pizzas, totalPrice
            })
        res.status(201).send(message)
    } catch (error) {
        res.statusCode = 400
        let message = error.sqlMessage || error.message
        res.send({ message })
    }
}