import Device from "../model/product";
import Joi from 'joi'
import mongoose from 'mongoose'
const query = new mongoose.Query();

const Attribute = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    value: Joi.string().required(),
})
const Specification = Joi.object({
    name: Joi.string().required(),
    attributes: Joi.array().items(Attribute).min(1).required()
})
const Image = Joi.object({
    base_url: Joi.string().required(),
    is_gallery: Joi.boolean().required(),
    label: Joi.any(),
    large_url: Joi.string(),
    medium_url: Joi.string(),
    position: Joi.any(),
    small_url: Joi.string(),
    thumbnail_url: Joi.string()
})
const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    original_price: Joi.number().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Image).min(1).required(),
    brand: Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        slug: Joi.string().required()
    }).required(),
    specifications: Joi.array().items(Specification).min(1).required()

})

export const get = async (req, res) => {
    try {
        const data = await Device.find()
        res.send({
            message: "Get products successfully",
            data: data
        })
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}
export const getByName = async (req, res) => {
    try {
        const find = req.body
        const data = await Device.find({
            $or: [
                { "name": { '$regex': find.name } },
                { "description": { '$regex': find.description } },
            ]
        },
            {
                "name": 1,
                "description": 1
            })
        res.send({
            message: "Get products successfully",
            data: data
        })
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Device.findById(id)
        res.send({
            message: "Get products successfully",
            data: data
        })
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body
        const { error } = productSchema.validate(body)
        if (error) {
            res.status(400).send({
                message: error.message,
            })
        } else {
            const data = await Device.create(body)
            res.send({
                message: "Create successfully",
                data: data
            })
        }
        // const data = await Device.create(body)
        // res.send({
        //     message: "Create successfully",
        //     data: data
        // })

    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const { error } = productSchema.validate(body)
        if (error) {
            res.status(400).send({
                message: error.message,
            })
        } else {
            const data = await Device.findByIdAndUpdate(id, body)
            if (data) {
                res.send({
                    message: "Update successfully",
                    data: data
                })
            } else {
                res.status(400).send({
                    message: "Product is not existed"
                })
            }
        }
    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Device.findByIdAndRemove(id)
        if (data) {
            res.send({
                message: "Delete successfully",
                data: data
            })
        } else {
            res.status(400).send({
                message: "Product is not existed"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: err
        })
    }
}