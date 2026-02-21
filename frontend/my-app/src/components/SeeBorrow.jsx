import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import userContext from "../context/userContext";

export default function SeeBorrow() {
  const baseUrl = "http://127.0.0.1:5000";
  const { token } = useContext(userContext);
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${baseUrl}/borrow`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBorrows(res.data))
      .catch((err) => console.error("Error fetching borrows:", err));
  }, [token]);

  const handleReturn = async (borrowId) => {
    try {
      await axios.delete(`${baseUrl}/borrow/${borrowId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBorrows((prev) =>
        prev.map((b) =>
          b.id === borrowId ? { ...b, return_date: new Date().toISOString() } : b
        )
      );
      alert("Borrow marked as returned!");
    } catch (err) {
      console.error(err);
      alert("Error marking borrow as returned");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📚 Borrowed Books</h2>

      {borrows.length === 0 ? (
        <p className="text-center">No active borrows found.</p>
      ) : (
        <div className="row g-4">
          {borrows.map((b) => (
            <div key={b.id} className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Book: {b.book_title}</h5>
                  <p className="card-text mb-1">
                    <strong>Borrower:</strong> {b.person_name}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Borrowed On:</strong>{" "}
                    {new Date(b.borrow_date).toLocaleDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Due Date:</strong>{" "}
                    {new Date(b.due_date).toLocaleDateString()}
                  </p>

                  {b.return_date ? (
                    <p className="card-text text-success">
                      ✅ Returned: {new Date(b.return_date).toLocaleDateString()}
                    </p>
                  ) : (
                    <>
                      <p className="card-text text-danger">⏳ Not Returned</p>
                      <button
                        className="btn btn-sm btn-success mt-2"
                        onClick={() => handleReturn(b.id)}
                      >
                        Mark as Returned
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
