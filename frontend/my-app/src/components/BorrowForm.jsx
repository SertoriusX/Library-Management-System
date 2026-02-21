import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import userContext from "../context/userContext";

export default function BorrowForm({ onBorrowed }) {
  const baseUrl = "http://127.0.0.1:5000";
  const { token } = useContext(userContext);

  const [books, setBooks] = useState([]);
  const [persons, setPersons] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [form, setForm] = useState({
    book_id: "",
    person_id: "",
    due_date: "",
  });

  useEffect(() => {
    axios.get(`${baseUrl}/book`).then((res) => setBooks(res.data));
    axios.get(`${baseUrl}/person`).then((res) => setPersons(res.data));

    axios
      .get(`${baseUrl}/borrow`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBorrows(res.data))
      .catch((err) => console.error("Error fetching borrows:", err));
  }, [token]);

  const borrowedBookIds = new Set(
    borrows.filter((b) => !b.return_date).map((b) => b.book_id)
  );

  const availableBooks = books.filter((b) => !borrowedBookIds.has(b.id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/borrow`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Borrow created!");
      if (onBorrowed) onBorrowed(res.data);
    } catch (err) {
      console.error(err);
      alert("Error creating borrow");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h3>Create Borrow</h3>

      <div className="mb-2">
        <label>Book</label>
        <select
          name="book_id"
          value={form.book_id}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Book</option>
          {availableBooks.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Person</label>
        <select
          name="person_id"
          value={form.person_id}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Person</option>
          {persons.map((p) => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.last_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2">
        <label>Due Date (optional)</label>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Borrow
      </button>
    </form>
  );
}
