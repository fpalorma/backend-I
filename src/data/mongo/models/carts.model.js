import { Schema, Types, model } from "mongoose";

const collection = "carts"

const schema = new Schema({
  product_id: { type: Types.ObjectId, ref: "products", required: true },
  user_id: { type: Types.ObjectId, ref: "users",required: true },
  quantity: { type: Number, required: true, min:1, default:1 },
  state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"] }
});

schema.pre(
  //metodo a popular
  "find",
  //Callback
  function() {
    this.populate("user_id", "email")
    this.populate("product_id", "title price")
  }
)
schema.pre(
  //metodo a popular
  "findOneAndUpdate",
  //Callback
  function() {
    this.populate("user_id", "email")
    this.populate("product_id", "title price")
  }
)
schema.pre(
  //metodo a popular
  "findOne",
  //Callback
  function() {
    this.populate("user_id", "email")
    this.populate("product_id", "title price")
  }
)
const Cart = model(collection, schema);

export default Cart;