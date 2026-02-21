import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditBook({ item, onClose, onSave }) {
  const baseUrl = "http://127.0.0.1:5000";

  const [form, setForm] = useState({
    title: item.title || '',
    author: item.author || '',
    gender_id: item.gender_id || '',
    year_id: item.year_id || '',
    pages: item.pages || '',
    img: null
  });

  const [genders, setGenders] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/gender`)
      .then(res => setGenders(res.data))
      .catch(err => console.error(err));

    axios.get(`${baseUrl}/year`)
      .then(res => setYears(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    axios.put(`${baseUrl}/book/${item.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => onSave(res.data))
    .catch(err => console.error(err));
  };

  return (
    <div className="edit-book-modal" style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <div className="card p-4" style={{ width: "500px" }}>
        <h4>Edit Book</h4>

        <div className="mb-2">
          <label>Title:</label>
          <input
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Author:</label>
          <input
            className="form-control"
            name="author"
            value={form.author}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Genre:</label>
          <select
            className="form-select"
            name="gender_id"
            value={form.gender_id}
            onChange={handleChange}
          >
            <option value="">-- Select Genre --</option>
            {genders.map(g => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Year:</label>
          <select
            className="form-select"
            name="year_id"
            value={form.year_id}
            onChange={handleChange}
          >
            <option value="">-- Select Year --</option>
            {years.map(y => (
              <option key={y.id} value={y.id}>
                {y.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label>Pages:</label>
          <input
            className="form-control"
            name="pages"
            value={form.pages}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Image:</label>
          <input
            type="file"
            className="form-control"
            name="img"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3 d-flex justify-content-end gap-2">
          <button className="btn btn-success" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
