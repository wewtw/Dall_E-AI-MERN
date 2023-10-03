import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from "openai";

//reff: https://platform.openai.com/docs/api-reference/images


//init dotenv
dotenv.config();

//set up route
const router = express.Router();
//set up api key
const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

///init open ai 
const openai = new OpenAI(configuration)

///test route 
router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });

///route forr the image generation.
//ref at https://platform.openai.com/docs/api-reference/images/createEdit
router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
  
      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });
  
      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.error && error.response.error.message) {
        res.status(500).json({ error: error.response.error.message });
      } else {
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  });




export default router;