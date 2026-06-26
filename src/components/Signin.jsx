import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Signin.css';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Authenticating your account...");

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
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setLoading("");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Access your luxury account</p>

        {loading && <p className="loading">{loading}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>

          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;