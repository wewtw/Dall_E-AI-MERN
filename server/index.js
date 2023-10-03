import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import UserModel from "./models/UserModel.js";
import authRoutes from "./routes/authRoutes.js";
///import the connection logic
import connectDB from "./mongodb/connect.js";
//
///import the routes
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
//set up the dotenv by calling it as a function
//allows to pull envs from the .env file
dotenv.config();
/////

///init express as function 
const app = express();
///
////set up middlewere like express for the express with app.use
app.use(cors());
app.use(express.json({limit: '50mb'}));


//app.use("/api/v1/auth", authRoutes); // 
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
/////


///init routes
//root route 
app.get('/', async(req, res)=>{
    res.send('home route started');
})
////////

///init the start 
const startServer = async () => {
    //before listen connect to mongoDB database than listen
    //becuase this can fail use a try and catch block
    try {
        connectDB(process.env.MONGODB_URL);
        //if that works run the app
        app.listen(8080, ()=> 
        console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        //if it does not work log the error
        console.log(error);
    }

    
}

startServer();