import axios from "axios";
import { useState } from "react";

function doctorForm() {
  const [doctor, setdoctor] = useState({ name: "", Time: "" });

  const handleadddoctors = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/doctors", doctor, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
    } catch (err) {
      alert(err.response?.data?.message || "Error adding task");
    }
  };

  return (
    <div>
      <h2>Add doctor</h2>
      <form onSubmit={handleadddoctors}>
        <input
          type="text"
          placeholder="doctor Name"
          value={doctor.name}
          onChange={(e) => setdoctor({ ...doctor, name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Time"
          value={doctor.Time}
          onChange={(e) => setdoctor({ ...doctor, Time: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default doctorForm;
