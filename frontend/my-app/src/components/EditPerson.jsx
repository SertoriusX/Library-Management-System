import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditPerson({ item, onClose, onSave }) {
  const baseUrl = "http://127.0.0.1:5000";

  const [form, setForm] = useState({
    first_name: item.first_name || "",
    last_name: item.last_name || "",
    email: item.email || "",
    phone: item.phone || "",
    street_address: item.street_address || "",
    city: item.city || "",
    post_code: item.post_code || "",
    country_id: item.country_id || "",
    img: null,
  });

  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/country`)
      .then((res) => setCountry(res.data))
      .catch((err) => console.error(err));
  }, [baseUrl]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    axios
      .put(`${baseUrl}/person/${item.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => onSave(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="edit-book-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="edit-person-form"
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          width: "400px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2>Edit Person</h2>

        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="street_address"
          value={form.street_address}
          onChange={handleChange}
          placeholder="Street Address"
        />
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="post_code"
          value={form.post_code}
          onChange={handleChange}
          placeholder="Post Code"
        />

        <select
          name="country_id"
          value={form.country_id}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {country.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input type="file" name="img" onChange={handleChange} />

        <div
          className="form-actions"
          style={{ marginTop: "15px", textAlign: "right" }}
        >
          <button onClick={handleSave} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
