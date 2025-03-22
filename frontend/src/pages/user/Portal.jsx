import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext"; // Import context
import { toast } from "react-toastify";

const Portal = () => {
  const { backendUrl } = useContext(AppContext); // Get backend URL from context

  const [search, setSearch] = useState("");
  const [applicationtype, setApplicationType] = useState("");
  const [jobtype, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]); // Initially empty, will fetch from API
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, applicationtype, jobtype, category, location, jobs]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recruiter/jobs`); 
      if (data.success) {
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      } else {
        toast.error("Error fetching jobs");
        console.error("Error fetching jobs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs", error);
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
    <div className="flex flex-wrap gap-3 p-4">
      <input
        type="text"
        placeholder="Search here"
        className="p-2 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select className="p-2 border rounded-lg" onChange={(e) => setApplicationType(e.target.value)}>
        <option value="">Jobs</option>
        <option value="job">Job</option>
        <option value="internship">Internship</option>
      </select>
      <select className="p-2 border rounded-lg" onChange={(e) => setJobType(e.target.value)}>
        <option value="">Work Type</option>
        <option value="Remote">Remote</option>
        <option value="On-Site">On-Site</option>
        <option value="Hybrid">Hybrid</option>
      </select>
      <select className="p-2 border rounded-lg" onChange={(e) => setCategory(e.target.value)}>
        <option value="">Category</option>
        <option value="Web Development">Web Development</option>
        <option value="Data Science">Data Science</option>
      </select>
      <select className="p-2 border rounded-lg" onChange={(e) => setLocation(e.target.value)}>
        <option value="">Location</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
      <div className="w-full mt-4">
        {filteredJobs.map((job, index) => (
          <div key={index} className="p-3 border-b">
            <h3>{job.company} - {job.jobrole}</h3>
            <p>{job.location} | {job.jobtype}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portal;
