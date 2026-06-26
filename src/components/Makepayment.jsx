import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import '../css/Makepayment.css';

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const navigate = useNavigate();

  const img_url = "https://keyafidel.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost);

      const response = await axios.post(
        "https://keyafidel.alwaysdata.net/api/mpesa_payment",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
    } catch (error) {
      setLoading(false);
      setError("Payment failed. Please try again.");
    }
  };

  if (!product) {
    return <h2 className="error">No product selected</h2>;
  }

  return (
    <div className="payment-container">
      <div className="payment-card">

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h1 className="title">Secure Checkout</h1>
        <p className="subtitle">Complete your purchase with M-Pesa</p>

        <div className="product-section">
          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
          />

          <div className="product-info">
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <h3>KES {product.product_cost}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          {loading && <Loader />}
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}

          <input
            type="tel"
            placeholder="Enter M-Pesa number (254XXXXXXXXX)"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setError("");
            }}
            required
          />

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Makepayment;