//Imports mongoose dependency
import mongoose, { Model } from "mongoose"

//Connects to mongoose (gets DATABASE_URL from .env.local)
const { DATABASE_URL } = process.env

//Connection function 
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")


  //Gift Schema
  const GiftSchema = new mongoose.Schema({
    item: String,
    link: String,
    completed: Boolean,
  })

  //Gift Model
  const Gift = mongoose.models.Gift || mongoose.model("Gift", GiftSchema)

  return { conn, Gift }
}