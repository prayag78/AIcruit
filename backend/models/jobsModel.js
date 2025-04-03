import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  company: { type: String, required: true },    
  applicationtype: { type: String, required: true, enum: ["job", "internship"] },
  jobrole: { type: String, required: true },      
  location: { type: String, required: true }, 
  postdate: { type: String, required: true },  
  deadline: { type: String, required: true }, 
  jobtype:{ type: String, required: true },       
  jobtiming: { type: String, required: true }, 
  duration: {type : String },  
  category: { type: String, required: true }, 
  salary: { type: String, required: true },  
  active: { type: Boolean, default: true }, 
  experience: { type: String, default:"No experience" },  
  workdays: { type: String, required:true }, 
  description : { type: String, required: true },
  responsibilities: { type: String, required: true }, 
  requirements: { type: String, required: true }, 
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const jobsModel = mongoose.model("jobs", jobsSchema);

export default jobsModel; 
