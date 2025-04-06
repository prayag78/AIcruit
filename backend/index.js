// /api/index.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../config/mongodb.js';
import userRouter from '../routes/userRoutes.js';
import recruiterRouter from '../routes/recruiterRoutes.js';
import connectCloudinary from '../config/cloudinary.js';

const app = express();

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/recruiter', recruiterRouter);

app.get('/', (req, res) => {
  res.send('Serverless backend running on Vercel 🔥');
});

// ✅ DO NOT use app.listen()
export default app; // Important for Vercel
