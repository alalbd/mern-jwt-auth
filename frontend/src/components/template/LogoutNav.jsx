import { Link, useNavigate } from 'react-router-dom';
import { successHandle } from '../utilits/errorHandle';
import { useState } from 'react';
import { UseAuth } from '../contexts/AuthContext';

const LogoutNav = ({ user }) => {
    const { currentUser, setCurrentUser } = UseAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser({
            ...currentUser,
            token: '',
            userLoggedIn: ''
        });
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        setTimeout(() => {
            setLoading(false);
        }, 1000);
        navigate('/login');
        successHandle('User Successfully Logout!');
    }

    return (
        <>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" to={'/user/dashboard'}>Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" to={'/user/all/post'}>All Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" to={'#'}>{user}</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" to={'/login'} onClick={handleLogout}>Logout</Link>
            </li>
        </>
    )
}

export default LogoutNav;