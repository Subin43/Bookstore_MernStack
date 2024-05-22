import { Timestamp } from "mongodb";
import mongoose, { model } from "mongoose";

const bookSchema = mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   author:{
    type:String,
    required:true
   },
   publishedYear:{
    type:Number,
    required:true
   },
},{Timestamp:true})

export const Book = mongoose.model("Book",bookSchema)