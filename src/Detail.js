import React, { useState, useEffect } from "react";

export default function Detail({ handleChange, handleData }) {
  const [newdata, setNewdata] = useState({});
  const [imgbooking, setImgBooking] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setNewdata(data || {});
  }, []);

  const handleBooking = async () => {
    let time = JSON.parse(localStorage.getItem("time"));
    let email = JSON.parse(localStorage.getItem("email"));
    let token = JSON.parse(localStorage.getItem("login"));

    // Function to convert image to base64
   
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    try {
      let img = "";

      if (imgbooking) {
        img = await toBase64(imgbooking);
        setImgBooking(img);
      }

      let data = {
        product_id: newdata._id,
        cin: time.startDate,
        cout: time.endDate,
        camerasBooked: 0,
        email: email,
        pay_way: "credit",
        image: img
      };

      console.log(data);

       const response = await fetch("http://localhost:8700/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      handleSubmit(1);

    } catch (err) {
      console.log("An error occurred. Please try again.", err);
    }
  };


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

  const handleJsonData = () => {

    // let time = JSON.parse(localStorage.getItem("time"));
    // let email = JSON.parse(localStorage.getItem("email"));

    // console.log(time);
    // let data = {
    //   product_id: newdata._id,
    //   cin: time.startDate,
    //   cout: time.endDate,
    //   camerasBooked: 0,
    //   email: email,
    //   pay_way: "credit",
    //   image:""
    // };
    // console.log(data);
    // setBooking(data);
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

        <br />

        {/* แนบรูป file แล้ว set state  */}
        <input type="file" onChange={(e) => setImgBooking(e.target.files[0])} />

        <br />
        <button onClick={handleBooking}>จอง</button>
      </ul>
    </div>
  );
}
