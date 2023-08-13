import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/styles/index.css"

function Profile() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);

            axios
                .post(
                    "http://localhost:4000/user/getUserInfo",
                    { token: storedToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then(({ data }) => {
                    console.log(data);
                    const userData = data.userData;
                    setName(userData.name);
                    setSurname(userData.surname);
                    setAddress(userData.address);
                    setZip(userData.zip);
                })
                .catch((error) => {
                    console.error("Error fetching user info:", error);
                });
        }
    }, []);

    function editInfo() {
        axios
            .post(
                "http://localhost:4000/user/editInfo",
                { name, surname, address, zip, token },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.error("Error editing info:", error);
            });
    }

    return (
        <div className="signup-container">
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <input type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="number" placeholder="zip" value={zip} onChange={(e) => setZip(e.target.value)} />
            <button onClick={editInfo}>Update Profile</button>
        </div>
    );
}

export default Profile;