import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true }, 
  location: { type: String, required: true }, 
  date: { type: String, required: true }, 
  deadline: { type: String, required: true }, 
  jobType: { type: String, required: true },
  jobtiming: { type: String, required: true }, 
  category: { type: String, required: true }, 
  salary: { type: String, required: true }, 
  active: { type: Boolean, default: true },
  experience: { type: String },
  workingdays: { type: String },
  description: { type: String, required: true }, 
  requirements: { type: String, required: true }, 
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const jobsModel = mongoose.model("jobs", jobsSchema);

export default jobsModel; 
