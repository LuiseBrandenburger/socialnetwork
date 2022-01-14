import { useEffect, useState } from "react";

export default function FindUsers() {
    const [search, setSearch] = useState();
    const [users, setUsers] = useState([]);
    const [recentlyAddedUsers, setRecentlyAddedUsers] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("I use Effect when mounted");
        fetch("/find-recently-added-users")
            .then((data) => data.json())
            .then((data) => {
                console.log("data find users", data.data);
                setRecentlyAddedUsers(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        let abort = false;
        // if (search.length && users.length === 0) {
        //     setError(true);
        // }
        if (users.length === 0) {
            setError(true);
        }
        fetch(`/find-user/${search}`)
            .then((data) => data.json())
            .then((data) => {
                if (!abort) {
                    setUsers(data.data);
                    console.log("users data after added: ", users);
                    if (users.length > 0) {
                        setError(false);
                    }
                }
            })
            .catch((err) => {
                // setError(true);
                console.log("error in find users: ", err);
            });
        return () => {
            abort = true;
        };
    }, [search]);

    if (search) {
        return (
            <div className="search-container">
                <h2>Search for Users:</h2>
                <p>{error ? "no results found" : ""}</p>
                <input onChange={(e) => setSearch(e.target.value)} />
                {users.map((user) => (
                    <div className="user-container" key={user.id}>
                        <h2 key={user.id}>{user.first}</h2>
                        <img
                            src={user.url}
                            alt={`social network profile picture of ${user.first} ${user.last}`}
                        />
                        <p>{user.bio}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="search-container">
                <h2>Recently Added Users:</h2>
                {recentlyAddedUsers.map((user) => (
                    <div className="user-container" key={user.id}>
                        <h2 key={user.id}>{user.first}</h2>
                        <img
                            src={user.url}
                            alt={`social network profile picture of ${user.first} ${user.last}`}
                        />
                        <p>{user.bio}</p>
                    </div>
                ))}
                <input onChange={(e) => setSearch(e.target.value)} />
            </div>
        );
    }
}

// key={user.id}
// onClick={() => toggleUploader()}
// {
//     error ? <p>no results found</p> : "";
// }
