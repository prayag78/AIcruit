import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    postedjobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs" }],
    });

const recruiterModel = mongoose.model("recruiter", recruiterSchema);

export default recruiterModel;