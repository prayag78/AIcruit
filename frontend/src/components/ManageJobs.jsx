import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Briefcase, User, Clock, DollarSign, Award, ClipboardList, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const ManageJobs = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const fetchCompanyJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/recruiter/company-jobs`, {
        headers: { token: token },
      });
      setJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch company jobs");
    } finally {
      setLoading(false);
    }
  };

  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      await axios.put(
        `${backendUrl}/api/recruiter/change-job-status`,
        // { active: !currentStatus },
        { headers: { token: token },
        jobId: jobId,}
      );
      toast.success(`Job ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchCompanyJobs();
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status");
    }
  };

  const deleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await axios.delete(`${backendUrl}/api/recruiter/jobs/${jobId}`, {
          headers: { token: token }
        });
        toast.success("Job deleted successfully");
        fetchCompanyJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      }
    }
  };

  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  console.log("Jobs:", jobs);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 h-[100vh] overflow-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Job Postings</h1>
          <p className="text-gray-600 mt-2">
            {jobs.length} {jobs.length === 1 ? 'job posting' : 'job postings'} found
          </p>
        </div>
        <button
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
          onClick={() => {/* Add navigation to create job page */}}
        >
          + Post New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No job postings found</h3>
          <p className="text-gray-500 mb-4">Create your first job posting to get started</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Create Job
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job,index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{job.jobrole}</h3>
                    <p className="text-blue-600 font-medium uppercase">{job.applicationtype}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {job.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    <span>{job.jobtype} • {job.jobtiming}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Deadline: {format(new Date(job.deadline), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Salary: {job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Award className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Experience: {job.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Duration: {job.duration}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1 flex items-center">
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Requirements
                  </h4>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    {job.requirements.split('. ').filter(Boolean).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span>{job.applicants?.length || 0} applicants</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleJobStatus(job._id, job.active)}
                      className={`p-2 rounded-md ${
                        job.active 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                      title={job.active ? 'Deactivate' : 'Activate'}
                    >
                      {job.active ? <XCircle size={18} /> : <CheckCircle size={18} />}
                    </button>
                    <button
                      className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;