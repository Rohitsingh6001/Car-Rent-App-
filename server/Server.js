import express from "express";
import "dotenv/config";
import cors from 'cors';
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRouters.js";
import bookingRouter from "./routes/bookingRoutes.js";


const app  = express();

// connect database
await connectDB();

app.use(cors());
app.use(express.json());

app.get('/' , (req , res) =>{
     res.send('Hello');
})
app.use('/api/user', userRouter);
app.use('/api/owner' , ownerRouter);
app.use('/api/bookings' , bookingRouter);


const PORT = 3000;
app.listen(PORT , () =>{
     console.log("Server is running on port 3000");
})