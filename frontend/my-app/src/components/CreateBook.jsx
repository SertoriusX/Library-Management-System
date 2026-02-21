import React, { useContext, useEffect, useState } from 'react';
import userContext from '../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBook() {
  const { token } = useContext(userContext);
  const navigate=useNavigate()

  const [form, setForm] = useState({
    title: '',
    author: '',
    gender_id: '',
    year_id: '',
    pages: '',
    img: null
  });

  const [genders, setGenders] = useState([]);
  const [years, setYears] = useState([]);

  const baseUrl = "http://127.0.0.1:5000";

  useEffect(() => {
    axios.get(`${baseUrl}/gender`)
      .then(res => setGenders(res.data))
      .catch(err => console.error(err));

    axios.get(`${baseUrl}/year`)
      .then(res => setYears(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const onSend = async (e) => {
    e.preventDefault();

    const newForm = new FormData();
    for (const key in form) {
      newForm.append(key, form[key]);
    }

    try {
      await axios.post(`${baseUrl}/book`, newForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({
        title: '',
        author: '',
        gender_id: '',
        year_id: '',
        pages: '',
        img: null
      });
      navigate('/showBook')
      alert("Book added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add book.");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">📚 Add New Book</h2>
        <form onSubmit={onSend}>
          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Genre</label>
            <select
              className="form-select"
              name="gender_id"
              value={form.gender_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Choose genre</option>
              {genders.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Published Year</label>
            <select
              className="form-select"
              name="year_id"
              value={form.year_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Choose year</option>
              {years.map(y => (
                <option key={y.id} value={y.id}>{y.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Pages</label>
            <input
              type="number"
              className="form-control"
              name="pages"
              value={form.pages}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Book Cover</label>
            <input
              type="file"
              className="form-control"
              name="img"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Save Book</button>
        </form>
      </div>
    </div>
  );
}
