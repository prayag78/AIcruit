import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FaSquarePhone,FaFilePdf} from "react-icons/fa6";
import { MdEmail, MdEdit } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { utoken, setUtoken, userData, setUserData, userProfile, backendUrl } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); 
  const [resume, setResume] = useState(null); 
  const [resumePreview, setResumePreview] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [applications, setApplications] = useState([]);

  const applicationStatus = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/applications`, {
        headers: {
          token: utoken,
        },
      });
      setApplications(data.applications);
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    if (userData) {
      applicationStatus();
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.skills) {
      setSkills(
        Array.isArray(userData.skills) ? userData.skills : [userData.skills]
      );
    }
  }, [userData]);

  useEffect(() => {
    userProfile();
  }, []);

  const logout = () => {
    setUtoken("");
    localStorage.removeItem("utoken");
    navigate("/login");
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      // Append text fields
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append("about", userData.about || "");
      formData.append("experience", userData.experience || "");
      formData.append("institute", userData.institute || "");
      formData.append("education", userData.education || "");
      formData.append("skills", JSON.stringify(skills));

      // Append files if selected
      if (image) {
        formData.append("image", image);
      }
      if (resume) {
        formData.append("resume", resume);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token: utoken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await userProfile();
        setIsEdit(false);
        setImage(null);
        setResume(null);
        setResumePreview(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is PDF
      if (file.type === "application/pdf") {
        setResume(file);
        setResumePreview(file.name);
      } else {
        toast.error("Please upload a PDF file only");
      }
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg m-6">
      <div className="flex flex-col gap-4 mb-6 border-b p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : userData.image || assets.default_profile
                    }
                    alt="Profile"
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? "" : assets.upload_icon}
                    alt="Upload Icon"
                  />
                </div>
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                  }}
                  type="file"
                  id="image"
                  accept="image/*"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-36 rounded"
                src={userData.image || assets.default_profile}
                alt="Profile"
              />
            )}

            <div className="flex flex-col">
              <h1 className="text-xl font-bold ">
                {isEdit ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    placeholder="Your Name"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="border p-1 rounded"
                  />
                ) : (
                  userData.name || "Your Name"
                )}
              </h1>
              <div className="flex items-center gap-2">
                <FaUniversity />
                {isEdit ? (
                  <input
                    type="text"
                    name="institute"
                    value={userData.institute}
                    placeholder="Your Institute Name"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        institute: e.target.value,
                      }))
                    }
                    className="border p-1 rounded"
                  />
                ) : (
                  <p className="flex items-center gap-2 text-gray-600">
                    {userData.institute || "Your Institute"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <MdEdit
            className="text-xl cursor-pointer"
            onClick={() => setIsEdit(!isEdit)}
          />
        </div>

        <div className="mb-4">
          <p className="flex items-center gap-2 text-gray-700">
            <MdEmail /> {userData.email}
          </p>
          <div className="flex items-center gap-2">
            <FaSquarePhone />
            {isEdit ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                placeholder="Your Phone No"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border p-1 rounded"
              />
            ) : (
              <p className="flex items-center gap-2 text-gray-600">
                {userData.phone || "Phone No"}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold">About</h2>
          {isEdit ? (
            <textarea
              name="about"
              value={userData.about}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, about: e.target.value }))
              }
              className="border p-1 rounded"
            />
          ) : (
            <p className="flex items-center gap-2 text-gray-600">
              {userData.about || "Tell us about yourself!"}
            </p>
          )}
        </div>

        {/* Resume Section */}
        <div className="mb-4">
          <h2 className="font-bold">Your Resume</h2>
          <div className="flex items-center gap-4">
            {userData.resume ? (
              <div className="flex items-center gap-2">
                <FaFilePdf className="text-red-500 text-xl" />
                <a
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Resume
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No resume uploaded</p>
            )}

            {isEdit && (
              <label htmlFor="resume" className="cursor-pointer">
                <div className="bg-gray-200 px-4 py-1 rounded cursor-pointer">
                  {resumePreview ? "Change File" : "Choose File"}
                </div>
                <input
                  type="file"
                  id="resume"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  hidden
                />
              </label>
            )}
            {resumePreview && isEdit && (
              <p className="text-sm text-gray-500">{resumePreview}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-bold mr-3">Skills</h2>
            {isEdit ? (
              <div className="flex flex-col w-full gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    placeholder="Add new skill"
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="border p-1 rounded flex-grow"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-900 text-white px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-900 text-white px-4 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <h2 className="font-bold">Work Experience</h2>
          {isEdit ? (
            <textarea
              name="experience"
              value={userData.experience}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, experience: e.target.value }))
              }
              className="border p-1 rounded"
            />
          ) : (
            <p className="flex items-center gap-2 text-gray-600">
              {userData.experience ||
                "Narrate your professional journey and fast-track your way to new career heights!"}
            </p>
          )}
        </div>

        {isEdit && (
          <button
            onClick={updateProfile}
            className="bg-green-400 text-white px-4 py-2 rounded w-full mt-4"
          >
            Save Information
          </button>
        )}
        <button
          onClick={logout}
          className="bg-green-400 text-white px-4 py-2 rounded w-full mt-4"
        >
          Logout
        </button>
      </div>

      {/* Application Status */}
      <div className="flex flex-col h-[70vh] gap-4 p-4 ">
        <h2 className="text-xl font-bold text-gray-800">Applied Jobs</h2>

        {/* Desktop Table (shown on medium screens and up) */}
        <div className="hidden md:block overflow-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.date ? new Date(app.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {app.jobId?.description || "Not specified"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.recruiterId?.company || "Not specified"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.jobId?.location || "Remote"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.jobId?.salary || "Not specified"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm 
                      ${
                        app.status === "pending"
                          ? "bg-yellow-200 text-yellow-900 border border-yellow-400"
                          : app.status === "accepted"
                          ? "bg-green-200 text-green-900 border border-green-400"
                          : app.status === "rejected"
                          ? "bg-red-200 text-red-900 border border-red-400"
                          : app.status === "closed"
                          ? "bg-gray-200 text-gray-900 border border-gray-400"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {app.status
                        ? app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)
                        : "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (shown on small screens) */}
        <div className="md:hidden space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {app.jobId?.description || "Not specified"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {app.recruiterId?.company || "Not specified"}
                  </p>
                </div>

                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${
                    app.status === "pending"
                      ? "bg-yellow-200 text-yellow-900 border border-yellow-400"
                      : app.status === "accepted"
                      ? "bg-green-200 text-green-900 border border-green-400"
                      : app.status === "rejected"
                      ? "bg-red-200 text-red-900 border border-red-400"
                      : app.status === "closed"
                      ? "bg-gray-200 text-gray-900 border border-gray-400"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {app.status
                    ? app.status.charAt(0).toUpperCase() + app.status.slice(1)
                    : "Unknown"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm text-gray-900">
                    {app.date ? new Date(app.date).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm text-gray-900">
                    {app.jobId?.location || "Remote"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="text-sm text-gray-900">
                    {app.jobId?.salary || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;