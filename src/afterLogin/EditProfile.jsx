import { useSelector } from "react-redux";
import { useState } from "react";
import UserCard from "./userCard";

const EditProfile = () => {
  const user = useSelector((state) => state.user); // Access user from Redux

  const [name, setName] = useState(user.Name);
  const [phone, setPhone] = useState(user.Phone);
  const [age, setAge] = useState(user.Age);
  const [password, setPassword] = useState(user.Password);
  const [gender, setGender] = useState(user.Gender);
  const [about, setAbout] = useState(user.About);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-5">Edit Profile</h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
          <input
            type="text"
            value={name}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Phone:</label>
          <input
            type="tel"
            value={phone}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Age:</label>
          <input
            type="number"
            value={age}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter your age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Password:</label>
          <input
            type="password"
            value={password}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Gender:</label>
          <select
            value={gender}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">About:</label>
          <textarea
            value={about}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Tell us about yourself"
            rows="3"
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Profile Photo URL */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">Profile Photo URL:</label>
          <input
            type="url"
            value={photoUrl}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter profile picture URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Save Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
          onClick={() => console.log("Save clicked")}
        >
          Save Changes
        </button>
      </div>
    </div>
    {/* <UserCard user={{Name, Email, Phone, photoUrl, Age, Gender, About}}/> */}
    <UserCard user={{ name, email: user.Email, phone, photoUrl, age, gender, about }} />
    

    </>

  );
};

export default EditProfile;
