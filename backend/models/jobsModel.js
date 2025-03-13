import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  company: { type: String, required: true },    //Google
  applicationtype: { type: String, required: true }, //job
  jobrole: { type: String, required: true },      //Software Developer
  location: { type: String, required: true },   //Bangalore 
  postdate: { type: String, required: true },  //11/02/2025
  deadline: { type: String, required: true },  //11/03/2025
  jobtype:{ type: String, required: true },        //Remote 
  jobtiming: { type: String, required: true }, //Full-time
  duration: {type : String },  //6 months 
  category: { type: String, required: true }, //web development
  salary: { type: String, required: true },  //10k-20k
  active: { type: Boolean, default: true }, //active
  experience: { type: String, default:"No experience" },  //No experience required
  workdays: { type: String, required:true },  //5 days a week
  description : { type: String, required: true },
  responsibilities: { type: String, required: true }, 
  requirements: { type: String, required: true }, 
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const jobsModel = mongoose.model("jobs", jobsSchema);

export default jobsModel; 
