# AIcruit - AI-Powered Job Portal

A modern, full-stack job portal that leverages artificial intelligence to match job seekers with their ideal opportunities. Built with React, Node.js, and MongoDB, AIcruit provides a seamless experience for both job seekers and recruiters.

## 🚀 Features

### For Job Seekers

- **AI-Powered Job Matching**: Intelligent recommendations based on skills and preferences
- **Comprehensive Job Search**: Browse jobs and internships with advanced filtering
- **User Profiles**: Create detailed profiles with skills, experience, and education
- **Application Tracking**: Monitor application status and manage applied positions
- **Resume Upload**: Upload and manage resumes for applications
- **Responsive Design**: Optimized for all devices and screen sizes

### For Recruiters

- **Job Posting**: Create and manage job and internship listings
- **Application Management**: Review and manage incoming applications
- **Company Profiles**: Build and maintain company presence
- **Analytics Dashboard**: Track job performance and applicant metrics

### Technical Features

- **Real-time Notifications**: Instant updates on applications and job status
- **Email Integration**: Automated email notifications using Nodemailer
- **File Upload**: Resume and document management with Cloudinary
- **Authentication**: Secure JWT-based authentication for users and recruiters
- **AI Integration**: Google Generative AI for intelligent job matching
- **Responsive UI**: Modern interface built with Tailwind CSS and Framer Motion

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Date-fns** - Date utility library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image and video management
- **Nodemailer** - Email sending
- **Google Generative AI** - AI-powered features
- **CORS** - Cross-origin resource sharing
- **Validator** - Input validation

## 📁 Project Structure

```
AIcruit/
├── backend/               # Node.js/Express server
│   ├── config/            # Database and service configurations
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication and validation
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── utils/             # Utility functions
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Functional components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   └── assets/        # Images and static files
│   └── public/            # Public assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd AIcruit
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the backend directory:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   GOOGLE_AI_API_KEY=your_google_ai_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

5. **Start the development servers**

   Backend:

   ```bash
   cd backend
   npm run dev
   ```

   Frontend:

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📱 Key Pages & Features

### User Interface

- **Home**: AI-powered job matching showcase
- **Jobs**: Browse and search job listings
- **Internships**: Find internship opportunities
- **Profile**: Manage personal information and applications
- **Portal**: AI-recommended job matches

### Recruiter Interface

- **Dashboard**: Overview of posted jobs and applications
- **Post Jobs**: Create new job and internship listings
- **Manage Jobs**: Edit and manage existing postings
- **Applications**: Review and manage candidate applications
- **Profile**: Company and recruiter profile management

## 📄 License

This project is licensed under the MIT License. See the [`LICENSE`](./LICENSE) file for details.
