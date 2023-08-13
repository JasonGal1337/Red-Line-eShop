import "../src/styles/index.css"
import React, { useState, useEffect } from "react"; // Import useEffect
import axios from "axios";

function Profile() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
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