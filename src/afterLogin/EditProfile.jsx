import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { motion } from "framer-motion";
import Base_url from "../utils/baseurl";
import Header from "../beforelogin/Header";
import { Save, User, Phone, Calendar, Lock, Info, Image, X, Check } from "lucide-react";

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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        try {
            setError("");
            setSuccess("");
            setIsLoading(true);

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
                Base_url+"/profile/edit",
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
            
            const userData = res.data.data || res.data;
            dispatch(addUser(userData));
            
            setSuccess("Profile updated successfully!");
            setIsLoading(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(
                err.response?.data?.error || 
                err.response?.data || 
                err.message || 
                "Failed to update profile. Please try again."
            );
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <Header />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-grow flex justify-center items-center p-6 pt-24 md:pt-16"
            >
                <div className="flex flex-col md:flex-row gap-10 bg-white p-6 md:p-10 rounded-2xl shadow-2xl max-w-5xl w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="w-full md:w-1/2"
                    >
                        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center">
                            <User className="mr-2 text-blue-600" size={28} />
                            Edit Profile
                        </h1>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <User className="mr-2 text-blue-500" size={16} />
                                Name:
                            </label>
                            <input
                                type="text"
                                value={name}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <Phone className="mr-2 text-green-500" size={16} />
                                Phone:
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                placeholder="Enter your phone number"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <Calendar className="mr-2 text-yellow-500" size={16} />
                                Age:
                            </label>
                            <input
                                type="number"
                                value={age}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
                                placeholder="Enter your age"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <Lock className="mr-2 text-red-500" size={16} />
                                Password:
                            </label>
                            <input
                                type="password"
                                value={password}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                placeholder="Enter new password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                Gender:
                            </label>
                            <select
                                value={gender}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <Info className="mr-2 text-indigo-500" size={16} />
                                About:
                            </label>
                            <textarea
                                value={about}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                placeholder="Tell us about yourself"
                                rows="4"
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                                <Image className="mr-2 text-teal-500" size={16} />
                                Profile Photo URL:
                            </label>
                            <input
                                type="url"
                                value={photoUrl}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                placeholder="Enter profile picture URL"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                            {photoUrl && (
                                <div className="mt-2 p-2 border rounded-lg">
                                    <img 
                                        src={photoUrl} 
                                        alt="Profile preview" 
                                        className="h-24 w-24 object-cover rounded-full mx-auto border-2 border-teal-500"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=No+Image'}
                                    />
                                </div>
                            )}
                        </div>

                        {success && (
                            <div className="flex items-center justify-center text-green-600 mb-4 p-2 bg-green-50 rounded-lg border border-green-200">
                                <Check className="mr-2" size={16} />
                                <p>{success}</p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="flex items-center justify-center text-red-600 mb-4 p-2 bg-red-50 rounded-lg border border-red-200">
                                <X className="mr-2" size={16} />
                                <p>{error}</p>
                            </div>
                        )}

                        <button
                            className={`w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            onClick={saveProfile}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2" size={20} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default EditProfile;