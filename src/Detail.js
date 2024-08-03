import React, { useState, useEffect } from "react";

export default function Detail({ handleChange, handleData }) {
  const [newdata, setNewdata] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setNewdata(data || {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("nowpage");
    handleChange(0);
  };

  const handleSubmit = (e) => {
    handleChange(e);
  };

  const handleCheck = () => {
    console.log(newdata.name);
  };

  const handleImageError = (e) => {
    e.target.src = "placeholder-image-url"; // Replace with the actual URL of the placeholder image
  };

  return (
    <div className="detail">
      <button onClick={() => handleSubmit(1)}>Back</button>
      <button onClick={() => handleLogout(0)}>Logout</button>
      <button onClick={handleCheck}>Click</button>
      <ul>
        <li>
          <strong>Name:</strong> {newdata.name}
        </li>
        <li>
          <strong>Price:</strong> {newdata.price}
        </li>
        <li>
          <strong>Type:</strong> {newdata.type}
        </li>
        <div className="before_image_room">
          <div className="image_room">
            {newdata.image && newdata.image.length > 0 ? (
              newdata.image.map((img_data, img_index) => (
                <img
                  key={img_index}
                  src={img_data}
                  alt={newdata.name}
                  onError={handleImageError}
                />
              ))
            ) : (
              <div className="placeholder">No Images</div>
            )}
          </div>
        </div>
        <button>จอง</button>
      </ul>
    </div>
  );
}
