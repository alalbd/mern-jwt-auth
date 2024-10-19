import React, { useContext, useEffect, useState } from "react";

// create context
const AuthContext = React.createContext();

// use Auth context
export function UseAuth() {
    return useContext(AuthContext);
}

// Auth Provider
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({
        token: '',
        userLoggedIn: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('loggedInUser');

        if (token) {
            setCurrentUser({
                ...currentUser,
                token: token,
                userLoggedIn: userData
            });
        }
        //eslint-disable-next-line
    }, []);

    // Auth Provider Value Object
    const values = {
        currentUser,
        setCurrentUser
    }

    return (<AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>);
}