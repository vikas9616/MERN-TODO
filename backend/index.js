import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import todoRoute from './routes/todo.route.js'
import userRoute from './routes/user.route.js'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
const port = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI

// middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
}));

try {
  mongoose.connect(DB_URI)
  console.log("Connected to DB")
} catch (error) {
  console.log(error);
  
}

// route
app.use('/todo',todoRoute)
app.use('/user',userRoute)

app.listen(port, ()=>{
  console.log(`app is listening on port ${port}`);
  
})