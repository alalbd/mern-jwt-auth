import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { successHandle, errorHandle } from "../utilits/errorHandle";
import { UseAuth } from "../contexts/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const { currentUser, setCurrentUser } = UseAuth();

    // Navigate
    const navigate = useNavigate();

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        const userObject = { ...loginInfo };
        userObject[name] = value;
        setLoginInfo(userObject);
    }

    // Handle Form Request
    const HandleForm = async (e) => {
        e.preventDefault();

        const { email, password } = loginInfo;
        if (!email || !password) {
            return errorHandle('Email and password are required!');
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/user/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();

            // error handle
            const { errors } = result;
            if (errors) {
                Object.keys(errors).forEach((value) => {
                    errorHandle(errors[value].msg);
                });
            } else {
                const { message, success, token, name } = result;
                if (success === true) {
                    successHandle(message);

                    // Push current data on auth context
                    setCurrentUser({
                        ...currentUser,
                        token,
                        userLoggedIn: name
                    });

                    localStorage.setItem('token', token);
                    localStorage.setItem('loggedInUser', name);
                    setTimeout(() => {
                        navigate('/user/dashboard');
                    }, 1000);
                } else {
                    errorHandle(message);
                }
            }
        } catch (err) {
            errorHandle(err.message);
        }
    }

    return (
        <div className="main">
            <div className="pt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header bg-dark">
                                    <h2 className="text-white text-uppercase mb-0 py-1">User LOGIN</h2>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6 text-center">
                                            <div className="userInfo d-flex bg-dark h-100 text-white align-items-center justify-content-center">
                                                ~ <br />
                                                USER LOGIN
                                                <br />
                                                ~
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-0">
                                                <form onSubmit={HandleForm}>
                                                    <div className="mb-3">
                                                        <label htmlFor="email" className="form-label text-muted fs-6">Email Address</label>
                                                        <input type="email" name="email" className="form-control py-2" placeholder="example@email.com" value={loginInfo.email} onChange={handleChange} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="password" className="form-label text-muted fs-6">Password</label>
                                                        <input type="password" name="password" className="form-control py-2" placeholder="Enter password" value={loginInfo.password} onChange={handleChange} />
                                                    </div>

                                                    <button type="submit" className="btn btn-success py-2 px-3">Login</button>
                                                    <p className="py-3">Don't have a account? <Link to="/register">Register</Link></p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;