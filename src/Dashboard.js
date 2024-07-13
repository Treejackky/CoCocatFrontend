import React, { useState, useEffect } from "react";


export default function Dashboard({ handleChange, handleData }) {

    
  const handleSubmit = (e) => {
    handleChange(e);
  };

  return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={()=>{handleSubmit(0)}}>Login</button>
    </div>
  );
}
