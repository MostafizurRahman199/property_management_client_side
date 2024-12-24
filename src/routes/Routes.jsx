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
                            <title>PM Dashboard - Home</title>
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
                            <title>PM Dashboard - Register</title>
                        </Helmet>
                        <Register />
                    </>
                ),
            },
           
          
            {
                path: "/login",
                element: (
                    <>
                        <Helmet>
                            <title>PM Dashboard - Login</title>
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
                            <title>PM Dashboard - Forgot Password</title>
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
                            <title>PM Dashboard - My Profile</title>
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
                            <title>PM Dashboard - Update Profile</title>
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
                    <title>PM Dashboard - Error</title>
                </Helmet>
                <ErrorPage />
            </>
        ),
    },
    
  
]);

export default router;