import React, { useContext, useState } from 'react';
import axios from 'axios';
import userContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const { form, setForm, saveToken } = useContext(userContext);
  const [msg, setMsg] = useState('');
    const navigate=useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSend = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://127.0.0.1:5000/login', form);
      setForm({ username: '', password: '' });
      saveToken(res.data.access_token);
      setMsg('Login successful!');
      navigate('/createBook')
    } catch (err) {
      console.error(err);
      setMsg('Something went wrong with your login');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        {msg && <div className="alert alert-info text-center">{msg}</div>}
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={onSend}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
