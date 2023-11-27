import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: "ddflh4jzd",
    api_key: "164164487545953",
    api_secret: "9bEj4Zvc7fckBCPzDaVO9pdLxg4",
})

//Get all Posts
router.route('/').get(async(req , res) => {
    try {
        const Posts = await Post.find({});

        res.status(200).json({success : true , data:Posts})
    } catch (error) {
        res.status(500).json({success : false , message: error})
        
    }
});

//Create a Post
router.route('/').post(async(req , res) => {
 try {
    const {name , prompt, photo} = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
  
    const newPost = await Post.create({
      name,
      prompt,
      photo:photoUrl.url,
    })
  
    res.status(201).json({ success:true, data: newPost});
 } catch (error) {
    res.status(500).json({success: false , message: error})
 }
});
export default router;