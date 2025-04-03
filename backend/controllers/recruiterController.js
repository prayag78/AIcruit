import recruiterModel from "../models/recruiterModel.js";
import userModel from "../models/userModel.js";
import jobsModel from "../models/jobsModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import applicationsModel from "../models/applicationsModel.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import sendEmail from "../utils/emails.js";

const otpStore = new Map();

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Registration",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>Verify Your Email</h2>
        <p>Your OTP for registration is:</p>
        <h1 style="color: #1C4980;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

//api to register a recruiter
export const sendOtp = async (req, res) => {
  try {
    const { name, email, password, company, location, phone } = req.body;

    // Checking for all required fields
    if (!name || !email || !password || !company || !location || !phone) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const existingUser = await recruiterModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Company already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // ✅ Store ALL required details
    otpStore.set(email, {
      name,
      password,
      company,
      location,
      phone,
      otp,
      createdAt: Date.now(),
    });

    await sendOTPEmail(email, otp);

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const registerRecruiter = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = otpStore.get(email);
    if (!user) {
      return res.json({ success: false, message: "OTP expired" });
    }

    if (otp !== user.otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() - user.createdAt > 5 * 60 * 1000) {
      return res.json({ success: false, message: "OTP expired" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const recruiterData = {
      name: user.name,
      email,
      password: hashedPassword,
      company: user.company,
      location: user.location,
      phone: user.phone,
    };

    const newRecruiter = new recruiterModel(recruiterData);
    const recruiter = await newRecruiter.save();
    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to login a recruiter
export const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking for all data to login user
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const recruiter = await recruiterModel.findOne({ email });

    if (!recruiter) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//post a job
export const postJob = async (req, res) => {
  try {
    // Destructure all fields from req.body EXCEPT company (which we will override)
    const {
      applicationtype,
      jobrole,
      location,
      postdate,
      deadline,
      jobtype,
      jobtiming,
      category,
      duration,
      salary,
      active,
      experience,
      workdays,
      description,
      responsibilities,
      requirements,
      recruiterId,
    } = req.body;

    if (!recruiterId) {
      return res
        .status(400)
        .json({ success: false, message: "Recruiter ID is required" });
    }

    // Lookup recruiter by ID to get the company name
    const recruiter = await recruiterModel.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ success: false, message: "Recruiter not found" });
    }

    // Create new job using company from recruiter data
    const newJob = new jobsModel({
      company: recruiter.company, // company comes from recruiter data
      applicationtype,
      jobrole,
      location,
      postdate,
      deadline,
      jobtype,
      jobtiming,
      category,
      duration,
      salary,
      active,
      experience,
      workdays,
      description,
      responsibilities,
      requirements,
      recruiter: recruiterId,
    });

    const job = await newJob.save();

    // Add this job ID to the recruiter’s posted jobs
    await recruiterModel.findByIdAndUpdate(
      recruiterId,
      { $push: { postedjobs: job._id } },
      { new: true }
    );

    res.json({ success: true, job });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get company data
export const getCompanyData = async (req, res) => {
  try {
    const recruiterId = req.body.recruiterId;
    
    if (!recruiterId) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    const recruiter = await recruiterModel.findById(recruiterId).select("-password");
    
    if (!recruiter) {
      return res.json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, data: recruiter });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update company data
export const updateCompanyData = async (req, res) => {
  try {
    const { recruiterId, name, company, location, phone } = req.body;

    await recruiterModel.findByIdAndUpdate(
      recruiterId,
      { name, company, location, phone },
      { new: true }
    );

    res.json({ success: true, message: "Profile successfully Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await jobsModel
      .find({ active: true })
      .populate({ path: "recruiter", select: "-password" });
    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get only active jobs
export const getActiveJobs = async (req, res) => {
  try {
    const jobs = await jobsModel
      .find({ active: true, applicationtype: "job" })
      .populate({ path: "recruiter", select: "-password" });

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get only active internships
export const getActiveInternships = async (req, res) => {
  try {
    const jobs = await jobsModel
      .find({ active: true, applicationtype: "internship" })
      .populate({ path: "recruiter", select: "-password" });
    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
    
  }
}

//get company posted jobs
export const getCompanyJobs = async (req, res) => {
  try {
    const recruiterId = req.body.recruiterId; // Access recruiterId from req
    if (!recruiterId) {
      return res.json({ success: false, message: "Recruiter ID missing" });
    }

    const jobs = await jobsModel
      .find({ recruiter: recruiterId })
      .populate({ path: "recruiter", select: "-password" });

    res.json({ success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//change job status
// export const changeJobStatus = async (req, res) => {
//   try {
//     const { jobId } = req.body;
//     const recruiterId = req.body.recruiterId;

//     if (!jobId) {
//       return res.status(400).json({
//         success: false,
//         message: "Job ID is required.",
//       });
//     }

//     const job = await jobsModel.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found.",
//       });
//     }

//     if (job.recruiter.toString() !== recruiterId.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this job.",
//       });
//     }

//     job.active = !job.active;
//     await job.save();

//     return res.status(200).json({
//       success: true,
//       message: "Job status updated successfully.",
//       job: {
//         id: job._id,
//         active: job.active,
//         title: job.title,
//         company: job.company,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating job status:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the job status.",
//     });
//   }
// };

export const changeJobStatus = async (req, res) => {
  try {
    // Ideally, recruiterId should come from auth middleware (e.g., req.recruiterId)
    const { jobId } = req.body;
    const recruiterId = req.body.recruiterId;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required."
      });
    }

    const job = await jobsModel.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found."
      });
    }

    // Ensure that the recruiter is authorized to update the job
    if (job.recruiter.toString() !== recruiterId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job."
      });
    }

    // Toggle the job's active status
    job.active = !job.active;
    await job.save();

    let updatedApplicationsCount = 0;
    // If the job is being closed (active is now false), update all pending applications to "closed"
    if (!job.active) {
      const result = await applicationsModel.updateMany(
        { jobId: job._id, status: "pending" },
        { $set: { status: "closed" } }
      );
      updatedApplicationsCount = result.modifiedCount;
    }

    return res.status(200).json({
      success: true,
      message: "Job status updated successfully.",
      job: {
        id: job._id,
        active: job.active,
        jobrole: job.jobrole, // using jobrole instead of non-existent title
        company: job.company,
      },
      updatedApplicationsCount
    });
  } catch (error) {
    console.error("Error updating job status:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the job status."
    });
  }
};

//get job by id 
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);

    const job = await jobsModel
      .findById(id)
      .populate({ path: "recruiter", select: "-password" });

    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//update job details
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.body; 

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }
    const {
      company,
      applicationtype,
      jobrole,
      location,
      deadline,
      jobtype,
      jobtiming,
      category,
      duration,
      salary,
      experience,
      workdays,
      responsibilities,
      requirements,
    } = req.body;

    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID is required" });
    }

    const updatedJob = await jobsModel.findByIdAndUpdate(
      jobId,
      {
        company,
        applicationtype,
        jobrole,
        location,
        deadline,
        jobtype,
        jobtiming,
        category,
        duration,
        salary,
        experience,
        workdays,
        responsibilities,
        requirements,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({
      success: true,
      message: "Job details successfully updated",
      job: updatedJob,
    });
  } catch (error) {
    console.log("Error updating job:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get company job aplications
export const getCompanyApplications = async (req, res) => {
  try {
    const recruiterId = req.body.recruiterId;

    const applications = await applicationsModel
      .find({ recruiterId })
      .populate("userId", "name image resume phone")
      .populate("jobId", "company title location date jobType salary");

    res.json({ success: true, applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all aplicants for a job   ...need to verify
export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.body;

    const applications = await applicationsModel
    .find({ jobId })
    .populate("userId", "name image resume phone");
  
    console.log(applications);
  

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//accept or reject an application  //need to verify
// export const acceptRejectApplication = async (req, res) => {
//   try {
//     const recruiterId = req.body.recruiterId;
//     const { applicationId, status } = req.body;

//     if (!applicationId || !status) {
//       return res.status(400).json({ success: false, message: "Application ID and status are required." });
//     }

//     // Validate status
//     if (status.toLowerCase() !== "accepted" && status.toLowerCase() !== "rejected") {
//       return res.status(400).json({ success: false, message: "Invalid status. Must be 'accepted' or 'rejected'." });
//     }

//     // Find application with related job and user details
//     const application = await applicationsModel.findById(applicationId).populate("jobId userId");

//     if (!application) {
//       return res.status(404).json({ success: false, message: "Application not found." });
//     }

//     // Ensure the application is still pending
//     if (application.status !== "pending") {
//       return res.status(400).json({ success: false, message: "This application is already processed." });
//     }

//     const job = await jobsModel.findById(application.jobId);
//     if (!job || job.recruiter.toString() !== recruiterId) {
//       return res.status(403).json({ success: false, message: "Unauthorized action." });
//     }

//     // Update application status
//     // application.status = "closed";
//     // await application.save();

//     // If accepted, deactivate the job
//     // if (status.toLowerCase() === "accepted") {
//     //   job.active = false;
//     //   await job.save();
//     // }
//     await job.save();

//     // Fetch user details
//     const user = await userModel.findById(application.userId);

//     // Send acceptance/rejection email
//     await sendEmail(user.email, status, job.jobrole, job.company);

//     return res.status(200).json({
//       success: true,
//       message: `Application ${status.toLowerCase()} successfully. Email sent to ${user.email}.`,
//     });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

export const acceptRejectApplication = async (req, res) => {
  try {
    // Ideally, recruiterId should come from auth middleware (e.g., req.recruiterId)
    const recruiterId = req.body.recruiterId;
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({ 
        success: false, 
        message: "Application ID and status are required." 
      });
    }

    // Validate status (only "accepted" or "rejected" allowed)
    const validStatus = status.toLowerCase();
    if (validStatus !== "accepted" && validStatus !== "rejected") {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status. Must be 'accepted' or 'rejected'." 
      });
    }

    // Find the application and populate related job and user details.
    // Make sure to populate the user's email (and any other required fields).
    const application = await applicationsModel.findById(applicationId)
      .populate("jobId", "jobrole company recruiter")
      .populate("userId", "name email");
      
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: "Application not found." 
      });
    }

    // Ensure the application is still pending (hasn't been processed before)
    if (application.status !== "pending") {
      return res.status(400).json({ 
        success: false, 
        message: "This application is already processed." 
      });
    }

    // Check if the recruiter is authorized to update this application
    const job = await jobsModel.findById(application.jobId);
    if (!job || job.recruiter.toString() !== recruiterId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized action." 
      });
    }

    // Update the application status to accepted or rejected
    application.status = validStatus;
    await application.save();

    // Send email to the applicant with the result.
    // sendEmail(email, status, jobrole, company)
    await sendEmail(application.userId.email, validStatus, job.jobrole, job.company);

    return res.status(200).json({
      success: true,
      message: `Application ${validStatus} successfully. Email sent to ${application.userId.email}.`
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

//delete job 
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const recruiterId = req.body.recruiterId;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    const job = await jobsModel.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (job.recruiter.toString() !== recruiterId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job.",
      });
    }

    await jobsModel.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

