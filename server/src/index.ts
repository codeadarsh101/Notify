import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';


const app = express();
app.use(express.json());
app.use(cors({
   origin:"https://notify-orpin.vercel.app",
     credentials: true
}))
connectDB()
const PORT = process.env.PORT || 4000;

app.use('/api/user',userRouter)

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
