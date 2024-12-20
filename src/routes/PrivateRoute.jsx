import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuth } from '../Auth/AuthProvider';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { user, loading } = useFirebaseAuth();

    useEffect(() => {
        if (!loading && !user) {
           
            navigate('/login', { replace: true });
        }
    }, [loading, user, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#A91D3A]"></div>
            </div>
        ); 
    }

    if (!user) {
        return null; 
    }

    return <>{children}</>; 
};

export default PrivateRoute;