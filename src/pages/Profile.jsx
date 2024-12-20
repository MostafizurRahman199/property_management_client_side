import React, { useEffect } from 'react';
import { useFirebaseAuth } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import Lottie from 'lottie-react';
import fireAnimation from "../../public/fire.json";

const getProfileImage = (user) => {
  return user?.photoURL || 
         user?.providerData?.[0]?.photoURL || 
         'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
};

const Profile = () => {
    const { user } = useFirebaseAuth();
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate('/update-profile');
    };

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    
  const style = {
    height: 250,
  };
  

    return (
    

        <div className={`min-h-screen  ` } >
           
       
            <div className="md:pt-2 md:px-4 min-h-screen w-full flex flex-col justify-center items-center gap-2 ">
              
              <div className='bg-[#151515] w-full sm:w-8/12 shadow-2xl shadow-[#A91D3A] sm:rounded-2xl' data-aos='zoom-in'>
              <div className='flex flex-col items-center justify-center gap-2 px-4   md:px-6 py-4' >
                <h1 className="font_header text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center ">Welcome To Your Profile<br /> 
                </h1>
                <p className='font_header text-white text-center'>Manage your profile and updates effortlessly</p>
               </div>

                <div className="relative w-full sm:w-8/12 lg:w-5/12 mx-auto  rounded-2xl p-4 md:p-8 mt-4 " data-aos="zoom-in">
                    <div className="flex flex-col items-center">

                        <div className='absolute -top-24'>
                        <Lottie
                            animationData={fireAnimation}
                            style={style}
                            />
                          </div>


                        <div className="w-fit rounded-full p-1 bg-gradient-to-r from-[#151515] to-[#A91D3A]" data-aos="zoom-in">
                            <img
                                src={getProfileImage(user)}
                                alt="Profile"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
                                onError={(e) => {
                                    e.target.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
                                    e.target.onerror = null;
                                }}
                            />
                        </div>

                        <h1 className="text-2xl font-bold mb-2 text-center text-[#A91D3A] my-8">{user?.displayName}</h1>
                        <p className="text-gray-600 mb-4">{user?.email}</p>

                        <button
                            onClick={handleUpdateClick}
                            className="bg-[#A91D3A] hover:bg-[#9c1631] px-8 py-3 rounded-3xl text-white font-semibold transition-transform hover:scale-105 shadow-2xl"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
              </div>
            </div>
        </div>
    );
};

export default Profile; 