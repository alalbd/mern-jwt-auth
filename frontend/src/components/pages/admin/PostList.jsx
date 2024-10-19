import { useEffect, useState } from "react";
import { UseAuth } from "../../contexts/AuthContext";
import { errorHandle } from "../../utilits/errorHandle";

const PostList = () => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [data, setData] = useState([]);
    const { currentUser } = UseAuth()


    useEffect(() => {
        const getPost = async () => {
            try {
                const url = 'http://127.0.0.1:5000/admin/posts';
                setError("");
                setLoading(true);
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': `Bearer ${currentUser?.token}`
                    }
                });
                const result = await res.json();

                const { success, data } = result;

                if (success === true && data.length > 0) {
                    setData(data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    errorHandle('Something went wrong!');
                }
            } catch (err) {
                setLoading(false);
                setError(err.message);
                errorHandle(error);
            }
        }

        getPost();
    }, [currentUser?.token, error]);

    console.log(data);


    return (
        <div className="main">
            <div className="pt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h1>ALL POSTS</h1>
                                </div>
                            </div>
                        </div>
                        {/* Post List */}
                        {data?.length > 0 &&
                            data?.map((val, index) => (
                                <div className="col-4" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h1>{val?.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {!loading && data?.length === 0 && <div className="card"><div className="card-body">No Post Found!</div></div>}
                        {loading && <div className="card"><div className="card-body"><h3>Loading...</h3></div></div>}
                        {/* Post List */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostList;