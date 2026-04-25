import { useEffect, useState } from "react";
import API from "../services/api";
import "./Home.css"

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.post(
        "/notes/add",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Note added!");
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      alert("Fill all fields");
    }
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.put(
        `/notes/${editId}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Note Updated!");

      setEditId(null);
      setTitle("");
      setContent("");

      fetchNotes();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    try {
      await API.delete(`/notes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Note deleted");
      fetchNotes();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="home-page">
      <h2>{editId ? "Edit Note" : "Add New Note"}</h2>

      <div className="add-note">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {editId ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <ol>
        {notes.map((p) => (
          <li key={p._id}>
            {p.title} - {p.content}

            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Home;
