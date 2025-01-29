import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "jobs" , required: true},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" , required: true},
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter"  , required: true},
  status: { type: String, default: "pending" },
  date : {type:Number , required:true}
});
const applicationsModel = mongoose.model('applications', applicationsSchema);
export default applicationsModel;
