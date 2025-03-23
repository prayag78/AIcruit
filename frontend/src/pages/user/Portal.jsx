import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Portal = () => {
  const { backendUrl } = useContext(AppContext);
  const { id } = useParams(); // Get job ID from URL
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [applicationtype, setApplicationType] = useState(searchParams.get("applicationtype") || "");
  const [worktype, setWorktype] = useState(searchParams.get("worktype") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Store selected job

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, applicationtype, worktype, category, location, jobs]);

  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id]);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recruiter/jobs`);
      if (data.success) {
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      } else {
        toast.error("Error fetching jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  // Fetch job by ID
  const fetchJobById = async (jobId) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recruiter/job/${jobId}`);
      if (data.success) {
        setSelectedJob(data.job);
      } else {
        toast.error("Job not found");
      }
    } catch (error) {
      console.error("Error fetching job", error);
    }
  };

  const applyFilters = () => {
    let filtered = jobs.filter((job) => {
      return (
        (search === "" ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.jobrole.toLowerCase().includes(search.toLowerCase()) ||
          job.location.toLowerCase().includes(search.toLowerCase()) ||
          job.category.toLowerCase().includes(search.toLowerCase())) &&
        (applicationtype === "" || job.applicationtype === applicationtype) &&
        (worktype === "" || job.worktype === worktype) &&
        (category === "" || job.category === category) &&
        (location === "" || job.location === location)
      );
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="flex flex-col h-screen">

      {/* Filters */}
      <div>
      <input
          type="text"
          placeholder="Search here"
          className="p-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="p-2 border rounded-lg" value={applicationtype} onChange={(e) => setApplicationType(e.target.value)}>
          <option value="">Type</option>
          <option value="job">Job</option>
          <option value="internship">Internship</option>
        </select>
        <select className="p-2 border rounded-lg" value={worktype} onChange={(e) => setWorktype(e.target.value)}>
          <option value="">Work Type</option>
          <option value="Remote">Remote</option>
          <option value="On-Site">On-Site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select className="p-2 border rounded-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select className="p-2 border rounded-lg" value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <div className="flex">
      {/* Sidebar - List of Jobs */}
      <div className="w-1/3 bg-gray-100 p-4 overflow-y-auto">

        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="p-3 border-b cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/portal/${job._id}`)}
          >
            <h3 className="font-bold">{job.jobrole}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <p className="text-xs text-gray-500">{job.location} | {job.worktype}</p>
          </div>
        ))}
      </div>

      {/* Job Details Section */}
      <div className="w-2/3 p-6">
        {selectedJob ? (
          <div className="p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">{selectedJob.jobrole}</h2>
            <p className="text-gray-600">{selectedJob.company}</p>
            <p className="text-sm text-gray-500">
              📍 {selectedJob.location} | 🏢 {selectedJob.worktype}
            </p>

            <h3 className="mt-4 text-lg font-semibold">Job Description</h3>
            <p className="text-sm text-gray-700">{selectedJob.description}</p>

            <h3 className="mt-4 text-lg font-semibold">Requirements</h3>

            <ul className="list-disc ml-6 text-sm text-gray-700">
              {(Array.isArray(selectedJob.requirements) ? selectedJob.requirements : [selectedJob.requirements]).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>


            <h3 className="mt-4 text-lg font-semibold">Salary</h3>
            <p className="text-sm text-gray-700">💰 {selectedJob.salary}</p>

            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">
              Apply Now
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Select a job to see details.</p>
        )}
      </div>
      </div>

    </div>
  );
};

export default Portal;
