import LogoutNav from "./LogoutNav";
import LoginNav from "./LoginNav";
import { Link } from "react-router-dom";
import { UseAuth } from '../contexts/AuthContext';


const Navbar = () => {
    const { currentUser, userLoggedIn } = UseAuth();

    let userData;
    if (!currentUser.token) {
        userData = <LoginNav />
    } else {
        userData = <LogoutNav user={currentUser?.userLoggedIn} />
    }


    return (
        <nav className="navbar navbar-expand-sm navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>MERN~AUTH</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        {userData}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;