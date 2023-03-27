import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from "./router/product";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use('/api', productRouter)
app.listen(8000, () => console.log('Server is running on port 8000'));

mongoose.connect('mongodb://127.0.0.1:27017/device')
    .then(() => console.log('Connect is sucessfully'))

