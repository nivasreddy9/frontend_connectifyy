import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    // Local state as backup if Redux isn't working
    const [localConnections, setLocalConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const connections = useSelector((state) => state.connections);
    const dispatch = useDispatch();

    const fetchConnection = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://connectify-backend-app.onrender.com/user/connections", {
                withCredentials: true,
            });
            console.log("API Response:", res.data.data);
            
            // Update Redux
            dispatch(addConnections(res.data.data));
            
            // Also update local state as backup
            setLocalConnections(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching connections:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConnection();
    }, []);

    // Use either Redux connections or local connections as a fallback
    const displayConnections = connections && connections.length > 0 ? connections : localConnections;
    
    console.log("Redux connections:", connections);
    console.log("Display connections:", displayConnections);

    if (loading) {
        return <div className="text-center my-8">Loading connections...</div>;
    }

    if (!displayConnections || displayConnections.length === 0) {
        return <div className="text-center my-8">No connections found.</div>;
    }

    return (
        <div className="text-center my-8">
            <h1 className="text-3xl font-bold mb-6">Connections</h1>
            <div className="flex flex-wrap justify-center">
                {displayConnections.map((connection) => {
                    // Check if connection has either touserid or fromuserid
                    // This handles both cases: when you sent the request or when you received it
                    const connectionUser =  connection.fromuserid;
                    
                    if (!connectionUser) {
                        console.error("Connection missing user data:", connection);
                        return null;
                    }

                    const { Name, Email, photoUrl, Age, Gender, About } = connectionUser;

                    return (
                        <div key={connection._id} className="m-4 p-6 bg-base-200 rounded-lg w-64">
                            <div className="flex justify-center mb-4">
                                <img
                                    src={photoUrl}
                                    alt={Name}
                                    className="w-24 h-24 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/100";
                                    }}
                                />
                            </div>
                            <h2 className="text-xl font-bold mb-2">{Name}</h2>
                            <p className="text-gray-600">{Email}</p>
                            {Age && <p className="text-gray-600">Age: {Age}</p>}
                            {Gender && <p className="text-gray-600">Gender: {Gender}</p>}
                            {About && <p className="text-gray-600">About: {About}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;