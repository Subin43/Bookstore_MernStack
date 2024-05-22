import mongoose from "mongoose";
import {Book} from "../model/bookModel.js";
import express from "express";


const router = express.Router();
// create newbook
router.post ('/',async(req,res)=>{
try{
    if (!req.body.title ||
        !req.body.author ||
        !req.body.publishedYear)
        {
            res.status(400).json({error:" message: 'Send all required fields: title, author, publishYear',"})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear:req.body.publishedYear
        }

        const book = await Book.create(newBook) 
        return res.status(201).json(book)

    }
        
     catch(error){
        console.log('error:',error.message);
        res.status(500).send({error:"Internal Server error"})
     }
    })

    // Get all the book 
    router.get('/all',async(req,res)=>{
        try{
            const allBook = await Book.find({});
            if (!allBook){
                res.status(401).json({error:"No books was added!"})
            }
            res.status(201).json({
                count:allBook.length,
                data:allBook
            })
        }
        catch(error){
            console.log('error:',error.message);
            res.status(500).send({error:"Internal Server error"})
         }
    })

    // get 1 book
    router.get('/:id',async(req,res)=>{
        try{
            const {id } = req.params;
            const singleBook = await Book.findById(id)
            if(!singleBook){
                res.status(401).json({error:"No Book Found!"})
            }
            res.status(201).json(singleBook)
        }
        catch(error){
            console.log('error:',error.message);
            res.status(500).send({error:"Internal Server error"})
         }
    })

    // update book 

    router.put('/:id',async(req,res)=>{
        try{
            if (!req.body.title ||
                !req.body.author ||
                !req.body.publishedYear)
                {
                    res.status(400).json({error:" message: 'Send all required fields: title, author, publishYear',"})
                }
            const {id} = req.params;
            const result = await Book.findByIdAndUpdate(id,req.body)    
            if (!result){
                res.status(404).send({error:'no book found'})
            }
            return res.status(201).json({message:"Book updated successfully"})
        }
        catch(error){
            console.log('error:',error.message);
            res.status(500).send({error:"Internal Server error"})
         }
    })

    // Delete book

       // update book 

       router.delete('/:id',async(req,res)=>{
        try{
            const {id} = req.params;
            const result = await Book.findByIdAndDelete(id)    
            if (!result){
                res.status(404).send({error:'no book found'})
            }
            return res.status(201).json({message:"Book deleted successfully"})
        }
        catch(error){
            console.log('error:',error.message);
            res.status(500).send({error:"Internal Server error"})
         }
    })

    export default router;