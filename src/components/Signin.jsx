import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Verifying Credentials...");
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const response = await axios.post(
        "https://keyafidel.alwaysdata.net/api/signin",
        formdata
      );

      setLoading("");

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userEmail", response.data.user.email);
        window.location.href = "/"; 
      } else {
        setError("Invalid credentials.");
      }
    } catch (error) {
      setLoading("");
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
        
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a1a', fontWeight: '400', marginBottom: '10px' }}>
          Welcome Back
        </h1>
        <p style={{ color: '#b8924e', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '700', marginBottom: '40px' }}>
          Access your Lumine account
        </p>

        {loading && <p style={{ color: '#b8924e', fontSize: '0.8rem' }}>{loading}</p>}
        {error && <p style={{ color: '#ff4d4d', fontSize: '0.8rem' }}>{error}</p>}

        <form onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            style={{ 
              width: '100%', 
              padding: '15px 0', 
              marginBottom: '20px', 
              border: 'none', 
              borderBottom: '1px solid #e0e0e0', 
              outline: 'none',
              fontSize: '0.8rem',
              letterSpacing: '1px'
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="PASSWORD"
            style={{ 
              width: '100%', 
              padding: '15px 0', 
              marginBottom: '40px', 
              border: 'none', 
              borderBottom: '1px solid #e0e0e0', 
              outline: 'none',
              fontSize: '0.8rem',
              letterSpacing: '1px'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>

          <p style={{ marginTop: '30px', fontSize: '0.8rem', color: '#666' }}>
            New to Lumine? <Link to="/signup" style={{ color: '#b8924e', textDecoration: 'none', fontWeight: '700' }}>Create Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;