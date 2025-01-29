import express from 'express';
import { registerRecruiter, loginRecruiter, postJob , getCompanyData , updateCompanyData, getJobs, getJobById,getCompanyJobs , updateJob , changeJobStatus , getCompanyApplications, jobApplicationStatus} from '../controllers/recruiterController.js';
import authRecruiter from '../middleware/authRecruiter.js';


const recruiterRouter = express.Router();

recruiterRouter.post('/register', registerRecruiter);
recruiterRouter.post('/login', loginRecruiter);
recruiterRouter.post('/post-job',authRecruiter ,postJob);
recruiterRouter.get('/jobs' ,getJobs); //get all jobs
recruiterRouter.get('/company-jobs',authRecruiter ,getCompanyJobs);   //get company posted jobs
recruiterRouter.put('/change-job-status',authRecruiter ,changeJobStatus);
recruiterRouter.get('/job/:id', getJobById);  //get job by id                 need to check after posted more jobs
recruiterRouter.get('/company-data',authRecruiter ,getCompanyData);
recruiterRouter.put('/company-details',authRecruiter ,updateCompanyData);
recruiterRouter.get('/get-applicants',authRecruiter ,getCompanyApplications);
recruiterRouter.put('/change-status',authRecruiter , jobApplicationStatus);
// recruiterRouter.get('/update-job',authRecruiter ,updateJob);

export default recruiterRouter;