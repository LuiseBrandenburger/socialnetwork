import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FindUsers() {
    const [search, setSearch] = useState();
    const [users, setUsers] = useState([]);
    const [recentlyAddedUsers, setRecentlyAddedUsers] = useState([]);
    const [error, setError] = useState(false);
    const [showRecentlyAddedUsers, setShowRecentlyAddedUsers] = useState(true);

    useEffect(() => {
        fetch("/find-recently-added-users")
            .then((data) => data.json())
            .then((data) => {
                setRecentlyAddedUsers(data.data);
            })
            .catch((err) => {
                console.log("error in recently added useres GET Route", err);
            });
    }, []);

    useEffect(() => {
        let abort = false;

        // console.log("users", users);
        // if (users.length === 0) {
        //     setShowRecentlyAddedUsers(true);
        // }

        fetch(`/find-user/${search}`)
            .then((data) => data.json())
            .then((data) => {

                if (!abort) {
                    setUsers(data.data);
                }
                if (search.length > 0 && users.length === 0) {
                    setError(true);
                } else if (users.length > 0) {
                    setShowRecentlyAddedUsers(false);
                    setError(false);
                }
            })
            .catch((err) => {
                console.log("error in find users: ", err);
            });

        return () => {
            abort = true;
            if (users.length > 0) {
                setShowRecentlyAddedUsers(false);
            }
        };
    }, [search]);

    // if (search) {
    return (
        <div className="search-container">
            {search ? (
                <h2>Search for Users:</h2>
            ) : (
                <h2>Recently Added Users:</h2>
            )}

            {/* <p>{error ? "no results found" : ""}</p> */}
            <input
                value={search}
                placeholder="find users"
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="user-display-container">
                {users &&
                    users.map((user) => (
                        <Link to={`/show-user/${user.id}`} key={user.id}>
                            <div className="user-box" key={user.id}>
                                <h2 id="user-name" key={user.id}>
                                    {user.first}
                                </h2>
                                <img
                                    src={user.url || "/default.png"}
                                    alt={`social network profile picture of ${user.first} ${user.last}`}
                                />
                            </div>
                        </Link>
                    ))}
                {showRecentlyAddedUsers &&
                    recentlyAddedUsers.map((user) => (
                        <Link to={`/show-user/${user.id}`} key={user.id}>
                            <div className="user-box" key={user.id}>
                                <h2 id="user-name" key={user.id}>
                                    {user.first}
                                </h2>
                                <img
                                    src={user.url || "/default.png"}
                                    alt={`social network profile picture of ${user.first} ${user.last}`}
                                />
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
