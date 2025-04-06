import userModel from "../models/userModel.js";
import jobsModel from "../models/jobsModel.js";
import recruiterModel from "../models/recruiterModel.js";
import applicationsModel from "../models/applicationsModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

const otpStore = new Map();

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

// Send OTP API
export const sendOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { name, password, otp, createdAt: Date.now() });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to register a user
export const registerUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check email and OTP
    if (!email || !otp) {
      return res.json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    // Get stored OTP details
    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.json({ success: false, message: "OTP expired or not found" });
    }

    // Check OTP match
    if (storedData.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(storedData.password, salt);

    // Create user in DB
    const newUser = new userModel({
      name: storedData.name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    otpStore.delete(email); // Remove OTP after successful registration

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

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

//API for recommended jobs

export const recommendedJobs = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userId = req.userId;
    const userDetails = await userModel.findById(
      userId,
      "experience skills about"
    );

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await jobsModel
      .find({ applicationtype: "job" })
      .populate({ path: "recruiter", select: "name company location image" }); // Populate recruiter data

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No job openings found" });
    }

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
      1. Analyze the user's skills, experience, and background.
      2. Compare with each job's requirements.
      3. Select the top 3 most relevant matches.
      4. Return ONLY a JSON array without any markdown formatting, code blocks, or additional text. The array should have this exact structure:
      [
        {
          "jobId": "_id from the original job",
          "matchScore": "percentage match (number between 0-100)"
        }
      ]

      Important: Do not include any markdown formatting, code blocks, or additional text in your response. Return only the raw JSON array.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    let responseText = response
      .text()
      .trim()
      .replace(/```json\n?|```\n?/g, "");

    let recommendedJobs;
    try {
      recommendedJobs = JSON.parse(responseText);

      if (!Array.isArray(recommendedJobs)) {
        throw new Error("Response is not an array");
      }

      recommendedJobs = recommendedJobs.map((job) => {
        const matchedJob = jobs.find((j) => j._id.toString() === job.jobId);

        let matchReason = "";
        if (job.matchScore >= 80) {
          matchReason = `🔥 You're a perfect fit for this job! Your skills align well, and this is a great opportunity to level up your career. Go for it! 🚀`;
        } else if (job.matchScore >= 60) {
          matchReason = `👌 You match well with this job, but consider improving some skills to stand out. Keep pushing forward!`;
        } else {
          matchReason = `💡 This job might be a challenge, but don't be discouraged! Keep learning, and soon you'll land the perfect role. Keep grinding!`;
        }

        return {
          jobId: job.jobId,
          company: matchedJob?.company || "Unknown",
          recruiter: matchedJob?.recruiter || {}, // Include recruiter data
          applicationtype: matchedJob?.applicationtype || "Unknown",
          jobrole: matchedJob?.jobrole || "Unknown",
          matchScore: job.matchScore,
          postdate: matchedJob?.postdate || "Unknown",
          location: matchedJob?.location || "Unknown",
          image: matchedJob?.recruiter?.image || "Unknown",
          deadline: matchedJob?.deadline || "Unknown",
          applicants: matchedJob?.applicants || [],
          matchReason,
        };
      });
    } catch (error) {
      console.error("Error parsing AI response:", error);
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

export const recommendedInternships = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userId = req.userId;
    const userDetails = await userModel.findById(
      userId,
      "experience skills about"
    );

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await jobsModel
      .find({ applicationtype: "internship" })
      .populate({ path: "recruiter", select: "name company location image" }); // Populate recruiter data

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No internship openings found" });
    }

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
      1. Analyze the user's skills, experience, and background.
      2. Compare with each job's requirements.
      3. Select the top 3 most relevant matches.
      4. Return ONLY a JSON array without any markdown formatting, code blocks, or additional text. The array should have this exact structure:
      [
        {
          "jobId": "_id from the original job",
          "matchScore": "percentage match (number between 0-100)"
        }
      ]

      Important: Do not include any markdown formatting, code blocks, or additional text in your response. Return only the raw JSON array.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    let responseText = response
      .text()
      .trim()
      .replace(/```json\n?|```\n?/g, "");

    let recommendedJobs;
    try {
      recommendedJobs = JSON.parse(responseText);

      if (!Array.isArray(recommendedJobs)) {
        throw new Error("Response is not an array");
      }

      recommendedJobs = recommendedJobs.map((job) => {
        const matchedJob = jobs.find((j) => j._id.toString() === job.jobId);

        let matchReason = "";
        if (job.matchScore >= 80) {
          matchReason = `🔥 You're a perfect fit for this internship! Your skills align well, and this is a great opportunity to level up your career. Go for it! 🚀`;
        } else if (job.matchScore >= 60) {
          matchReason = `👌 You match well with this internship, but consider improving some skills to stand out. Keep pushing forward!`;
        } else {
          matchReason = `💡 This internship might be a challenge, but don't be discouraged! Keep learning, and soon you'll land the perfect role. Keep grinding!`;
        }

        return {
          jobId: job.jobId,
          company: matchedJob?.company || "Unknown",
          recruiter: matchedJob?.recruiter || {}, // Include recruiter data
          applicationtype: matchedJob?.applicationtype || "Unknown",
          jobrole: matchedJob?.jobrole || "Unknown",
          postdate: matchedJob?.postdate || "Unknown",
          location: matchedJob?.location || "Unknown",
          image: matchedJob?.recruiter?.image || "Unknown",
          deadline: matchedJob?.deadline || "Unknown",
          applicants: matchedJob?.applicants || [],
          matchScore: job.matchScore,
          matchReason,
        };
      });
    } catch (error) {
      console.error("Error parsing AI response:", error);
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
    console.error("Error in recommendedInternships:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//get user data
export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
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
      .populate(
        "jobId",
        "title location salary description company jobrole postdate deadline applicationtype"
      )
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

export const updateUserData = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const {
      name,
      experience,
      skills,
      about,
      phone,
      institute,
      education,
      dob,
      sociallink1,
      sociallink2,
      sociallink3,
      sociallink4,
    } = req.body;

    // Make sure to get the first file from the arrays
    const imageFile = req.files?.image ? req.files.image[0] : null;
    const resumeFile = req.files?.resume ? req.files.resume[0] : null;

    // Fetch current user data
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    let updatedFields = {
      name,
      experience,
      about,
      phone,
      institute,
      education,
      dob,
      sociallink1,
      sociallink2,
      sociallink3,
      sociallink4,
    };

    if (skills) {
      try {
        updatedFields.skills = JSON.parse(skills);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid skills format." });
      }
    }

    if (imageFile) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        type: "upload",
      });
      updatedFields.image = imageUpload.secure_url;
    }

    if (resumeFile) {
      // Upload resume to Cloudinary (as a raw file)
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "auto",
        type: "upload",
      });
      updatedFields.resume = resumeUpload.secure_url;
    }

    // Update user in DB
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updatedFields,
      { new: true }
    );

    res.json({ success: true, message: "Profile Updated", user: updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
