import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Curating your profile...");
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      const response = await axios.post(
        "https://keyafidel.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess("Your luxury account has been created.");

      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setLoading("");
      setError("An enrollment error occurred. Please try again.");
    }
  };

  // Luxury Inline Styles
  const inputStyle = {
    width: '100%',
    padding: '15px 0',
    marginBottom: '20px',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    outline: 'none',
    fontSize: '0.8rem',
    letterSpacing: '1px',
    background: 'transparent',
    textTransform: 'uppercase'
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '450px', padding: '40px', textAlign: 'center' }}>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a1a', fontWeight: '400', marginBottom: '10px' }}>
          Create Account
        </h1>
        <p style={{ color: '#b8924e', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '700', marginBottom: '40px' }}>
          Luxury starts here
        </p>

        {loading && <p style={{ color: '#b8924e', fontSize: '0.8rem' }}>{loading}</p>}
        {success && <p style={{ color: '#27ae60', fontSize: '0.8rem' }}>{success}</p>}
        {error && <p style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="USERNAME"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="PASSWORD"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="PHONE NUMBER"
            style={inputStyle}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '15px', 
              backgroundColor: '#1a1a1a', 
              color: '#fff', 
              border: 'none', 
              fontWeight: '700', 
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Sign Up
          </button>

          <p style={{ marginTop: '30px', fontSize: '0.8rem', color: '#666' }}>
            Already part of the collection? <Link to="/signin" style={{ color: '#b8924e', textDecoration: 'none', fontWeight: '700' }}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;