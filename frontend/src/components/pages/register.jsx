import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successHandle, errorHandle } from "../utilits/errorHandle";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    //const [fullname, setName] = useState();
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Navigate
    const navigate = useNavigate();

    // Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        const userObject = { ...registerInfo };
        userObject[name] = value;
        setRegisterInfo(userObject);
    }



    // Handle Form Request
    const handleForm = async (e) => {
        e.preventDefault();

        const { name, email, password } = registerInfo;
        if (!name || !email || !password) {
            return errorHandle('name, email and password are required!');
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/user/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(registerInfo)
            });
            const result = await response.json();

            // error handle
            const { errors } = result;
            if (errors) {
                Object.keys(errors).forEach((value) => {
                    errorHandle(errors[value].msg);
                });
            } else {
                const { message, success } = result;
                if (success === true) {
                    successHandle(message);
                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);
                } else {
                    errorHandle(message);
                }
            }
        } catch (error) {
            console.log(error);
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
                                    <h2 className="text-white text-uppercase mb-0 py-1">User Regisation</h2>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6 text-center">
                                            <div className="userInfo d-flex bg-dark h-100 text-white align-items-center justify-content-center">
                                                ~ <br />
                                                USER REGISTER
                                                <br />
                                                ~
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-0">
                                                <form onSubmit={handleForm}>
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label text-muted fs-6">Full Name</label>
                                                        <input type="text" name="name" className="form-control py-2" placeholder="Full name" value={registerInfo.name} onChange={handleChange} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="email" className="form-label text-muted fs-6">Email Address</label>
                                                        <input type="email" name="email" className="form-control py-2" placeholder="example@email.com" value={registerInfo.email} onChange={handleChange} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="password" className="form-label text-muted fs-6">Password</label>
                                                        <input type="password" name="password" className="form-control py-2" placeholder="Enter password" value={registerInfo.password} onChange={handleChange} />
                                                    </div>

                                                    <button type="submit" className="btn btn-success py-2 px-3">Register</button>
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

export default Register;