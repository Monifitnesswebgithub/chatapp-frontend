import React, { useState } from "react";

export default function Profile() {
  const saved = JSON.parse(localStorage.getItem("chatUser"));
  const [displayName, setDisplayName] = useState(saved?.displayName || "");
  const [gender, setGender] = useState(saved?.gender || "");
  const [avatar, setAvatar] = useState(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("id", saved.id);
    formData.append("displayName", displayName);
    formData.append("gender", gender);
    if (avatar) formData.append("avatar", avatar);

    const res = await fetch("http://localhost:3000/update-profile", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.success) {
      alert("Profile updated!");

      saved.displayName = displayName;
      saved.gender = gender;
      if (data.avatar) saved.avatar = data.avatar;

      localStorage.setItem("chatUser", JSON.stringify(saved));
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Update Profile</h2>

      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="male">Male ♂</option>
        <option value="female">Female ♀</option>
        <option value="other">Other ⚧</option>
      </select>

      <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />

      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}
