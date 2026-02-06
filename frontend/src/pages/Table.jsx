import React, { useEffect, useState } from "react";

const API = "https://media-nv-2.onrender.com";

export default function Candidates() {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    Name: "",
    Age: "",
    Email: "",
    Phone: "",
    Skills: "",
    Experience: "",
    Applied_position: "",
  });
  const getAll = async () => {
    const res = await fetch(`${API}/getall`);
    const data = await res.json();
    setList(data);
    console.log(data)
  };

  useEffect(() => {
    getAll();
  }, []);
  const createCandidate = async (e) => {
    e.preventDefault();

    await fetch(`${API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      Name: "",
      Age: "",
      Email: "",
      Phone: "",
      Skills: "",
      Experience: "",
      Applied_position: "",
    });

    getAll();
  };
  const deleteCandidate = async (id) => {
    if (!window.confirm("Delete candidate?")) return;
    await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    getAll();
  };
  const openEdit = (c) => {
    setEditData(c);
    setShowModal(true);
  };
  const updateCandidate = async () => {
    await fetch(`${API}/updatecandi/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });

    setShowModal(false);
    getAll();
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Candidate Management</h2>
      <form onSubmit={createCandidate} style={box}>
        <h3>Add Candidate</h3>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key.replace("_", " ")}
            style={input}
            value={form[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            required
          />
        ))}

        <button style={btnBlue}>Create</button>
      </form>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Position</th>
            <th style={th}>Status</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id}>
              <td style={td}>{c.name}</td>
              <td style={td}>{c.email}</td>
              <td style={td}>{c.aplied_position}</td>
              <td style={td}>{c.status}</td>
              <td style={td}>
                <button style={btnGreen} onClick={() => openEdit(c)}>
                  Edit
                </button>
                <button
                  style={btnRed}
                  onClick={() => deleteCandidate(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
  <div style={backdrop}>
    <div style={modal}>
      <h3>Update Candidate</h3>

      {Object.keys(editData).map((key) => {
        if (key === "id") return null;
        if (key === "status") {
          return (
            <select
              key={key}
              style={input}
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          );
        }
        return (
          <input
            key={key}
            placeholder={key.replace("_", " ")}
            style={input}
            value={editData[key]}
            onChange={(e) =>
              setEditData({
                ...editData,
                [key]: e.target.value,
              })
            }
          />
        );
      })}

      <button style={btnGreen} onClick={updateCandidate}>
        Update
      </button>
      <button
        style={btnRed}
        onClick={() => setShowModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
}
const box = {
  border: "1px solid #ddd",
  padding: 20,
  marginBottom: 30,
  borderRadius: 8,
};

const input = {
  display: "block",
  width: "100%",
  padding: 8,
  marginBottom: 10,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  border: "1px solid #ddd",
  padding: 10,
  background: "#f4f4f4",
};

const td = {
  border: "1px solid #ddd",
  padding: 10,
};

const btnBlue = {
  background: "#2196f3",
  color: "#fff",
  padding: "8px 16px",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};

const btnGreen = {
  background: "#4caf50",
  color: "#fff",
  padding: "6px 12px",
  border: "none",
  borderRadius: 4,
  marginRight: 6,
};

const btnRed = {
  background: "#f44336",
  color: "#fff",
  padding: "6px 12px",
  border: "none",
  borderRadius: 4,
};

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: 20,
  width: 350,
  borderRadius: 8,
};
