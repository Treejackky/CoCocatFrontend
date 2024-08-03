import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard({ handleChange, handleData }) {
  const [newdata, setNewdata] = useState([]);
  const [newbooking, setBooking] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    handleget();
    handleget_booking();
  }, []);

  const handleget = async () => {
    try {
      const response = await fetch("http://localhost:8700/hotel", {
        method: "GET",
      });

      const result = await response.json();
      console.log(result);
      setNewdata(result);
      setFilteredData(result);
    } catch (err) {
      console.log("An error occurred. Please try again.");
    }
  };

  const handleget_booking = async () => {
    try {
      const response = await fetch("http://localhost:8700/booking", {
        method: "GET",
      });

      const result = await response.json();
      console.log(result);
      setBooking(result);
    } catch (err) {
      console.log("An error occurred. Please try again.");
    }
  };
  const print = () => {
    console.log(newbooking);
  };

  const handleLogout = (e) => {
    localStorage.removeItem("login");
    localStorage.removeItem("nowpage");
    handleChange(0);
  };
  const handleSubmit = (e) => {
    handleChange(e);
  };

  const filterRooms = () => {
    const filtered = newdata.filter((room) => {
      const roomBookings = newbooking.filter(
        (booking) => booking.room === room.name
      );

      return roomBookings.every((booking) => {
        const bookingStart = new Date(booking.cin);
        const bookingEnd = new Date(booking.cout);

        return (
          (startDate < bookingStart && endDate < bookingStart) ||
          (startDate > bookingEnd && endDate > bookingEnd)
        );
      });
    });

    setFilteredData(filtered);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <button onClick={() => print()}>Click</button>
      <button onClick={() => handleLogout(0)}>Logout</button>

      {/* filter */}
      <div className="Time">
        <div>
          <DatePicker
            showIcon
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div>
          <DatePicker
            showIcon
            selected={endDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setEndtDate(date)}
          />
        </div>
        <div>
          <button onClick={filterRooms}>ค้นหา</button>
        </div>
      </div>
      {filteredData.map((data, index) => (
        <ul key={index}>
          <li>
            <strong>Name:</strong> {data.name}
          </li>
          <li>
            <strong>Price:</strong> {data.price}
          </li>
          <li>
            <strong>Type:</strong> {data.type}
          </li>
          <div className="before_image_room">
            <div className="image_room">
              {data.image.map((img_data, img_index) => (
                <img
                  key={img_index}
                  src={img_data}
                  alt={data.name}
                  style={{ width: "100px", height: "100px" }}
                />
              ))}
            </div>
            <button
              onClick={() => {
                handleSubmit({
                  page: 3,
                  data: newdata[index],
                });
              }}
            >
              ดูรายละเอียด
            </button>
          </div>
        </ul>
      ))}
    </div>
  );
}
