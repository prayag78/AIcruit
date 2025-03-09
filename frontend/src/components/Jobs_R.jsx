import React from "react";
import { jobsData } from "../assets/assets";
import { assets } from "../assets/assets";
import { Lock, Unlock, MapPin, Users, Calendar } from "lucide-react";

const Jobs_R = () => {
  return (
    <div className="p-8 m-8 flex flex-col">
      {/* Best Jobs Section */}
      
      <div className="m-10">
        <h2 className="text-2xl font-semibold">Best Jobs For You</h2>
        <p className="text-gray-600">
          We've scanned millions of jobs to find your best matches, saving you
          hours of searching.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg shadow-md p-2 flex justify-between h-[25vh] mt-4"
            >
              <div className="flex">
                <div className="m-2 ">
                  <img src={assets.instagram_icon} width="50" />
                </div>
                <div className="space-y-2 mt-2">
                  <p className="text-sm text-gray-500">{job.jobType}</p>
                  <h3 className="text-blue-500 font-semibold">{job.title}</h3>
                  <p className="text-gray-700">{job.company}</p>
                  <div className="flex items-center space-x-3 text-gray-600 text-sm mt-2">
                    <MapPin className="text-black" size={16} />
                    <span>{job.location}</span>
                    <Users className="text-black" size={16} />
                    <span>{job.applicants} Applied</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm mt-2">
                    <Calendar className="text-black" size={16} />
                    <span>{job.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Other Jobs */}
      <div className="m-10">
        <h2 className="text-2xl font-semibold">Explore Other Jobs</h2>
        <p className="text-gray-600">
        Discover more opportunities that might interest you based on your profile.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg shadow-md p-2 flex justify-between h-[25vh] mt-4"
            >
              <div className="flex">
                <div className="m-2 ">
                  <img src={assets.instagram_icon} width="50" />
                </div>
                <div className="space-y-2 mt-2">
                  <p className="text-sm text-gray-500">{job.jobType}</p>
                  <h3 className="text-blue-500 font-semibold">{job.title}</h3>
                  <p className="text-gray-700">{job.company}</p>
                  <div className="flex items-center space-x-3 text-gray-600 text-sm mt-2">
                    <MapPin className="text-black" size={16} />
                    <span>{job.location}</span>
                    <Users className="text-black" size={16} />
                    <span>{job.applicants} Applied</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm mt-2">
                    <Calendar className="text-black" size={16} />
                    <span>{job.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Jobs_R;
