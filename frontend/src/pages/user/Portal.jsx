import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaUsers, FaClock } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import {
  MdCalendarToday,
  MdWorkOutline,
  MdAccessTime,
  MdBusinessCenter,
} from "react-icons/md";

const Portal = () => {
  const { backendUrl, utoken, userData } = useContext(AppContext);
  const { id } = useParams(); // Get job ID from URL
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [applicationtype, setApplicationType] = useState(
    searchParams.get("applicationtype") || ""
  );
  const [jobtype, setjobtype] = useState(searchParams.get("jobtype") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState("list"); // 'list' | 'details'

  const isApplied = userData?.appliedjobs?.includes(selectedJob?._id);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, applicationtype, jobtype, category, location, jobs]);

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
      const { data } = await axios.get(
        `${backendUrl}/api/recruiter/job/${jobId}`
      );
      if (data.success) {
        setSelectedJob(data.job);
      } else {
        toast.error("Job not found");
      }
    } catch (error) {
      console.error("Error fetching job", error);
    }
  };

  const applyJob = async (jobId) => {
    if (!utoken) {
      toast.error("Please login to apply for jobs");
      navigate("/login");
      return;
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/apply`,
        { jobId },
        {
          headers: {
            token: utoken,
          },
        }
      );
      if (data.success) {
        localStorage.removeItem("recommendedJobsCache");
        localStorage.removeItem("recommendedInternshipsCache");
        toast.success("Applied successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error applying job", error);
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
        (jobtype === "" || job.jobtype === jobtype) &&
        (category === "" || job.category === category) &&
        (location === "" || job.location === location)
      );
    });
    setFilteredJobs(filtered);
  };

  return (
    <div className="flex flex-col h-screen ml-4 mr-4">
      {/* Filters */}
      <div className="flex gap-4 p-2 bg-gray-100 overflow-scroll">
        <input
          type="text"
          placeholder="Search here"
          className="p-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded-lg"
          value={applicationtype}
          onChange={(e) => setApplicationType(e.target.value)}
        >
          <option value="">Type</option>
          <option value="job">Job</option>
          <option value="internship">Internship</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={jobtype}
          onChange={(e) => setjobtype(e.target.value)}
        >
          <option value="">Job Type</option>
          <option value="Remote">Remote</option>
          <option value="On-Site">On-Site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
        </select>
        <select
          className="p-2 border rounded-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row max-h-[90vh]">
        {/* Job List */}
        {(mobileView === "list" || !isMobile) && (
          <div className={`md:w-1/3 w-full bg-white p-2 overflow-y-auto`}>
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 ${
                  selectedJob && selectedJob._id === job._id
                    ? "bg-blue-100 border-blue-500"
                    : "bg-gray-50"
                }`}
                onClick={() => {
                  navigate(`/portal/${job._id}`);
                  if (isMobile) setMobileView("details");
                }}
              >
                {/* Job card content */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center group mr-2">
                    {job.recruiter?.image ? (
                      <>
                        <img
                          src={job.recruiter.image}
                          alt={job.company}
                          className="absolute object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-600">
                        {job.company?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-blue-600">
                      {job.jobrole}
                    </h3>
                    <p className="text-sm text-gray-700">{job.company}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                  <span>{job.location}</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <FaUsers className="text-gray-500" />
                  <span>883 Applied</span>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <FaClock className="text-gray-500" />
                  <span>{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Job Details */}
        {(mobileView === "details" || !isMobile) && (
          <div className="md:w-2/3 w-full p-2 h-[90vh] overflow-auto">
            {selectedJob ? (
              <div className="p-6 border min-h-[85vh] rounded-lg shadow-lg">
                {isMobile && (
                  <button
                    onClick={() => setMobileView("list")}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    ⬅ Back to Jobs
                  </button>
                )}
                {/* Job detail content */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedJob.jobrole}
                    </h2>
                    <p className="text-gray-600">
                      {selectedJob.company} ||{" "}
                      <span>{selectedJob.applicationtype}</span>
                    </p>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>{selectedJob.location}</span>
                      <FaClock className="text-gray-500" />
                      <span>
                        {Math.round(
                          (new Date(selectedJob.deadline) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days left
                      </span>
                      <FaUsers className="text-gray-500" />
                      <span>{selectedJob.applicants.length}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => !isApplied && applyJob(selectedJob._id)}
                  className={`mt-4 px-6 py-2 rounded-lg w-full font-semibold ${
                    isApplied
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                  disabled={isApplied}
                >
                  {isApplied ? "Applied" : "Apply Now"}
                </button>

                <h3 className="mt-6 text-lg font-semibold">Job Description</h3>
                <p className="text-sm text-gray-700">
                  {selectedJob.description}
                </p>

                <h3 className="mt-4 text-lg font-semibold">Requirements</h3>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {(Array.isArray(selectedJob.requirements)
                    ? selectedJob.requirements
                    : [selectedJob.requirements]
                  ).map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h3 className="mt-4 text-lg font-semibold">Responsibilities</h3>
                <ul className="list-disc ml-6 text-sm text-gray-700">
                  {(Array.isArray(selectedJob.responsibilities)
                    ? selectedJob.responsibilities
                    : [selectedJob.responsibilities]
                  ).map((res, index) => (
                    <li key={index}>{res}</li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="p-3 border rounded-lg flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-base font-medium">
                      <RiMoneyRupeeCircleLine className="text-xl" /> Salary
                    </span>
                    <p>{selectedJob.salary}</p>
                  </div>
                  <div className="p-3 border rounded-lg flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-base font-medium">
                      <MdCalendarToday className="text-xl" /> Internship
                      Duration
                    </span>
                    <p>{selectedJob.duration}</p>
                  </div>
                  <div className="p-3 border rounded-lg flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-base font-medium">
                      <MdWorkOutline className="text-xl" /> Working Days
                    </span>
                    <p>{selectedJob.workdays}</p>
                  </div>
                  <div className="p-3 border rounded-lg flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-base font-medium">
                      <MdBusinessCenter className="text-xl" /> Internship Type
                    </span>
                    <p>{selectedJob.jobtype}</p>
                  </div>
                  <div className="p-3 border rounded-lg flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-base font-medium">
                      <MdAccessTime className="text-xl" /> Internship Timing
                    </span>
                    <p>{selectedJob.jobtiming}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select a job to see details.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portal;
