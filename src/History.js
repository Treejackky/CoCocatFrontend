import React, { useState, useEffect } from "react";

export default function History({ handleChange, handleData }) {

    const [newdata, setNewdata] = useState([]);
    const [newbooking, setBooking] = useState([]);
    const [fillter, setFillter] = useState([]);
 
  useEffect(() => {
    handleget_booking();
  }, []);
  
//   get booking fillter with email
  const handleget_booking = async () => {
    try {
      const response = await fetch("http://localhost:8700/booking", {
        method: "GET",
      });

      const result = await response.json();
    //   console.log(result);
    //    filter data with email
        let email = JSON.parse(localStorage.getItem("email"));
        const data = result.filter((item) => item.email == email);
        setFillter(data);
        console.log(data);
    } catch (err) {
      console.log("An error occurred. Please try again.");
    }
  }

  const handleSubmit = (e) => {
    handleChange(e);
  };


  return (
    <>
        <div className="container">
        <div className="row">
            <div className="col-12">
            <h1>History</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
            <button
                className="btn btn-primary"
                onClick={() => handleSubmit(1)}
            >
                Back
            </button>
            </div>
        </div>
        </div>
    </>
  );
}
