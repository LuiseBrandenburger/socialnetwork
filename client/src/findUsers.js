import { useEffect, useState } from "react";

export default function FindUsers() {
    const [search, setSearch] = useState();
    const [users, setUsers] = useState([]);
    // const [error, setError] = useState(false);

    useEffect(() => {
        console.log("I use Effect");
        let abort = false;
        fetch(`/find-user/${search}`)
            .then((data) => data.json())
            .then((data) => {
                console.log("data find users", data.data);
                if (!abort) {
                    setUsers(data.data);
                }
                console.log("users after if condition:", users);
            })
            .catch((err) => {
                // setError(true);
                console.log("error in find users: ", err);
            });
        return () => {
            abort = true;
        };
    }, [search]);

    return (
        <div>
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
}

// key={user.id}
// onClick={() => toggleUploader()}
            // {
            //     error ? <p>no results found</p> : "";
            // }
