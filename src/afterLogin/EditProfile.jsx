import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { motion } from "framer-motion";

const EditProfile = () => {
    const user = useSelector((state) => state.user);

    const [name, setName] = useState(user.Name);
    const [phone, setPhone] = useState(user.Phone);
    const [age, setAge] = useState(user.Age);
    const [password, setPassword] = useState(user.Password);
    const [gender, setGender] = useState(user.Gender);
    const [about, setAbout] = useState(user.About);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            setError("");
            setSuccess("");

            console.log("Sending update request with:", {
                id: user._id,
                Name: name,
                Phone: phone,
                Age: age,
                Gender: gender,
                About: about,
                Password: password,
                photoUrl
            });

            const res = await axios.post(
                "https://connectify-backend-app.onrender.com/profile/edit",
                {
                    id: user._id,
                    Name: name,
                    Phone: phone,
                    Age: age,
                    Gender: gender,
                    About: about,
                    Password: password,
                    photoUrl
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response received:", res.data);
            
            // Check if the response has data in the expected structure
            const userData = res.data.data || res.data;
            dispatch(addUser(userData));
            
            setSuccess("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(
                err.response?.data?.error || 
                err.response?.data || 
                err.message || 
                "Failed to update profile. Please try again."
            );
        }
    };;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6"
        >
            <div className="flex flex-col md:flex-row gap-10 bg-white p-10 rounded-2xl shadow-2xl max-w-5xl w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-1/2"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Edit Profile
                    </h1>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            value={name}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your phone number"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Age:
                        </label>
                        <input
                            type="number"
                            value={age}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter new password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Gender:
                        </label>
                        <select
                            value={gender}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="">Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            About:
                        </label>
                        <textarea
                            value={about}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Tell us about yourself"
                            rows="4"
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Profile Photo URL:
                        </label>
                        <input
                            type="url"
                            value={photoUrl}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter profile picture URL"
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                    </div>

                    {success && <p className="text-green-600 text-sm text-center mb-4">{success}</p>}
                    {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
                        onClick={saveProfile}
                    >
                        Save Changes
                    </button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-1/2 flex justify-center items-center"
                >
                    <div className="relative">
                        <img
                            src={user.photoUrl}
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default EditProfile;