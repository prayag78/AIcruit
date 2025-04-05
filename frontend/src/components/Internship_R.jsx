import React from "react";
import { useState, useEffect, useContext } from "react";
import { MapPin, Users, Calendar } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Internship_R = () => {
  const { utoken, backendUrl, allinternships } = useContext(AppContext);
  const [reinternships, setReinternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  console.log(allinternships);

  const handleJobClick = (jobId) => {
    navigate(`/portal/${jobId}`);
  };

  const fetchReInternships = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.get(
        `${backendUrl}/api/user/recommended-internships`,
        {
          headers: { token: utoken },
        }
      );

      if (data.success && data.recommendations) {
        setReinternships(data.recommendations);
      } else {
        setError(data.message || "No recommendations found");
        toast.info(data.message || "No job recommendations available yet");
      }
    } catch (error) {
      setError("Failed to fetch recommendations");
      toast.error("Error fetching recommended jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (utoken) {
      fetchReInternships();
    }
  }, [utoken]);

  if (loading) {
    return <div className="p-8 m-8">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="p-8 m-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-2 md:p-6 m-2 md:m-8 flex flex-col">
      {/* Recommended Jobs Section */}
      <div className="m-2 md:m-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          Recommended Jobs For You
        </h2>
        <p className="text-gray-600">
          Based on your profile and skills, we've selected these opportunities
          for you.
        </p>

        {reinternships.length === 0 ? (
          <div className="mt-6 text-gray-500">
            No recommendations found. Update your profile to get better matches.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            {reinternships.map((job, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md p-2 flex justify-between h-auto min-h-[30vh] md:h-[30vh] mt-2 md:mt-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleJobClick(job.jobId)}
              >
                <div className="flex w-full">
                  <div className="m-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {job.companyLogo ? (
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm md:text-base">
                          {job.company.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 mt-2">
                    <p className="text-sm text-gray-500">
                      {job.applicationtype}
                    </p>
                    <h3 className="text-blue-500 font-semibold">
                      {job.jobrole}
                    </h3>
                    <p className="text-gray-700">{job.company}</p>
                    <div className="flex items-center space-x-3 text-gray-600 text-sm mt-2">
                      <MapPin className="text-black" size={16} />
                      <span>{job.location}</span>
                      <Users className="text-black" size={16} />
                      <span>{job.applicants?.length || 0} Applied</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="text-black" size={16} />
                      <span>
                        {Math.round(
                          (new Date(job.deadline) - new Date()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days left
                      </span>
                    </div>
                    {job.matchReason && (
                      <p
                        className={`text-xs mt-2 ${
                          job.matchScore >= 75
                            ? "text-green-600"
                            : job.matchScore >= 60
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {job.matchReason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Other Jobs */}
      <div className="m-2 md:m-8">
              <h2 className="text-xl md:text-2xl font-semibold">
                Explore Other Jobs
              </h2>
              <p className="text-gray-600">
                Discover more opportunities that might interest you based on your
                profile.
              </p>
      
              {allinternships.length === 0 ? (
                <div className="mt-6 text-gray-500">
                  No jobs found. Try updating your filters or profile to see better
                  matches.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                  {allinternships.slice(0, 3).map((job, index) => (
                    <div
                      key={index}
                      className="border rounded-lg shadow-md p-2 flex justify-between h-auto min-h-[30vh] md:h-[30vh] mt-2 md:mt-4 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleJobClick(job._id)}
                    >
                      <div className="flex w-full">
                        <div className="m-2">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {job.companyLogo ? (
                              <img
                                src={job.companyLogo}
                                alt={job.company}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-sm md:text-base">
                                {job.company?.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2 mt-2">
                          <p className="text-sm text-gray-500">
                            {job.applicationtype}
                          </p>
                          <h3 className="text-blue-500 font-semibold">
                            {job.jobrole}
                          </h3>
                          <p className="text-gray-700">{job.company}</p>
                          <div className="flex items-center space-x-3 text-gray-600 text-sm mt-2">
                            <MapPin className="text-black" size={16} />
                            <span>{job.location}</span>
                            <Users className="text-black" size={16} />
                            <span>{job.applicants?.length || 0} Applied</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="text-black" size={16} />
                            <span>
                              {Math.round(
                                (new Date(job.deadline) - new Date()) /
                                  (1000 * 60 * 60 * 24)
                              )}{" "}
                              days left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

    </div>
  );
};
export default Internship_R;
