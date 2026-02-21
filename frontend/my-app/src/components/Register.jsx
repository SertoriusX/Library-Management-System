import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    ConfirmPassword: ''
  });

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSend =  (e) => {
    e.preventDefault();

    if (form.ConfirmPassword !== form.password) {
      setMsg("Passwords don't match");
      return;
    }

    try {
       axios.post('http://127.0.0.1:5000/register',form);
      setForm({ username: '', email: '', password: '', ConfirmPassword: '' });
      setMsg('You registered successfully');
    } catch (err) {
      console.error(err);
      setMsg('Something went wrong with your registration');
    }
  };

  return (
    <>
      {msg && <div className="alert alert-info text-center">{msg}</div>}
      <div className="d-flex justify-content-center align-items-center p-4" style={{ minHeight: '80vh' }}>
        <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <h1 className="text-center mb-4">Register</h1>
          <form onSubmit={onSend}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" name="username" className="form-control" id="username" value={form.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" name="email" className="form-control" id="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="password" value={form.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
              <input type="password" name="ConfirmPassword" className="form-control" id="ConfirmPassword" value={form.ConfirmPassword} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}
