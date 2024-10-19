import { Link } from 'react-router-dom';

const LoginNav = () => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" to={'/login'}>Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" to={'/register'}>Register</Link>
            </li>
        </>
    )
}

export default LoginNav;