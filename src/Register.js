import React, { useState, useEffect } from "react";


export default function Register({ handleChange, handleData }) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [newdata, setNewdata] = useState(null);
    
  const handleSubmit = (e) => {
    handleChange(e);
  };

 const handleRegister = async (e) => {
    e.preventDefault();

    try {
        const data = {
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name
        }

        const newdata = {
            "page": 0,
            "data": data
          }
        
        setNewdata(newdata)
      const response = await fetch("http://localhost:8700/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        setMessage("Register successful!");
        setError("");
         console.log(result);
      } else {
        setLoggedIn(false);
        setMessage("");
        setError(result.message || "Register failed. Please try again.");
      }
    } catch (err) {
      setLoggedIn(false);
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

 
  return (
    <div>
        <h1>Register</h1>

        <form onSubmit={handleRegister}>
        <div>
          <label>Firstname:</label>
          <input
            type="firstname"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lastname:</label>
          <input
            type="lastname"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        {loggedIn && <p>Welcome, you are logged in!</p>}
        <button onClick={()=>{handleSubmit(newdata)}}> Login </button>
    </div>
  );
}
