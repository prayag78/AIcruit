import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  FileText,
  Calendar,
  Mail,
  Phone,
  Download,
  Search,
} from "lucide-react";

const Applications = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //console.log("applications", applications);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    closed: "bg-gray-100 text-gray-800",
  };

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/recruiter/get-applicants`,
        {
          headers: { token: token },
        }
      );

      if (data.success) {
        setApplications(data.applications || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/recruiter/update-application-status`,
        { applicationId, status: newStatus },
        { headers: { token: token } }
      );

      if (data.success) {
        setApplications(
          applications.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        toast.success(`Application ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No applications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {application.userId?.image ? (
                      <img
                        src={application.userId.image}
                        alt={application.userId?.name || "Applicant"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">
                      {application.userId?.name || "Unknown Applicant"}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        statusColors[application.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span>
                      Applied Date:{" "}
                      {application.date
                        ? new Date(application.date).toLocaleDateString()
                        : "Unknown date"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <a
                      href={`mailto:${application.email}`}
                      className="hover:text-blue-600"
                    >
                      {application.email || "No email provided"}
                    </a>
                  </div>

                  {application.userId?.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-500" />
                      <span>{application.userId.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2 text-gray-500" />
                    {application.userId?.resume ? (
                      <a
                        href={application.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-blue-600"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400">No resume available</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {application.status === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(application._id, "accepted")
                        }
                        className="flex-1 px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(application._id, "rejected")
                        }
                        className="flex-1 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <div
                      className={`flex-1 px-4 py-2 rounded-md text-center ${
                        application.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
