import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Register from "../pages/Register";
import Login from "../pages/Login";

import ForgetPassword from "../pages/ForgetPassword";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import Profile from "../pages/Profile";

import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([    
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Home</title>
                        </Helmet>
                        <Home />
                    </>
                ),
            },
            
           
            {
                path: "/register",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Register</title>
                        </Helmet>
                        <Register />
                    </>
                ),
            },
           
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - All Reviews</title>
                        </Helmet>
                      
                    </>
                ),
               
            },
            {
                path: "",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Review Details</title>
                        </Helmet>
                        
                    </>
                ),
               
            },
           
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Add Review</title>
                        </Helmet>
                        <PrivateRoute>
                           {/* write a component  */}
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - My Review</title>
                        </Helmet>
                        <PrivateRoute>
                           {/* write a component  */}
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Game WatchList</title>
                        </Helmet>
                        <PrivateRoute>
                            {/* write a component  */}
                        </PrivateRoute>
                    </>
                ),
            },
           
         
            {
                path: "/login",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Login</title>
                        </Helmet>
                        <Login />
                    </>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Forgot Password</title>
                        </Helmet>
                        <ForgetPassword />
                    </>
                ),
            },
            {
                path: "/my-profile",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - My Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: "/update-profile",
                element: (
                    <>
                        <Helmet>
                            <title>Job Seeker - Update Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <UpdateProfile />
                        </PrivateRoute>
                    </>
                ),
            },
           
           
        ],
    },
    {
        path: "*",
        element: (
            <>
                <Helmet>
                    <title>Job Seeker - Error</title>
                </Helmet>
                <ErrorPage />
            </>
        ),
    },
    
  
]);

export default router;