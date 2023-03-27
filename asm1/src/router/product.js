import express from "express";
import { create, get, getById, getByName, remove, update } from "../controller/product";

const productRouter = express.Router()

productRouter.get('/products', get)
productRouter.get('/products/:id', getById)
productRouter.get('/find', getByName)
productRouter.post('/products', create)
productRouter.put('/products/:id', update)
productRouter.delete('/products/:id', remove)
export default productRouter