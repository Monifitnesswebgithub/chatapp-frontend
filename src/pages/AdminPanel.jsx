import React, { useEffect, useState } from "react";
import "../styles/admin.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch all users
  const loadUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users-list");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      alert("Failed to load user list");
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refresh]);

  const toggleBan = async (username, currentStatus) => {
    try {
      const res = await fetch("http://localhost:3000/admin/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ban: !currentStatus }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`${username} is now ${!currentStatus ? "BANNED" : "UNBANNED"}`);
        setRefresh(!refresh);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error updating ban status");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>
      <p className="admin-sub">Manage users, ban or unban them.</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Created On</th>
            <th>Status</th>
            <th>Ban / Unban</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, idx) => (
            <tr key={idx}>
              <td>{u.username}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td className={u.isBanned ? "banned" : "active"}>
                {u.isBanned ? "BANNED" : "ACTIVE"}
              </td>
              <td>
                <button
                  className={u.isBanned ? "unban-btn" : "ban-btn"}
                  onClick={() => toggleBan(u.username, u.isBanned)}
                >
                  {u.isBanned ? "Unban" : "Ban"}
                  <button
  onClick={() => {
    localStorage.removeItem("adminAuth");
    window.location.href = "/admin-login";
  }}
  className="logout-btn"
>
  Logout
</button>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
