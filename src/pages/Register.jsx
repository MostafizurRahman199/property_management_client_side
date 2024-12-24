import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Aos from 'aos';
import { useEffect } from 'react';

import Swal from 'sweetalert2';
import registerAnimation from "../../public/register.json"
import Lottie from 'lottie-react';
import { useFirebaseAuth } from '../Auth/AuthProvider';


const Register = () => {

    const navigate = useNavigate();
    const { registerUser, googleSignIn, setUser } = useFirebaseAuth();
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 1000 });
      }, []);


      
  const style1 = {
    height: 400,
  };
  


  
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });

    const validatePassword = (password) => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain an uppercase letter');
            return false;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError('Password must contain a lowercase letter');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePassword(formData.password)) {
            return;
        }

        try {
            const registeredUser = await registerUser(formData.email, formData.password, formData.name, formData.photoURL);
            setUser(registeredUser);
            if (registeredUser) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Register Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                // await registeredUser.reload();
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message, 'error');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success('Successfully signed in with Google!', 'success');
            navigate('/');
        } catch (error) {
            toast.error(error.message, 'error');
        }
    };

    return (
        <div className="md:w-10/12 mx-auto flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex flex-col md:flex md:flex-row justify-center items-center gap-4 sm:shadow-2xl  space-y-8  p-8  rounded-2xl bg-gray-100" data-aos="fade-up">
              <div className='flex-1 ' >
              <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-2">
                        <div>
                            <input
                                type="text"
                                required
                                className="appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-3xl focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-3xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <input
                                type="url"
                                required
                                className="appearance-none  rounded-3xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                                placeholder="Photo URL"
                                onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none rounded-3xl relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black focus:border-black sm:text-sm pr-10"
                                placeholder="Password"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEye className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {passwordError && (
                        <p className="text-red-500 text-sm">{passwordError}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center  border border-transparent text-sm  bg-black hover:bg-[#9c1631]focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black px-8 py-3 rounded-3xl text-white font-bold transition-transform hover:scale-105 shadow-2xl">
                            Register
                        </button>
                    </div>
                </form>




                <div className="mt-1 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="mt-1">
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>
                </div>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-black hover:text-white">
                        Login here
                    </Link>
                </p>
              </div>


              <div className='flex-1 flex justify-center items-center'>
              <Lottie
                animationData={registerAnimation}
                style={style1}
                />
              </div>



            </div>
        </div>
    );
};

export default Register;