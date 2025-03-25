import express from 'express';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
import multer from 'multer';


import { registerUser,loginUser,recommendedJobs, recommendedInternships,getUserData, applyJob, getUserApplications, updateUserData , sendOTP  } from '../controllers/userController.js';
import { getJobs } from '../controllers/recruiterController.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post("/send-otp", sendOTP);
userRouter.post('/login', loginUser);
userRouter.post('/recommended-jobs',authUser, recommendedJobs);
userRouter.post('/recommended-internships',authUser, recommendedInternships);
userRouter.get('/jobs',authUser, getJobs);
userRouter.get('/user-data',authUser,getUserData);
userRouter.post('/apply',authUser,applyJob);
userRouter.get('/applications',authUser,getUserApplications);
userRouter.post('/update-profile', upload.single('image'),authUser,updateUserData);
userRouter.post('/upload-resume', upload.single('resume'),authUser,updateUserData);

export default userRouter;