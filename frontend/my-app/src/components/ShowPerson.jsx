import axios from "axios";
import React, { useEffect, useState } from "react";
import EditPerson from "./EditPerson";

export default function ShowPerson() {
  const baseUrl = "http://127.0.0.1:5000";
  const [data, setData] = useState([]);
  const [selectItem, setSelectITem] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/person`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;

    axios
      .delete(`${baseUrl}/person/${id}`)
      .then(() => {
        setData((prev) => prev.filter((d) => d.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">👥 Person List</h2>

      <div className="row g-4">
        {data.map((d, i) => (
          <div key={i} className="col-md-4">
            <div className="card shadow-sm h-100">
              {d.img && (
                <img
                  src={`${baseUrl}/uploads/${d.img}`}
                  className="card-img-top"
                  alt={d.first_name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">
                  {d.first_name} {d.last_name}
                </h5>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {d.email}
                </p>
                <p className="card-text mb-1">
                  <strong>Phone:</strong> {d.phone || "N/A"}
                </p>
                <p className="card-text mb-1">
                  <strong>City:</strong> {d.city}, {d.post_code}
                </p>
                <p className="card-text">
                  <strong>Country:</strong> {d.country_name}
                </p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setSelectITem(d)}
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

  {selectItem && (
  <EditPerson
    item={selectItem}
    onClose={() => setSelectITem(null)}
    onSave={(updateItem) => {
      setData((prev) =>
        prev.map((d) => (d.id === updateItem.id ? updateItem : d))
      );
      setSelectITem(null);
    }}
  />
)}
    </div>
  );
}
