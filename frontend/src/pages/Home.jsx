import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [doctors, setdoctors] = useState([]);
  const [name, setName] = useState("");
  const [Time, setTime] = useState("");

  const fetchdoctors = async () => {
    const res = await API.get("/doctors");
    setdoctors(res.data);
  };

  useEffect(() => {
    fetchdoctors();
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.post(
        "/doctors/add",
        { name, Time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("patienttt added!");
      fetchdoctors();
    } catch (err) {
      alert("fill all failed");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.delete(`/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("appoinment cancelledd");
      fetchdoctors();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="home-page">
      <h2>add new appointments</h2>

      <div className="add-doctor">
        <input
          type="text"
          placeholder="patient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="string"
          placeholder="TIME"
          value={Time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ol>
        {doctors.map((p) => (
          <li key={p._id}>
            {p.name} - {p.Time}    
            <button onClick={() => handleDelete(p._id)}>cancel Appoinment </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Home;
