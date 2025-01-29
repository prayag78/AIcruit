import userModel from "../models/usermodel.js";
import jobsModel from "../models/jobsModel.js";
import recruiterModel from "../models/recruiterModel.js";
import applicationsModel from "../models/applicationsModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v2 as cloudinary } from "cloudinary";

//API to register a user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, experience, skills, about } = req.body;

    // checking for all data to register user
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      experience,
      skills,
      about,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to login a user
export const loginUser = async (req, res) => {
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

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for recomanded jobs
export const recommendedJobs = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const userId = req.userId;
    const userDetails = await userModel.findById(
      userId,
      "experience skills about"
    );

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await jobsModel.find(
      {},
      {
        title: 1,
        requirements: 1,
        salary: 1,
        location: 1,
        _id: 1,
      }
    );

    const formattedUserDetails = JSON.stringify({
      experience: userDetails.experience,
      skills: userDetails.skills,
      about: userDetails.about,
    });

    const formattedJobs = JSON.stringify(jobs);

    const prompt = `
      You are a job matching expert. Analyze the following user profile and job listings to find the top 3 most relevant matches.
      
      User Profile:
      ${formattedUserDetails}

      Available Jobs:
      ${formattedJobs}

      Instructions:
      1. Analyze the user's skills, experience, and background
      2. Compare with each job's requirements
      3. Select the top 3 most relevant matches
      4. Return ONLY a JSON array without any markdown formatting, code blocks, or additional text. The array should have this exact structure:
      [
        {
          "jobId": "_id from the original job",
          "title": "job title",
          "requirements": "job requirements",
          "matchScore": "percentage match (number between 0-100)",
          "matchReason": "brief explanation of why this job matches"
        }
      ]
      
      Important: Do not include any markdown formatting, code blocks, or additional text in your response. Return only the raw JSON array.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    // Clean and parse the AI response
    let responseText = response.text();

    // Remove markdown code block formatting if present
    responseText = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "");

    // Remove any leading/trailing whitespace
    responseText = responseText.trim();

    let recommendedJobs;
    try {
      recommendedJobs = JSON.parse(responseText);

      // Validate the response structure
      if (!Array.isArray(recommendedJobs)) {
        throw new Error("Response is not an array");
      }

      // Validate each recommendation object
      recommendedJobs = recommendedJobs.map((job) => ({
        jobId: job.jobId || "",
        title: job.title || "",
        requirements: job.requirements || "",
        matchScore:
          typeof job.matchScore === "number"
            ? job.matchScore
            : parseInt(job.matchScore) || 0,
        matchReason: job.matchReason || "",
      }));
    } catch (error) {
      console.error("Error parsing AI response:", error);
      console.log("Raw response:", responseText); // For debugging
      return res.status(500).json({
        message: "Error processing AI recommendations",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      recommendations: recommendedJobs,
    });
  } catch (error) {
    console.error("Error in recommendedJobs:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//get user data
export const getUserData = async (req, res) => {
  try {
    const  userId  = req.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Apply for a job
export const applyJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.userId;

  try {
    // Check if the user has already applied for this job
    const isAlreadyApplied = await applicationsModel.findOne({ jobId, userId });

    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Check if the job exists
    const jobData = await jobsModel.findById(jobId);
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    // Create a new application
    await applicationsModel.create({
      jobId,
      userId,
      recruiterId: jobData.recruiter,
      date: Date.now(),
    });

    // Add userId to the applicants field in jobs collection
    await jobsModel.findByIdAndUpdate(jobId, {
      $addToSet: { applicants: userId }, // Prevent duplicate entries
    });

    // Add jobId to the appliedjobs field in user collection
    await userModel.findByIdAndUpdate(userId, {
      $addToSet: { appliedjobs: jobId }, // Prevent duplicate entries
    });

    res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Get user applied applications
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.userId;
    const applications = await applicationsModel
      .find({ userId }) //task need to add image for recruiter
      .populate("recruiterId", "name company location phone")
      .populate("jobId", "title location salary description")
      .exec();

    if (!applications) {
      return res.json({ success: false, message: "No applications found" });
    }

    res.json({ success: true, applications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update user data           ....need to verify
export const updateUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      experience,
      skills,
      about,
      institute,
      education,
      dob,
    } = req.body;

    const imageFile = req.file; // This will contain the uploaded file

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Update user data (excluding the image)
    await userModel.findByIdAndUpdate(userId, {
      name,
      experience,
      skills,
      about,
      institute,
      education,
      dob,
    });

    // If an image file is uploaded, upload it to Cloudinary and update the user's image URL
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//upload resume             ....need to verify
export const uploadResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeFile = req.file;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const userData = await userModel.findById(userId);

    if(resumeFile){
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    res.json({ success: true, message: "Resume uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
