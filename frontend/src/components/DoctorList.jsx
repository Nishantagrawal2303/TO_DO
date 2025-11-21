import axios from "axios";
import { useEffect, useState } from "react";

function doctorList() {
  const [doctors, setdoctors] = useState([]);
  const token = localStorage.getItem("token");

  const fetchdoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/doctors");
    setdoctors(res.data);
  };

  const handleDelete = async (id) => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("doctors deleted!");
      fetchdoctors();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting doctorss");
    }
  };

  useEffect(() => {
    fetchdoctors();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All doctors</h2>
      {doctors.map((p) => (
        <div key={p._id} style={{ marginBottom: "10px" }}>
          <strong>{p.name}</strong> - Time{p.Time}
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default doctorList;
