import { useEffect, useState } from "react";
import API from "../services/api";
import "./Home.css"

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [Time, setTime] = useState("");

  
  const [editId, setEditId] = useState(null);

  const fetchDoctors = async () => {
    const res = await API.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
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
      alert("Notes added!");
      setName("");
      setTime("");
      fetchDoctors();
    } catch (err) {
      alert("Fill all fields");
    }
  };

  const handleEdit = (doctor) => {
    setEditId(doctor._id); 
    setName(doctor.name);
    setTime(doctor.Time);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.put(
        `/doctors/${editId}`,
        { name, Time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Note Updated!");

     
      setEditId(null);
      setName("");
      setTime("");

      fetchDoctors();
    } catch (err) {
      alert("Update failed");
    }
  };
  

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.delete(`/doctors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Note deleted");
      fetchDoctors();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="home-page">
      <h2>{editId ? "Edit Note" : "Add New Note"}</h2>

      <div className="add-doctor">
        <input
          type="text"
          placeholder="Add notes"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Notes Date"
          value={Time}
          onChange={(e) => setTime(e.target.value)}
        />

        {editId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <ol>
        {doctors.map((p) => (
          <li key={p._id}>
            {p.name} - {p.Time}

            <button onClick={() => handleEdit(p)}>Edit</button>

            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Home;
