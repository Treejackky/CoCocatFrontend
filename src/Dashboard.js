import React, { useState, useEffect } from "react";


export default function Dashboard({ handleChange, handleData }) {


  useEffect(()=>{
    handleget();
  },[])

  const handleget = async (e) => {
    try {
      const response = await fetch("http://localhost:8700/hotel", {
        method: "GET"
      });

      const result = await response.json();
      console.log(result);

    } catch (err) {
      console.log("An error occurred. Please try again.");
    }
  };

  const print= () => {
    console.log(handleData);
  }

  const handleSubmit = (e) => {
    localStorage.removeItem('login');
    localStorage.removeItem('nowpage');
    handleChange(0);
  };

  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={()=>print()}>Click</button>
        <button onClick={()=>{handleSubmit(0)}}>logout</button>
    </div>
  );
}
