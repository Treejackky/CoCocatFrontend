import React, { useState, useEffect } from "react";


export default function Register({ handleChange, handleData }) {

    
  const handleSubmit = (e) => {
    handleChange(e);
  };

  const data = {
    "email": "a@gmail.com",
    "password": "1234"
  }

  const newdata = {
    "page": 0,
    "data": data
  }

  return (
    <div>
        <h1>Register</h1>
        <button onClick={()=>{handleSubmit(newdata)}}>Login</button>
    </div>
  );
}
