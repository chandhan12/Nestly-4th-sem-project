import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js'
import predictionRouter from './routes/prediction.route.js'


dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const app = express();
app.use(cookieParser()); 

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is started and running at port 3000!!!");
});




app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter);

app.use("/api",predictionRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
