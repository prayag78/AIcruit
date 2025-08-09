import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJobs = () => {
  const { token, backendUrl, userData } = useContext(AppContext);

  const [jobData, setJobData] = useState({
    applicationtype: "",
    jobrole: "",
    location: "",
    postdate: "",
    deadline: "",
    jobtype: "",
    jobtiming: "",
    category: "",
    duration: "",
    salary: "",
    experience: "",
    workdays: "",
    description: "",
    responsibilities: "",
    requirements: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload – recruiterId is obtained from userData (from auth middleware)
    const payload = { ...jobData, recruiterId: userData?._id };

    try {
      const response = await axios.post(
        `${backendUrl}/api/recruiter/post-job`,
        payload,
        {
          headers: { token : token} 
        }
      );
      if (response.data.success) {
        toast.success("Job posted successfully!");
        setJobData({
          applicationtype: "",
          jobrole: "",
          location: "",
          postdate: "",
          deadline: "",
          jobtype: "",
          jobtiming: "",
          category: "",
          duration: "",
          salary: "",
          experience: "",
          workdays: "",
          description: "",
          responsibilities: "",
          requirements: "",
        });
      } else {
        toast.error(response.data.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Error posting job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Role */}
        <div>
          <label className="block font-medium">Job Role</label>
          <input
            type="text"
            name="jobrole"
            value={jobData.jobrole}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter job role"
            required
          />
        </div>
        {/* Application Type */}
        <div>
          <label className="block font-medium">Application Type</label>
          <select
            name="applicationtype"
            value={jobData.applicationtype}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="job">Job</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        {/* Location */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter location"
            required
          />
        </div>
        {/* Post Date */}
        <div>
          <label className="block font-medium">Post Date</label>
          <input
            type="date"
            name="postdate"
            value={jobData.postdate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Deadline */}
        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={jobData.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Job Type */}
        <div>
          <label className="block font-medium">Job Type</label>
          <select
            name="jobtype"
            value={jobData.jobtype}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Remote">Remote</option>
            <option value="On-Site">On-Site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        {/* Job Timing */}
        <div>
          <label className="block font-medium">Job Timing</label>
          <select
            name="jobtiming"
            value={jobData.jobtiming}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Timing</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={jobData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter category (e.g., Web Development)"
            required
          />
        </div>
        {/* Duration */}
        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={jobData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter duration (e.g., 6 months)"
          />
        </div>
        {/* Salary */}
        <div>
          <label className="block font-medium">Salary</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter salary range (e.g., 10k-20k)"
            required
          />
        </div>
        {/* Experience */}
        <div>
          <label className="block font-medium">Experience</label>
          <textarea
            type="text"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter experience requirements"
          />
        </div>
        {/* Workdays */}
        <div>
          <label className="block font-medium">Workdays</label>
          <input
            type="text"
            name="workdays"
            value={jobData.workdays}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter working days (e.g., 5 days a week)"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block font-medium">Job Description</label>
          <textarea
            type="text"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter job description"
            required
          />
        </div>
        {/* Responsibilities */}
        <div>
          <label className="block font-medium">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={jobData.responsibilities}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter job responsibilities"
            required
          ></textarea>
        </div>
        {/* Requirements */}
        <div>
          <label className="block font-medium">Requirements</label>
          <textarea
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter job requirements"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default AddJobs;
