import { useEffect, useState } from "react";

const Dashboard = () => {
    const [username, setUsername] = useState();

    useEffect(() => {
        const name = localStorage.getItem('loggedInUser');
        setUsername(name);
    }, []);

    return (
        <div className="main">
            <div className="pt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1>Dashboard</h1>
                                    {username}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;