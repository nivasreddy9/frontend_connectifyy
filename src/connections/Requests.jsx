import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import axios from 'axios';
import { User } from 'lucide-react';

const Requests = () => {
    const dispatch = useDispatch();
    // Changed from store.requests to store.request to match your store configuration
    const requests = useSelector((store) => store.request);
    const [loading, setLoading] = useState(true);

    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(
                `https://connectify-backend-app.onrender.com/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(requestId));
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const fetchRequest = async () => {
        setLoading(true);
        try {
            const res = await axios.get("https://connectify-backend-app.onrender.com/user/requests/received", {
                withCredentials: true,
            });

            console.log("API Response:", res.data);
            
            // Dispatch the data
            dispatch(addRequests(res.data.data));
            setLoading(false);
        } catch (err) {
            console.log("API Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    useEffect(() => {
        console.log("Updated Redux Requests:", requests);
    }, [requests]);

    return (
        <div className="min-h-screen bg-gray-100 pt-24 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Connection Requests</h1>
                    
                    {loading ? (
                        <p className="text-center">Loading requests...</p>
                    ) : requests && requests.length > 0 ? (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div 
                                    key={request._id} 
                                    className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md bg-white"
                                >
                                    <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                                        <div className="flex-shrink-0">
                                            {request.fromuserid?.photoUrl ? (
                                                <img 
                                                    src={request.fromuserid.photoUrl} 
                                                    alt={request.fromuserid?.Name || "User"} 
                                                    className="h-16 w-16 rounded-full object-cover border-2 border-blue-400"
                                                    onError={(e) => {
                                                        e.target.onerror = null; 
                                                        e.target.style.display = "none";
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                                    {request.fromuserid?.Name ? request.fromuserid.Name[0].toUpperCase() : "U"}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-lg font-semibold text-gray-800">{request.fromuserid?.Name || "Unknown User"}</h3>
                                            <p className="text-sm text-gray-500">{request.fromuserid?.Email || ""}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Request sent {new Date(request.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        
                                        <div className="flex gap-2 mt-3 sm:mt-0">
                                            <button 
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium" 
                                                onClick={() => reviewRequest("accepted", request._id)}>
                                                Accept
                                            </button>
                                            <button 
                                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium" 
                                                onClick={() => reviewRequest("rejected", request._id)}>
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                                <User className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">No requests</h3>
                            <p className="mt-1 text-sm text-gray-500">You don't have any connection requests at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Requests;