import { Request, Response } from "express"
import { connection } from "../connection"
import { Order, ResultDb } from "../types/types"

export default async function getOrders(req: Request, res: Response) {
    try {
        let message = "Success"
        const resultDb: ResultDb[] =
            await connection('pizzeriaOrder')
                .select('*')
        if (!resultDb) {
            res.statusCode = 404
            message = 'Data not found'
            throw new Error(message)
        }
        const result: Order[] = resultDb.map((item) => {
            return ({
                id: item.id,
                pizzas: item.pizzas.split(','),
                totalPrice: item.totalPrice
            })
        })
        res.status(200).send({ message, result })
    } catch (error) {
        let message = error.sqlMessage || error.message
        res.statusCode = 400
        res.send({ message })
    }
}