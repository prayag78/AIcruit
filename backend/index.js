import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import recruiterRouter from './routes/recruiterRoutes.js';

//app config
const app = express();
const port = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter)
app.use('/api/recruiter',recruiterRouter)



app.get('/', (req, res) => {
    res.send(`Server started at port ${port}`);
});

app.listen(port, () => console.log("Server Started at",port));