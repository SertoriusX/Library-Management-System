import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import userContext from "../context/userContext";

export default function CreatePerson() {
  const { token } = useContext(userContext);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street_address: "",
    city: "",
    post_code: "",
    country_id: "",
    img: null,
  });

  const [countries, setCountries] = useState([]);
  const baseUrl = "http://127.0.0.1:5000";

  useEffect(() => {
    axios
      .get(`${baseUrl}/country`)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = new FormData();
    for (const key in form) {
      newForm.append(key, form[key]);
    }

    try {
      await axios.post(`${baseUrl}/person`, newForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Person added successfully!");

      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        street_address: "",
        city: "",
        post_code: "",
        country_id: "",
        img: null,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add person.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4">👤 Create Person</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="street_address"
              value={form.street_address}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Postcode</label>
              <input
                type="text"
                name="post_code"
                value={form.post_code}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Country</label>
              <select
                name="country_id"
                value={form.country_id}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select
                </option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
            />
            <div className="form-text">
              Upload a profile photo (JPG, PNG, etc.)
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Save Person
          </button>
        </form>
      </div>
    </div>
  );
}
