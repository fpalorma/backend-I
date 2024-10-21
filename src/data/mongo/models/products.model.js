import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

const collection = "products"

const schema = new Schema({
    title: { type: String, required: true,index:true },
    stock: { type: Number, required: true, default: 1, min: 1 },
    price: { type: Number, required: true, default: 1, min: 1 },
    category: { type: String, default: "other",index:true, enum: ["none","other", "pants", "shoes", "sweaters", "accessories", "jackets", "dresses", "tops", "skirts", "t-shirts"] },
    photo: { type: String, default: "/public/assets/products/products-image.jpg" }
})
schema.plugin(mongoosePaginator)

const Product = model(collection, schema);
export default Product