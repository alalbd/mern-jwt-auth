import { useEffect, useState } from 'react';
import { UseAuth } from '../contexts/AuthContext'
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
    const [isLogged, setIsLogged] = useState(false);
    const { currentUser, setCurrentUser } = UseAuth();

    useEffect(() => {
        const checkLogin = async () => {
            const url = `http://127.0.0.1:5000/admin/dashboard/auth-check`;

            const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${currentUser?.token}`
                }
            });

            const result = await res.json();

            if (result.success) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        }

        if (currentUser?.token) checkLogin();


    }, [currentUser?.token]);

    return !isLogged ? <Outlet /> : <Navigate to={'/user/dashboard'} />;
}

export default PublicRoute;