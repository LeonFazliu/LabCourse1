import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  hotelname: "",
  hotelcity: "",
};

const AddEditHotel = () => {
  const [state, setState] = useState(initialState);
  const { hotelname, hotelcity } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  const [cities, setCities] = useState([
    "Prishtinë",
    "Mitrovicë",
    "Prizren",
    "Gjilan",
  ]); // List of cities

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/hotels/${id}`)
        .then((resp) => setState({ ...resp.data[0] }))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelname || !hotelcity) {
      toast.error("Please fill each input field");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/hotels", {
            hotelname,
            hotelcity,
          })
          .then(() => {
            setState(initialState);
            toast.success("Hotel Added Successfully");
          })
          .catch((err) => toast.error(err.response.data));
      } else {
        axios
          .put(`http://localhost:5000/api/hotels/${id}`, {
            hotelname,
            hotelcity,
          })
          .then(() => {
            toast.success("Hotel Updated Successfully");
          })
          .catch((err) => toast.error(err.response.data));
      }
      navigate("/hotels");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="hotelname">Hotel Name</label>
        <input
          type="text"
          id="hotelname"
          name="hotelname"
          placeholder="Hotel Name...."
          value={hotelname || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="hotelcity">City</label>
        <select
          id="hotelcity"
          name="hotelcity"
          value={hotelcity || ""}
          onChange={handleInputChange}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/hotels">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEditHotel;
