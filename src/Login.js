import { useState, useEffect } from "react";

export default function Login({ handleChange, handleData }) {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [newdata, setNewdata] = useState(null);

  let i = 0;

  useEffect(()=>{
    if(handleData){
      if(i==0){
        // console.log(handleData);
        setEmail(handleData.email);
        setPassword(handleData.password);
        console.log(handleData.password)
        i++;
      }    
    }  
  },[])

  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8700/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        setMessage("Login successful!");
        setError("");
        //  console.log(result);
        // console.log(result)
        const data = {
          "page": 1,
          "data": result
        }
        handleSubmit(data);
        localStorage.setItem('login', JSON.stringify(result.token));

      } else {
        setLoggedIn(false);
        setMessage("");
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoggedIn(false);
      setError("An error occurred. Please try again.");
      setMessage("");
    }
  };

  const handleSubmit = (e) => {
    handleChange(e);
  };

 
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
       {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {loggedIn && <p>Welcome, you are logged in!</p>}
      {/* <button onClick={()=>{handleSubmit(1)}}> Dashboard </button> */}
      <button onClick={()=>{handleSubmit(2)}}> Register </button>
    </div>
  );
}
