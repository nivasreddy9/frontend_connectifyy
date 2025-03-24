import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../beforelogin/Header";
import Base_url from "../utils/baseurl";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get(Base_url+"/profile/view", { withCredentials: true });
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) {
        
        return (
            
            <div className="bg-gradient-to-br from-gray-900 to-black text-white text-center text-lg h-screen flex items-center justify-center font-mono">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="animate-pulse"
                >
                    Loading user profile...
                </motion.p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-gradient-to-br from-gray-900 to-black text-red-500 text-center text-lg h-screen flex items-center justify-center font-mono">
                Error loading profile.
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full max-w-3xl bg-gray-800 bg-opacity-80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-gray-700"
            >
                <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-400 tracking-wide drop-shadow-md">
                    User Profile
                </h2>
                <div className="profile-details flex flex-col items-center gap-8">
                    <motion.img
                        src={user.photoUrl}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-xl hover:scale-105 transition-transform duration-500"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <div className="flex flex-col items-center gap-4 w-full">
                        <motion.p
                            className="text-2xl font-semibold tracking-wide hover:text-indigo-300 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <strong className="text-indigo-400">Name:</strong> {user.Name}
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <strong className="text-indigo-400">Email:</strong> {user.Email}
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <strong className="text-indigo-400">Phone:</strong> {user.Phone}
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <strong className="text-indigo-400">Gender:</strong> {user.Gender}
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <strong className="text-indigo-400">Age:</strong> {user.Age}
                        </motion.p>
                        <motion.p
                            className="text-lg text-center text-gray-300 hover:text-white transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <strong className="text-indigo-400">About:</strong> {user.About}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserProfile;