import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import Post from "../mongodb/models/post.js";
import express from 'express';

import { authenticateUser } from "../middleware/authMiddleware.js";
//init dotenv
dotenv.config();

//create new route
const router = express.Router();

//setup cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRRET,
})

///routess forr getting all posts
router.route('/').get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' && err });
    }
  });

////routess for posting 
router.route('/').post(async (req, res) => {
    try {
        //front end 
      const { name, prompt, photo } = req.body;
      //upload the new image url to cloudinary
      const photoUrl = await cloudinary.uploader.upload(photo);
        
      ///create a new post in. the database
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });
      

      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
});
// Protected route example
router.get("/protected-route", authenticateUser, (req, res) => {
  // Access user data with req.user
  res.json({ user: req.user });
});
export default router;