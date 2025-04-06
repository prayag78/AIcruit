import bookmark_icon from "./bookmark_icon.png";
import calendar_icon from "./calendar_icon.png";
import dot_icon from "./dot_icon.png";
import group_icon from "./group_people_icon.png";
import hand_icon from "./hand_icon.png";
import like_icon from "./like_icon.png";
import location_icon from "./location_icon.png";
import contact_icon from "./contact_icon.png";
import email_icon from "./email_icon.png";
import instagram_icon from "./instagram_icon.png";
import institute_icon from "./institute_icon.png";
import linkedin_icon from "./linkedin_icon.png";
import resume_icon from "./resume_icon.png";
import upload_icon from "./upload_up_icon.png";
import x_icon from "./x_icon.png";
import profile_icon from "./profile_icon.svg";
import hero_sec from "./hero_sec.svg";
import wave from "./wave.svg";
import left from "./left_blurry.svg"
import right from "./right_blurry.svg"
import hero_sec2 from './hero_sec2.png'
import shapes1 from './shapes1.svg'
import hero_sec3 from './hero_sec3.png'
import jobsB from './jobsB.png'
import Programmer_bro from './Programmer_bro.svg'
import post_in from './post_in.svg'
import jobseeker from './jobseeker.png'
import recruiter from './recruiter.png'
import resume_upload from './resume_upload_icon.svg'
import AIcruit from './1.png'
import JoB from './JoB.jpg'
import logo from './logo1.png'
import relo from './recruiterlogin.png'
import uslo from './userlogin.png'

export const assets = {
  bookmark_icon,
  calendar_icon,
  dot_icon,
  group_icon,
  hand_icon,
  like_icon,
  location_icon,
  contact_icon,
  email_icon,
  instagram_icon,
  institute_icon,
  linkedin_icon,
  resume_icon,
  upload_icon,
  x_icon,
  profile_icon,
  hero_sec,
  hero_sec2,
  hero_sec3,
  wave,
  left,
  right,
  shapes1,
  jobsB,  
  Programmer_bro,
  post_in,
  jobseeker,
  recruiter,
  resume_upload,
  AIcruit,
  JoB,
  logo,
  relo,
  uslo,
};

export const jobsB_h = [
  {
    "id": 1,
    "name": "Google",
    "logo": instagram_icon
  },
  {
    "id": 2,
    "name": "Microsoft",
    "logo": instagram_icon
  },
  {
    "id": 3,
    "name": "Amazon",
    "logo": linkedin_icon
  },
  {
    "id": 4,
    "name": "Facebook",
    "logo": linkedin_icon
  },
  {
    "id": 5,
    "name": "Apple",
    "logo": linkedin_icon
  },
  {
    "id": 6,
    "name": "Netflix",
    "logo": instagram_icon
  }
]

export const jobsData = [
  {
    id: 1,
    title: "Web Developer",
    company: "Unnanu Enterprise AI Search",
    location: "Bengaluru",
    applicants: 883,
    daysLeft: 18,
    jobType: "job",
    locked: true
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "Tech Innovators",
    location: "Remote",
    applicants: 452,
    daysLeft: 12,
    jobType: "job",
    locked: false
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "AI Solutions Pvt Ltd",
    location: "Hyderabad",
    applicants: 679,
    daysLeft: 10,
    jobType: "job",
    locked: true
  }
];

export const userData = {
  "name": "Rahul Sharma",
  "email": "rahul.sharma@example.com",
  "password": "hashed_password_here",
  "phone": "+91 9876543210",
  "about": "Passionate full-stack developer with experience in MERN stack.",
  "experience": "3 years in web development",
  "skills": "JavaScript, React, Node.js, MongoDB, Express",
  "institute": "IIT Delhi",
  "education": "B.Tech in Computer Science",
  "dob": "1995-08-15T00:00:00.000Z",
  "image": "https://example.com/profile.jpg",
  "resume": "https://example.com/resume.pdf",
  "sociallink1": "https://linkedin.com/in/rahulsharma",
  "sociallink2": "https://github.com/rahulsharma",
  "sociallink3": "https://instagram.com/rahulsharma",
  "sociallink4": "https://twitter.com/rahulsharma",
  "appliedjobs": [
    "65fd123456789abcdef12345",
    "65fd6789abcdef1234567890"
  ]
};

export const jobData = [
  {
    "company": "Google",
    "applicationtype": "job",
    "jobrole": "Software Developer",
    "location": "Bangalore",
    "postdate": "11/02/2025",
    "deadline": "11/03/2025",
    "jobtype": "Remote",
    "jobtiming": "Full-time",
    "duration": "",
    "category": "Web Development",
    "salary": "₹15L - ₹25L per annum",
    "active": true,
    "experience": "2+ years",
    "workdays": "5 days a week",
    "description": "We are looking for a skilled software developer to join our engineering team. You will be responsible for designing, developing, and maintaining software applications.",
    "responsibilities": "Develop and maintain scalable applications, write clean and efficient code, work closely with the product team to deliver high-quality software.",
    "requirements": "Proficiency in JavaScript, React, Node.js, and MongoDB. Strong problem-solving skills and experience with cloud platforms like AWS.",
    "recruiter": "65fd123456789abcdef12345",
    "applicants": []
  },
  {
    "company": "Microsoft",
    "applicationtype": "job",
    "jobrole": "Backend Engineer",
    "location": "Hyderabad",
    "postdate": "10/02/2025",
    "deadline": "10/03/2025",
    "jobtype": "Hybrid",
    "jobtiming": "Full-time",
    "duration": "",
    "category": "Backend Development",
    "salary": "₹12L - ₹18L per annum",
    "active": true,
    "experience": "3+ years",
    "workdays": "5 days a week",
    "description": "Join our dynamic team as a backend engineer. You will be responsible for building robust and scalable APIs and managing databases.",
    "responsibilities": "Develop and optimize backend services, write unit tests, collaborate with frontend developers, and ensure high performance of applications.",
    "requirements": "Expertise in Node.js, Express, PostgreSQL, and Redis. Experience with microservices architecture is a plus.",
    "recruiter": "65fd6789abcdef1234567890",
    "applicants": []
  },
  {
    "company": "Amazon",
    "applicationtype": "job",
    "jobrole": "Frontend Developer",
    "location": "Delhi",
    "postdate": "15/02/2025",
    "deadline": "15/03/2025",
    "jobtype": "On-site",
    "jobtiming": "Full-time",
    "duration": "",
    "category": "Frontend Development",
    "salary": "₹10L - ₹20L per annum",
    "active": true,
    "experience": "1-3 years",
    "workdays": "5 days a week",
    "description": "We are seeking a talented frontend developer with expertise in modern JavaScript frameworks to create stunning user interfaces.",
    "responsibilities": "Develop responsive and user-friendly web applications, collaborate with designers and backend developers, and optimize applications for maximum speed.",
    "requirements": "Strong knowledge of HTML, CSS, JavaScript, React, and Redux. Experience with TypeScript is a plus.",
    "recruiter": "65fd9876543210abcdef5678",
    "applicants": []
  },
  {
    "company": "Flipkart",
    "applicationtype": "job",
    "jobrole": "Data Scientist",
    "location": "Bangalore",
    "postdate": "18/02/2025",
    "deadline": "18/03/2025",
    "jobtype": "Remote",
    "jobtiming": "Full-time",
    "duration": "",
    "category": "Data Science",
    "salary": "₹18L - ₹30L per annum",
    "active": true,
    "experience": "2+ years",
    "workdays": "5 days a week",
    "description": "As a data scientist at Flipkart, you will work on machine learning models and analytics to improve user experience and optimize business operations.",
    "responsibilities": "Develop and deploy ML models, analyze large datasets, create data-driven solutions, and collaborate with engineering teams.",
    "requirements": "Proficiency in Python, TensorFlow, SQL, and data visualization tools. Experience with big data technologies is preferred.",
    "recruiter": "65fdabcdef1234567890abcd",
    "applicants": []
  },
  {
    "company": "Zomato",
    "applicationtype": "internship",
    "jobrole": "Software Engineering Intern",
    "location": "Gurgaon",
    "postdate": "20/02/2025",
    "deadline": "20/03/2025",
    "jobtype": "On-site",
    "jobtiming": "Internship",
    "duration": "6 months",
    "category": "Software Development",
    "salary": "₹25,000 per month",
    "active": true,
    "experience": "No experience",
    "workdays": "5 days a week",
    "description": "We are looking for software engineering interns who are passionate about coding and eager to work on live projects.",
    "responsibilities": "Assist in software development, write clean code, and collaborate with senior developers.",
    "requirements": "Basic knowledge of JavaScript, React, and Node.js. Strong problem-solving skills.",
    "recruiter": "65fdabcdef0987654321abcd",
    "applicants": []
  },
  {
    "company": "Swiggy",
    "applicationtype": "internship",
    "jobrole": "Data Analyst Intern",
    "location": "Bangalore",
    "postdate": "22/02/2025",
    "deadline": "22/03/2025",
    "jobtype": "Remote",
    "jobtiming": "Internship",
    "duration": "3 months",
    "category": "Data Analytics",
    "salary": "₹20,000 per month",
    "active": true,
    "experience": "No experience",
    "workdays": "5 days a week",
    "description": "We are hiring a data analyst intern to help us analyze customer behavior and improve decision-making.",
    "responsibilities": "Analyze business data, generate reports, and provide actionable insights.",
    "requirements": "Knowledge of SQL, Excel, and data visualization tools. Strong analytical mindset.",
    "recruiter": "65fd87654321abcdef123456",
    "applicants": []
  },
  {
    "company": "Paytm",
    "applicationtype": "internship",
    "jobrole": "UI/UX Design Intern",
    "location": "Noida",
    "postdate": "25/02/2025",
    "deadline": "25/03/2025",
    "jobtype": "Hybrid",
    "jobtiming": "Internship",
    "duration": "4 months",
    "category": "Design",
    "salary": "₹18,000 per month",
    "active": true,
    "experience": "No experience",
    "workdays": "5 days a week",
    "description": "Looking for a UI/UX intern to help design engaging user interfaces for our applications.",
    "responsibilities": "Create wireframes, prototypes, and improve user experience based on feedback.",
    "requirements": "Proficiency in Figma, Adobe XD, and a strong understanding of UX principles.",
    "recruiter": "65fd56789abcdef012345678",
    "applicants": []
  },
  {
    "company": "TCS",
    "applicationtype": "internship",
    "jobrole": "Cloud Computing Intern",
    "location": "Mumbai",
    "postdate": "28/02/2025",
    "deadline": "28/03/2025",
    "jobtype": "On-site",
    "jobtiming": "Internship",
    "duration": "6 months",
    "category": "Cloud Computing",
    "salary": "₹22,000 per month",
    "active": true,
    "experience": "No experience",
    "workdays": "5 days a week",
    "description": "We are seeking a cloud computing intern to assist with cloud deployments and infrastructure management.",
    "responsibilities": "Work with AWS/GCP, set up cloud infrastructure, and optimize deployments.",
    "requirements": "Basic knowledge of cloud services, networking, and Linux.",
    "recruiter": "65fdabcdef65432109876543",
    "applicants": []
  }
]


