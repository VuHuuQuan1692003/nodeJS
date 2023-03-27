
import mongoose from "mongoose";

const { Schema } = mongoose;
const Image = new Schema({
    base_url: {
        type: String,
        required: true
    },
    is_gallery: Boolean,
    label: String,
    large_url: String,
    medium_url: String,
    position: String,
    small_url: String,
    thumbnail_url: String
})
const Attribute = new Schema({

    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }

})
const Specifications = new Schema({
    name: {
        type: String,
        required: true
    },
    attributes: {
        type: [Attribute],
        required: true
    }

})

const Device = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,

    original_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [Image],
        required: true
    },
    brand: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        }
    },
    specifications: {
        type: [Specifications],
        required: true
    }


});
export default mongoose.model("Device", Device)
