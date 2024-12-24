import React, { useState, useEffect } from 'react';
import { useFirebaseAuth } from '../../Auth/AuthProvider';
import { FaClock } from 'react-icons/fa';

const Welcome = () => {
    const { user } = useFirebaseAuth();
    const image = user?.photoURL || 'https://static.vecteezy.com/system/resources/previews/014/194/222/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg'; // Default image if photoURL is not available
    const name = user?.displayName || 'User';
    const email = user?.email || 'No email available';

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header className="my-8 md:my-1 text-white shadow-md py-4 md:px-6 rounded-lg flex flex-wrap items-center justify-center md:justify-between">
            {/* User Info */}
            <div className="flex items-center gap-4">
                <img
                    src={image}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border-2 border-[#9c27b0] object-cover"
                />
                <div>
                    <h1 className="text-2xl font-bold text-[#9c27b0]">Welcome, {name}!</h1>
                    <p className="text-sm text-[#9c27b0]">{email.split("@")[0]}</p>
                </div>
            </div>

            {/* Current Time */}
            <div className="flex items-center gap-2 text-[#9c27b0]">
                <FaClock className="text-[#9c27b0] text-lg" />
                <span className="text-lg font-medium">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
            </div>
        </header>
    );
};

export default Welcome;
