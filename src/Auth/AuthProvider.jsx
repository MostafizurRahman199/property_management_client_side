import React, { createContext, useContext, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider,
    updateProfile,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';

import auth from '../firebase/firebase.config';
import { toast } from 'react-toastify';





// ___________________________create context

const myContext = createContext();

export const useFirebaseAuth = () => {
    return useContext(myContext);
}





const AuthProvider = ({children}) => {


    // ___________________________state
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    





    // 1. ___________________________Register with email/password

    const registerUser = async (email, password, name, photoURL) => {
        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(auth, email, password);
          
    
            // Update the profile
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL,
            });
    
            return result.user;
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    





    // ___________________________Google Sign in

    const googleSignIn = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            // Update profile to ensure all information is properly set
            await updateProfile(auth.currentUser, {
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            });
            
            setUser(auth.currentUser);
            
            return auth.currentUser;
        } catch (error) {
            // toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };




    // ___________________________Login with email/password

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            
            await updateProfile(auth.currentUser, {
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
            });
            
          
            setUser(auth.currentUser);
            return auth.currentUser;
        } catch (error) {
           
            throw error;
        } finally {
            setLoading(false);
        }
    };



    const updateUserProfile = async (displayName, photoURL ) => {
       
       try {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        toast.success('Profile updated successfully');
       } catch (error) {
        // throw error;
        toast.error('Failed to update profile');
       } 
    };



    // ___________________________Add forget password function

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };






    // ___________________________Add useEffect to monitor auth state

    React.useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
         
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);






    // ___________________________Add logout function

    const logOut = async () => {
        setLoading(true);
        try {
            await auth.signOut();
            setUser(null);
            toast.success('Successfully logged out!');
        } catch (error) {
            toast.error('Failed to log out');
            throw error;
        } finally {
            setLoading(false);
        }
    };







    // ___________________________return authInfo

    const authInfo = {
        user,
        loading,
        registerUser,
        googleSignIn,
        loginUser,
        logOut,  
        resetPassword,  
        setUser,
        updateUserProfile
    }

    return (
        <myContext.Provider value={authInfo}>
            {children}
        </myContext.Provider>
    )
}

export default AuthProvider