import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {FaLinkedin,FaGithub,FaXTwitter,FaInstagram,FaSquarePhone} from "react-icons/fa6";
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
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (userData?.skills) {
      setSkills(
        Array.isArray(userData.skills) ? userData.skills : [userData.skills]
      );
    }
  }, [userData]);

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

      if (image) {
        formData.append('image', image);
      }

      const {data} = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token :utoken, 
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await userProfile();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(response.data.message);
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

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4"> 

          {isEdit
                ? <label htmlFor='image' >
                    <div className='inline-block relative cursor-pointer'>
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="" />
            }

          <div className="flex flex-col">
            <h1 className="text-xl font-bold">
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

      <div className="mb-4">
        <h2 className="font-bold">Your Resume</h2>
        <div className="flex items-center gap-4">
          <button className="bg-gray-200 px-4 py-1 rounded">resume</button>
          <span className="text-blue-500 cursor-pointer">edit</span>
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

      <div className="mb-4">
        <h2 className="font-bold">Social Links</h2>
        <div className="flex gap-4 text-2xl">
          <FaLinkedin className="cursor-pointer" />
          <FaGithub className="cursor-pointer" />
          <FaXTwitter className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
        </div>
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
  );
};

export default ProfilePage;
