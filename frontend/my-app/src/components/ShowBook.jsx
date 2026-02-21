import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditBook from './EditBook';

export default function ShowBook() {
  const baseUrl = "http://127.0.0.1:5000";
  const [data, setData] = useState([]);
  const [selectItem, setSelectItem] = useState(null);
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;

    axios
      .delete(`${baseUrl}/book/${id}`)
      .then(() => {
        setData((prev) => prev.filter((d) => d.id !== id));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios.get(`${baseUrl}/book`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📚 Books List</h2>

      <div className="row g-4">
        {data.map((d) => (
          <div className="col-md-4 col-sm-6" key={d.id}>
            <div className="card shadow-sm h-100">
              {d.img && (
                <img
                  src={`${baseUrl}/uploads/${d.img}`} 
                  className="card-img-top"
                  alt={d.title}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{d.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {d.author} <br />
                  <strong>Genre:</strong> {d.gender_name} <br />
                  {d.year && <><strong>Year:</strong> {d.year}<br /></>}
                  {d.pages && <><strong>Pages:</strong> {d.pages}</>}
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => setSelectItem(d)}
                >
                  Edit
                </button>
                   <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(d.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-center text-muted mt-4">No books available.</p>
      )}

      {selectItem && (
        <EditBook
          item={selectItem}
          onClose={() => setSelectItem(null)}
          onSave={(updateItem) => {
            setData(prev => prev.map(d => d.id === updateItem.id ? updateItem : d));
            setSelectItem(null);
          }}
        />
      )}
    </div>
  );
}
